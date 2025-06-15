import { ModelRouter } from "../common/model-router";
import { autenticacao } from "../middleware/authmiddleware";
import { permissao } from "../middleware/permissionMiddleware";
import { ILog, Logs } from "../models/log.model";
import * as express from 'express' 

class LogController extends ModelRouter<ILog> {
    constructor() {
        super(Logs)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao, this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save]);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.update]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete]);
    }
};

const LogsController = new LogController();

console.log(LogsController.basePath);

export { LogsController };