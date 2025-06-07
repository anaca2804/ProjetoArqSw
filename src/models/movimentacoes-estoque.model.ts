import mongoose from "mongoose";
import { IProduto } from "./produto.models";
import { IUsuario } from "./usuario.model";


interface IMovimentacoesEstoque extends mongoose.Document{
    id_produto: IProduto;
    id_usuario: IUsuario;
    movimentacao: string;
};

const MovimentacoesEstoqueSchema = new mongoose.Schema({
    id_produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    },
    id_usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    movimentacao: {
        type: String,
        required: true,
        enum: ['entrada', 'saida']
    },
    quantidade: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const MovimentacoesEstoque = mongoose.model<IMovimentacoesEstoque>('Movimentacoes-Estoque', MovimentacoesEstoqueSchema);

export{
    MovimentacoesEstoque,
    MovimentacoesEstoqueSchema,
    IMovimentacoesEstoque
}