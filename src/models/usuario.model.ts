import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { enviroment } from "../common/environment";
interface IUsuario extends mongoose.Document{
    nome: string;
    email: string;
    senha: string;
    matchSenha(senha: string): Promise<boolean>;
};

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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

const updateMiddleware = async function (this: mongoose.Query<any, any>, next) {
    const update: any = this.getUpdate();
    
    if (update?.senha) {
        try {
            const hash = await bcrypt.hash(update.senha, Number(enviroment.security.rounds));
            this.setUpdate({ ...update, senha: hash });
        } catch (err: any) {
            return next(err);
        }
    }
    next();
}

UsuarioSchema.pre('findOneAndUpdate',updateMiddleware);
UsuarioSchema.pre('findOneAndReplace',updateMiddleware);
UsuarioSchema.pre("save", saveMiddleware);

UsuarioSchema.methods.matchSenha = function (senhaInserida) {
    return bcrypt.compare(senhaInserida, this.senha);
};

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export{
    Usuario,
    UsuarioSchema,
    IUsuario
}

