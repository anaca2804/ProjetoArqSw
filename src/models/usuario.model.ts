import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { enviroment } from "../common/environment";
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

const encriptaSenha = (obj, next) => {
    bcrypt
        .hash(obj.senha, Number(enviroment.security.rounds))
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

UsuarioSchema.pre("save", saveMiddleware);

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export{
    Usuario,
    UsuarioSchema,
    IUsuario
}

