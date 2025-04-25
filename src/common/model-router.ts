import { stringify, parse } from "querystring";
import { Router } from "./router";
import * as mongoose from "mongoose";
import { count } from "console";

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
  basePath: string;
  pageSize: number = 10;

  defaultSelect = "";
  defaultPopulate = "";
  defaultSort = "";

  constructor(protected model: mongoose.Model<D>) {
    super();
    this.basePath = `/${model.collection.name}`;
  }

  protected prepareOne(
    query: mongoose.Query<D | null, D>
  ): mongoose.Query<D | null, D> {
    return query;
  }

  envelope(document: any): any {
    let resource = Object.assign({ _links: {} }, document.toJSON());
    resource._links.self = `${this.basePath}/${resource._id}`;
    return resource;
  }

  envelopeAll(documents: any[], options: any = {}): any {
    const { url } = options;
    const resource: any = {
      _links: {
        self: url,
      },
      items: documents,
      total_items: options.count,
      page: options.page ? options.page : 1,
    };
    if (options.page && options.count && options.pageSize) {
      const pathname = url.substring(0, url.indexOf("?"));
      const query = parse(url.substring(url.indexOf("?")));
      if (options.page > 1) {
        const previousQuery = Object.assign({}, query, {
          _page: options.page - 1,
        });
        resource._links.previous = `${pathname}?${stringify(previousQuery)}`;
      }
      const remaining = (options.count = -options.page * options.pageSize);
      if (remaining > 0) {
        const nextQuery = Object.assign({}, query, { _page: options.page + 1 });
        resource.links.next = `${pathname}?${stringify(nextQuery)}`;
      }
    }
    return resource;
  }

  validateID = (req, resp, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next({ message: "Documents não encontrado" });
    } else {
      next();
    }
  };

  findById = (req, res, next) => {
    const { id } = req.params;

    //Verifica se o tipo do ID está correto
    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      return next(new Error("ID invalido"));
    } else {
      this.prepareOne(this.model.findById(id))
        .then(this.render(res, next))
        .catch(next);
    }
  };

  findAll = (req, res, next) => {
    let page = parseInt(req.query._page || 1);
    page = page > 0 ? page : 1;
    let psize = parseInt(req.query._pageSize || this.pageSize);
    const skip = (page - 1) * psize;
    this.model
      .countDocuments()
      .exec()
      .then((count) =>
        this.model
          .find()
          .skip(skip)
          .limit(psize)
          .sort([["_id", -1]])
      )
      .then(
        this.renderAll(res, next, {
          page,
          count,
          pageSize: psize,
          url: req.url,
        })
      )
      .catch(next);
  };

  prepareWhere = (query) => {
    const traverse = (o) => {
      if (Array.isArray(o)) traverseArray(o);
      if (typeof o === "object" && o !== null) traverseObject(o);
      return o;
    };
    const traverseArray = (a) => {
      a.forEach((i) => traverse(i));
    };
    const traverseObject = (o) => {
      Object.keys(o)
        .filter((k) => k !== "$options")
        .forEach((k) => {
          if (k === "$regex") {
            o[k] = new RegExp(o[k], o["$options"]);
            delete o["$options"];
          } else if (k === "$and" || k === "$or" || k === "$nor") {
            if (o[k].length === 0) delete o[k];
          } else traverse(o[k]);
        });
    };
    return traverse(query);
  };

  find = (req, resp, next) => {
    const pageSize = parseInt(req.query._pageSize) || this.pageSize;
    let page = parseInt(req.query._page || 1);
    page = page > 0 ? page : 1;
    const skip = (page - 1) * pageSize;

    let query = this.model.find({});
    let countQuery = this.model.find({}).countDocuments();

    if (req.customFilter) {
      try {
        const q = this.prepareWhere(JSON.parse(req.customFilter));
        query = query.where(q);
        countQuery = countQuery.where(q);
      } catch (err) {
        next;
      }
    }

    const sort =
      (req.query.sort && req.query.sort.replace(/}/g, "")) || this.defaultSort;
    if (sort) {
      query = query.sort(sort);
    }

    query.skip(skip).limit(pageSize);

    countQuery.exec().then((result) => {
      query
        .then(
          this.renderAll(resp, next, {
            page,
            pageSize,
            count: result,
            url: req.url,
            query: req.query,
          })
        )
        .catch(next);
    });
  };

  save = (req, resp, next) => {
    let document = new this.model(req.body);
    document.save().then(this.render(resp, next)).catch(next);
  };

  replace = (req, resp, next) => {
    const options = {
      runValidators: true,
      overwrite: true,
      useFindAndModify: false,
    };
    this.model
      .findOneAndReplace({ _id: req.params.id }, req.body, options)
      .then(this.render(resp, next))
      .catch(next);
  };

  update = (req, resp, next) => {
    const options = { runValidators: true, new: true, useFindAndModify: true, runHooks: true };
    this.model
      .findOneAndUpdate({ _id: req.params.id }, req.body, options)
      .then(this.render(resp, next))
      .catch(next);
  };

  delete = (req, resp, next) => {
    this.model
      .deleteOne({ _id: req.params.id })
      .exec()
      .then((cmdResult: any) => {
        if (cmdResult.deletedCount > 0) {
          resp.sendStatus(204);
        } else {
          resp.status(404).send("Documento não encontrado");
        }
        return next();
      })
      .catch(next);
  };;


}
