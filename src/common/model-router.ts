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
}
