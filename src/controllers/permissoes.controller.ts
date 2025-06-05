import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IPermissoes, Permissoes } from "../models/permissoes.models";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";

class PermissoesController extends ModelRouter<IPermissoes> {
    constructor() {
        super(Permissoes)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [autenticacao, this.save, registraLog(this.basePath, "cadastro")]);
        app.patch(`${this.basePath}/:id`, [autenticacao,this.validateID,this.update, registraLog(this.basePath, "edicao")]);
        app.put(`${this.basePath}/:id`, [autenticacao, this.validateID,this.replace, registraLog(this.basePath, "edicao")]);
        app.delete(`${this.basePath}/:id`, [autenticacao, this.validateID,this.delete, registraLog(this.basePath, "exclusão")]);
    }
};

const PermissoesMoveController = new PermissoesController();

console.log(PermissoesMoveController.basePath);

export{ PermissoesMoveController};