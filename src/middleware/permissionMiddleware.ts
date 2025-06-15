import jwt, { JwtPayload } from "jsonwebtoken";
import { enviroment } from "../common/environment";
import { IPermissoes, Permissoes } from "../models/permissoes.models";

const apiSecret = (enviroment.security.JWT_SECRET) as string;

const permissao = (basePath: string, permissao: string) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
      const token = authHeader.split(' ')[1]
      const idUsuarioLogado = (jwt.verify(token, apiSecret) as JwtPayload).id;
      const permissions = await Permissoes.findOne({ id_usuario: idUsuarioLogado, id_collection: basePath.substring(1) })
      
      if (!permissions?.permissao.includes(permissao)) {
        return res.status(403).send({ message: "sem permissão" });
      }
      
    } catch (err) {
      return res.status(400).send({ error: err });
    }

    next();
  };
};

export { permissao }