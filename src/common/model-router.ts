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
}
