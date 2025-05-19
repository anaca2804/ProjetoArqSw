import { ModelRouter } from "../common/model-router";
import * as express from 'express';
import { IPermissao, Permissao } from "../models/permissao.model";
import { Usuario } from "../models/usuario.model";

class PermissaoController extends ModelRouter<IPermissao> {
    constructor () {
        super (Permissao)
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
const PermissaoCadController = new PermissaoController();

console.log(PermissaoCadController.basePath);

export {PermissaoCadController}