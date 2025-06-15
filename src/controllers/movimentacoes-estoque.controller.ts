import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IMovimentacoesEstoque, MovimentacoesEstoque } from "../models/movimentacoes-estoque.model";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";
import { movimentaEstoque } from "../services/movimenta-estoque.service";
import { permissao } from "../middleware/permissionMiddleware";

class MovimentacaoController extends ModelRouter<IMovimentacoesEstoque> {
    constructor () {
        super(MovimentacoesEstoque)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save, registraLog(this.basePath, "cadastro"), movimentaEstoque]);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao,this.validateID,this.update, registraLog(this.basePath, "edicao")]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace, registraLog(this.basePath, "edicao")]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete, registraLog(this.basePath, "exclusão")]);
    }
};

const MovimentacoesController = new MovimentacaoController();

console.log(MovimentacoesController.basePath);

export { MovimentacoesController };