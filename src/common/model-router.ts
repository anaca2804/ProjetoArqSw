import { stringify, parse } from "querystring";
import { Router } from "./router";
import * as mongoose from "mongoose";


export abstract class ModelRouter<D extends mongoose.Document> extends Router {
    basePath: string;
    pageSize: number = 10;

    defaultSelect = "";
    defaultPopulate = "";
    defaultSort = "";

    constructor(protected model: mongoose.Model<D>) {
        super();
        this.basePath = `/${model.collection.name}`
    }

    protected prepareOne(
        query: mongoose.Query<D | null, D>
    ): mongoose.Query<D | null, D> {
        return query
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
            const remaining = options.count = - options.page * options.pageSize
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
    }
}