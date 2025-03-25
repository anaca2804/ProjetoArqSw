import express from "express";
import { enviroment } from "../common/environment";
import conectarBaseDados from "../config/dbconnect";


const app = express();

app.use(express.json());

const port = enviroment.server.port;

const iniciarServidor = () => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    
    });
    conectarBaseDados();
};
export default iniciarServidor;