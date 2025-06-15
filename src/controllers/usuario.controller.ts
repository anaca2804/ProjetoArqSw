import { ModelRouter } from "../common/model-router";
import * as express from "express";
import { IUsuario, Usuario } from "../models/usuario.model";
import jwt from "jsonwebtoken";
import { environment } from "../common/environment";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";

class UsuarioController extends ModelRouter<IUsuario> {
  constructor() {
    super(Usuario);
  }

  login = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const { email, senha } = req.body;

    const generateToken = (id: string): string => {
      return jwt.sign({ id }, environment.security.JWT_SECRET as string, {
        expiresIn: "1h",
      });
    };

    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario || !(await usuario.matchSenha(senha))) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }

      const token = generateToken(String(usuario._id)); // Garantir que _id é tratado como string
      res.json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Erro desconhecido" });
      }
    }
  };

  applyrouter(app: express.Application): void {
    app.get(`${this.basePath}`, [autenticacao, this.find]);
    app.get(`${this.basePath}/:id`, [
      autenticacao,
      this.validateID,
      this.findById,
    ]);
    app.post(`${this.basePath}`, [
      autenticacao,
      this.save,
      registraLog(this.basePath, "cadastro"),
    ]);
    app.post(`${this.basePath}/login`, this.login);
    app.patch(`${this.basePath}/:id`, [
      autenticacao,
      this.validateID,
      this.update,
      registraLog(this.basePath, "edicao"),
    ]);
    app.put(`${this.basePath}/:id`, [
      autenticacao,
      this.validateID,
      this.replace,
      registraLog(this.basePath, "edicao"),
    ]);
    app.delete(`${this.basePath}/:id`, [
      autenticacao,
      this.validateID,
      this.delete,
      registraLog(this.basePath, "exclusão"),
    ]);
  }
}

const UsuariosController = new UsuarioController();

export { UsuariosController };
