import { mainRouter } from "./main.router";
import { Server } from "./server/server"; 


const aplicacao = new Server()

aplicacao.iniciarServico([
    mainRouter
    
])