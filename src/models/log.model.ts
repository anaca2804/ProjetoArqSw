import mongoose from "mongoose";
import { IUsuario } from "./usuario.model";
interface ILog extends mongoose.Document{
    id_usuario: IUsuario;
    tipo: string;
    payload
};

const LogSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['cadastro', 'exclusão', 'edicao']
    },
    collection_afetada: {
        type: JSON,
    },
    payload: {
        type: JSON,
    }
}, { timestamps: true });

const Logs = mongoose.model<ILog>('Logs', LogSchema);

export{
    Logs,
    LogSchema,
    ILog
}