import mongoose from "mongoose";
import { IUsuario } from "./usuario.model";
interface ILog extends mongoose.Document{
    id_usuario: IUsuario;
    tipo: string;
    descricao: string
};

const LogSchema = new mongoose.Schema({
    id_usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['cadastro', 'exclusão', 'edicao']
    }
})