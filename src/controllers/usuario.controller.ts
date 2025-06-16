
import { ModelRouter } from "../common/model-router";
import * as express from 'express' 
import { IUsuario, Usuario } from "../models/usuario.model";
import jwt from 'jsonwebtoken';
import { enviroment } from "../common/environment";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";
import { permissao } from "../middleware/permissionMiddleware";
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários do sistema
 *components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário
 */
class UsuarioController extends ModelRouter<IUsuario> {
    constructor() {
        super(Usuario)
    }
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
    login = async (req, res) => {
        const { email, senha } = req.body;

        const generateToken = (id: string): string => {            
            return jwt.sign({ id }, enviroment.security.JWT_SECRET as string, { expiresIn: '1h' });
        };

        try {
            const usuario = await Usuario.findOne({ email });
            if (!usuario || !(await usuario.matchSenha(senha))) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = generateToken(String(usuario._id)); // Garantir que _id é tratado como string
            res.json({ token });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro desconhecido' });
            }
        }
    }
    /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Lista todos os usuários
     *     tags: [Usuários]
     *     responses:
     *       200:
     *         description: Lista de usuários
     */
    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Busca um usuário por ID
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuário encontrado
     *       404:
     *         description: Usuário não encontrado
     */
    /**
     * @swagger
     * /usuarios:
     *   post:
     *     summary: Cria um novo usuário
     *     tags: [Usuários]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Usuario'
     *     responses:
     *       201:
     *         description: Usuário criado
     */
    /**
     * @swagger
     * /usuarios/{id}:
     *   patch:
     *     summary: Atualiza parcialmente um usuário
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Usuario'
     *     responses:
     *       200:
     *         description: Usuário atualizado
     */
    /**
     * @swagger
     * /usuarios/{id}:
     *   put:
     *     summary: Substitui um usuário
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Usuario'
     *     responses:
     *       200:
     *         description: Usuário substituído
     */
    /**
     * @swagger
     * /usuarios/{id}:
     *   delete:
     *     summary: Exclui um usuário
     *     tags: [Usuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Usuário excluído
     *       404:
     *         description: Usuário não encontrado
     */
    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save, registraLog(this.basePath, "cadastro")]);
        app.post(`${this.basePath}/login`, this.login);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao,this.validateID,this.update, registraLog(this.basePath, "edicao")]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace, registraLog(this.basePath, "edicao")]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete, registraLog(this.basePath, "exclusão")]);
    }
};

const UsuariosController = new UsuarioController();

console.log(UsuariosController.basePath);

export { UsuariosController };