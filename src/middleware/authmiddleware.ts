import { ObjectId } from "mongoose";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { enviroment } from "../common/environment";
import { Usuario } from "../models/usuario.model";

const apiSecret = (enviroment.security.JWT_SECRET) as string;

const geraToken = (id: ObjectId): string => {
    return jwt.sign({ id }, apiSecret as string, { expiresIn: '1h'});
};

const autenticacao = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Não autorizado'})
    }

    try {
        const token = authHeader.split(' ')[1];

        // Valida a decodificação do token
        const decodificado = jwt.verify(token, apiSecret) as JwtPayload;
        
        // Encontra o usuario com o Id decodificado
        req.user = await Usuario.findById(decodificado.id).select('-senha');

        // Gera o novo token a cada requisição
        const novoToken = geraToken(req.user._id);

        // Adiciona o novo token no cabeçalho da resposta
        res.setHeader('x-new-token', novoToken);

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido'});
    }
};
export { autenticacao };