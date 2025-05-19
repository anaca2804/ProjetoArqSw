import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IPermissoes, Permissoes } from "../models/permissoes.models";

class PermissoesController extends ModelRouter<IPermissoes> {
    constructor() {
        super(Permissoes)
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

const PermissoesMoveController = new PermissoesController();

console.log(PermissoesMoveController.basePath);

export{ PermissoesMoveController};