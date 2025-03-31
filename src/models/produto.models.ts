import mongoose from "mongoose";

interface IProduto extends mongoose.Document{
    nome: string;
    descricao: string;
    quantidade: number;
    validade: Date;
};

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type:String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    quantidade:{
        type: Number,
        required: true,
        default: 1
    },
    validade: {
        type: Date,
        required: false
    },
}, {timestamps: true});

const Produto = mongoose.model<IProduto>('Produto', ProdutoSchema);

export{
    Produto,
    ProdutoSchema,
    IProduto
}
