import { ModelRouter } from "../common/model-router";
import { autenticacao } from "../middleware/authmiddleware";
import { permissao } from "../middleware/permissionMiddleware";
import { ILog, Logs } from "../models/log.model";
import * as express from 'express' 

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Gerenciamento de logs do sistema
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - id_usuario
 *         - tipo
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do log
 *         id_usuario:
 *           type: string
 *           description: ID do usuário que gerou o log
 *         tipo:
 *           type: string
 *           enum: [cadastro, edicao, exclusão]
 *           description: Tipo de ação registrada
 *         collection_afetada:
 *           type: object
 *           description: Informações sobre a coleção afetada
 *         payload:
 *           type: object
 *           description: Payload completo da requisição original
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Lista todos os logs do sistema
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs
 */

/**
 * @swagger
 * /logs/{id}:
 *   get:
 *     summary: Busca um log específico por ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log encontrado
 *       404:
 *         description: Log não encontrado
 */

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Cria um novo log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       201:
 *         description: Log criado com sucesso
 */

/**
 * @swagger
 * /logs/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um log
 *     tags: [Logs]
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
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: Log atualizado com sucesso
 */

/**
 * @swagger
 * /logs/{id}:
 *   put:
 *     summary: Substitui completamente um log existente
 *     tags: [Logs]
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
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: Log substituído com sucesso
 */

/**
 * @swagger
 * /logs/{id}:
 *   delete:
 *     summary: Exclui um log
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Log excluído com sucesso
 *       404:
 *         description: Log não encontrado
 */

class LogController extends ModelRouter<ILog> {
    constructor() {
        super(Logs)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao, this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save]);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.update]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete]);
    }
};

const LogsController = new LogController();

console.log(LogsController.basePath);

export { LogsController };