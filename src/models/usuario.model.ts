import mongoose from "mongoose";

interface IUsuario extends mongoose.Document{
    nome: string;
    email: string;
    senha: string;
};

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export{
    Usuario,
    UsuarioSchema,
    IUsuario
}

