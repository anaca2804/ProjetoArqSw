import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IProduto, Produto } from "../models/produto.models"; 

class ProdutoController extends ModelRouter<IProduto>{
    constructor() {
        super(Produto)
    }
    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, this.find);
        app.get(`${this.basePath}/:id`, [this.validateID,this.findById]);
        app.post(`${this.basePath}`, this.save);
        app.patch(`${this.basePath}/:id`, [this.validateID,this.update]);
        app.put(`${this.basePath}/:id`, [this.validateID,this.replace]);
        app.delete(`${this.basePath}/:id`, [this.validateID,this.delete]);
    }
};

const ProdutosController = new ProdutoController();

console.log(ProdutosController.basePath);

export {ProdutosController};