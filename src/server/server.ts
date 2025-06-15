import express, { Express } from "express";
import { environment } from "../common/environment";
import mongoose from "mongoose";
import { Router } from "../common/router";
import { handleError } from "./error.handler";

const port = environment.server.port;

export class Server {
  app: Express = express();

  constructor() {
    this.app.use(express.json());
  }

  iniciarServidor = (): void => {
    this.app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  };

  async conectarBaseDados(): Promise<void> {
    try {
      await mongoose.connect(environment.db.url);
      console.log("Conectado ao banco");
    } catch (error) {
      throw new Error(`Erro: ${error}`);
    }
  }

  iniciarRotas = (routers: Router[]): void => {
    routers.forEach((router) => router.applyrouter(this.app));
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
