import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IMovimentacoesEstoque, MovimentacoesEstoque } from "../models/movimentacoes-estoque.model";

class MovimentacaoController extends ModelRouter<IMovimentacoesEstoque> {
    constructor () {
        super(MovimentacoesEstoque)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, this.find);
        app.get(`${this.basePath}/:id`, [this.validateID, this.findById]);
        app.post(`${this.basePath}`, this.save);
        app.patch(`${this.basePath}/:id`, [this.validateID, this.update]);
        app.put(`${this.basePath}/:id`, [this.validateID, this.replace]);
        app.delete(`${this.basePath}/:id`, [this.validateID,this.delete]);
    }
};

const MovimentacoesController = new MovimentacaoController();

console.log(MovimentacoesController.basePath);

export { MovimentacoesController };