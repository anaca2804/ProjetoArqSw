import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
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

const encriptaSenha = (obj, next) => {
    bcrypt
        .hash(obj.senha, 10)
        .then((hash)=> {
            obj.senha = hash;
            next();
        })
        .catch(next);
};

const saveMiddleware = function (this: IUsuario, next) {
    const usuario: IUsuario = this;
    if (!usuario.isModified("senha")) {
        next();
    }else {
        encriptaSenha(usuario,next);
    }
}
export{
    Usuario,
    UsuarioSchema,
    IUsuario
}

