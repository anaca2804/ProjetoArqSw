import mongoose from "mongoose";
import { IUsuario } from "./usuario.model";

interface IPermissoes extends mongoose.Document{
    id_usuario: IUsuario;
    permissao: [string];
    id_collection: string
};

const PermissoesSchema = new mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: false
    },
    permissao: {
        type: Array,
        required: true,
        enumm: ["cadastro","exclusão","edicao","leitura"]
    },
    id_collection: {
        type: String,
        required: true,
        enum: ['logs','movimentacoes-estoques','permissoes','produtos']
    }
}, {timestamps: true});

const Permissoes = mongoose.model<IPermissoes>('Permissoes', PermissoesSchema);

export{
    Permissoes,
    PermissoesSchema,
    IPermissoes
}