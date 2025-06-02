import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IPermissoes, Permissoes } from "../models/permissoes.models";
import { autenticacao } from "../middleware/authmiddleware";

class PermissoesController extends ModelRouter<IPermissoes> {
    constructor() {
        super(Permissoes)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [autenticacao,this.find]);
        app.get(`${this.basePath}/:id`, [autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [autenticacao, this.save]);
        app.patch(`${this.basePath}/:id`, [autenticacao, this.validateID,this.update]);
        app.put(`${this.basePath}/:id`, [autenticacao, this.validateID,this.replace]);
        app.delete(`${this.basePath}/:id`, [autenticacao, this.validateID,this.delete]);
    }
};

const PermissoesMoveController = new PermissoesController();

console.log(PermissoesMoveController.basePath);

export{ PermissoesMoveController};