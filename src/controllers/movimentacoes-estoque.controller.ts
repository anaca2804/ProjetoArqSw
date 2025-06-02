import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IMovimentacoesEstoque, MovimentacoesEstoque } from "../models/movimentacoes-estoque.model";
import { autenticacao } from "../middleware/authmiddleware";

class MovimentacaoController extends ModelRouter<IMovimentacoesEstoque> {
    constructor () {
        super(MovimentacoesEstoque)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [autenticacao, this.validateID, this.findById]);
        app.post(`${this.basePath}`, [autenticacao, this.save]);
        app.patch(`${this.basePath}/:id`, [autenticacao, this.validateID, this.update]);
        app.put(`${this.basePath}/:id`, [autenticacao, this.validateID, this.replace]);
        app.delete(`${this.basePath}/:id`, [autenticacao, this.validateID,this.delete]);
    }
};

const MovimentacoesController = new MovimentacaoController();

console.log(MovimentacoesController.basePath);

export { MovimentacoesController };