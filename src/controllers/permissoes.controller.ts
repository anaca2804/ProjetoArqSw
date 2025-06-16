import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IPermissoes, Permissoes } from "../models/permissoes.models";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";
import { permissao } from "../middleware/permissionMiddleware";

/**
 * @swagger
 * tags:
 *   name: Permissões
 *   description: Gerenciamento de permissões de usuários
 * components:
 *   schemas:
 *     Permissao:
 *       type: object
 *       required:
 *         - id_usuario
 *         - permissao
 *         - id_collection
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do documento de permissão
 *         id_usuario:
 *           type: string
 *           description: ID do usuário vinculado
 *         permissao:
 *           type: array
 *           items:
 *             type: string
 *             enum: [cadastro, exclusão, edicao, leitura]
 *           description: Lista de permissões concedidas
 *         id_collection:
 *           type: string
 *           enum: [logs, movimentacoes-estoques, permissoes, produtos]
 *           description: Nome da coleção à qual a permissão se refere
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização
 */

/**
 * @swagger
 * /permissoes:
 *   get:
 *     summary: Lista todas as permissões
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Lista de permissões
 */

/**
 * @swagger
 * /permissoes/{id}:
 *   get:
 *     summary: Busca uma permissão por ID
 *     tags: [Permissões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permissão encontrada
 *       404:
 *         description: Permissão não encontrada
 */

/**
 * @swagger
 * /permissoes:
 *   post:
 *     summary: Cria uma nova permissão
 *     tags: [Permissões]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permissao'
 *     responses:
 *       201:
 *         description: Permissão criada
 */

/**
 * @swagger
 * /permissoes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma permissão
 *     tags: [Permissões]
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
 *             $ref: '#/components/schemas/Permissao'
 *     responses:
 *       200:
 *         description: Permissão atualizada
 */

/**
 * @swagger
 * /permissoes/{id}:
 *   put:
 *     summary: Substitui uma permissão
 *     tags: [Permissões]
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
 *             $ref: '#/components/schemas/Permissao'
 *     responses:
 *       200:
 *         description: Permissão substituída
 */

/**
 * @swagger
 * /permissoes/{id}:
 *   delete:
 *     summary: Exclui uma permissão
 *     tags: [Permissões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Permissão excluída
 *       404:
 *         description: Permissão não encontrada
 */
class PermissoesController extends ModelRouter<IPermissoes> {
    constructor() {
        super(Permissoes)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save, registraLog(this.basePath, "cadastro")]);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao,this.validateID,this.update, registraLog(this.basePath, "edicao")]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace, registraLog(this.basePath, "edicao")]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete, registraLog(this.basePath, "exclusão")]);
    }
};

const PermissoesMoveController = new PermissoesController();

console.log(PermissoesMoveController.basePath);

export{ PermissoesMoveController};