import mongoose from "mongoose";
import { IUsuario } from "./usuario.model";
import { IPermissao } from "./permissao.model";

interface IPermissoes extends mongoose.Document{
    id_usuario: IUsuario;
    id_permissao: IPermissao;
};

const PermissoesSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    id_permissao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permissao',
        required: true
    }
}, {timestamps: true});

const Permissoes = mongoose.model<IPermissoes>('Permissoes', PermissoesSchema);

export{
    Permissoes,
    PermissoesSchema,
    IPermissoes
}