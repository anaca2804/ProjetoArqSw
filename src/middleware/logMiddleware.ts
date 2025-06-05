import { enviroment } from "../common/environment";
import { Model } from 'mongoose';
import jwt, { JwtPayload } from "jsonwebtoken";
import { ILog, Logs } from "../models/log.model";

const apiSecret = (enviroment.security.JWT_SECRET) as string;

// Middleware como factory
const registraLog = (basePath: string, acao: ILog["tipo"]) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    
    try {
      const token = authHeader.split(' ')[1]
      
      const idUsuarioLogado = (jwt.verify(token, apiSecret) as JwtPayload).id;
      const payload = req.body;

      const collection_afetada = {
        nome: basePath,
        id_collection: req.params.id || null
      };

      const log = {
        id_usuario: idUsuarioLogado,
        tipo: acao,
        payload: payload || null,
        collection_afetada: collection_afetada
      };
      
      await Logs.create(log)
      
    } catch (err) {
      return res.status(400).send({ error: err });
    }

    next();
  };
};

export { registraLog };
