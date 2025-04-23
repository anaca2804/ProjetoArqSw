import express, { Express } from "express";
import { enviroment } from "../common/environment";
import mongoose from "mongoose";
import { Router } from "../common/router";
import { handleError } from "./error.handler";

const port = enviroment.server.port;

export class Server {
    app: Express = express();

    iniciarServidor = () => {
        this.app.use(express.json());
        this.app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    };

    async conectarBaseDados() {
        try {
            await mongoose.connect(enviroment.db.url);
            console.log("conectado o banco");
        } catch (error) {
            throw (`Erro: ${error}`);
        }
    };

    iniciarRotas = (routers: Router[]) => {
        routers.forEach(router => router.applyrouter(this.app));
        this.app.use(handleError);
    };

    iniciarServico = (routers: Router[]): Promise<Server> => {
        return this.conectarBaseDados()
            .then(() => this.iniciarRotas(routers))
            .then(() => {
                this.iniciarServidor();
                return this;
            });
    };
}
