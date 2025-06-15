import mongoose from "mongoose";
import { IUsuario } from "./usuario.model";

interface IPermissoes extends mongoose.Document{
    id_usuario: IUsuario;
    permissao: string;
};

const PermissoesSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    permissao: {
        type: String,
        required: true,
        enumm: ["admin","manager","operator"]
    }
}, {timestamps: true});

const Permissoes = mongoose.model<IPermissoes>('Permissoes', PermissoesSchema);

export{
    Permissoes,
    PermissoesSchema,
    IPermissoes
}