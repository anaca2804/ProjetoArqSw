import { LogsController } from "./controllers/log.controller";
import { UsuariosController } from "./controllers/usuario.controller";
import { mainRouter } from "./main.router";
import { Server } from "./server/server"; 


const aplicacao = new Server()

aplicacao.iniciarServico([
    mainRouter,
    LogsController,
    UsuariosController
])