import mongoose from "mongoose";

interface IPermissao extends mongoose.Document{
    nome: string;
    descricao: string;
};

const PermissaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Permissao = mongoose.model<IPermissao>('Permissao', PermissaoSchema);

export {
    Permissao, 
    PermissaoSchema, 
    IPermissao
}