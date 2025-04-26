
import { ModelRouter } from "../common/model-router";
import * as express from 'express' 
import { IUsuario, Usuario } from "../models/usuario.model";

class UsuarioController extends ModelRouter<IUsuario> {
    constructor() {
        super(Usuario)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, this.find);
        app.get(`${this.basePath}/:id`, [this.validateID,this.findById]);
        app.post(`${this.basePath}`, this.save);
        app.patch(`${this.basePath}/:id`, [this.validateID,this.update]);
        app.put(`${this.basePath}/:id`, [this.validateID,this.replace]);
        app.delete(`${this.basePath}`, [this.validateID,this.delete]);
    }
};

const UsuariosController = new UsuarioController();

console.log(UsuariosController.basePath);

export { UsuariosController };