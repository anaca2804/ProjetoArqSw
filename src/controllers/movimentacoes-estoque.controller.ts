import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IMovimentacoesEstoque, MovimentacoesEstoque } from "../models/movimentacoes-estoque.model";
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";
import { movimentaEstoque } from "../services/movimenta-estoque.service";
import { permissao } from "../middleware/permissionMiddleware";

/**
 * @swagger
 * tags:
 *   name: Movimentações de Estoque
 *   description: Controle de entradas e saídas de produtos no estoque
 * components:
 *   schemas:
 *     MovimentacaoEstoque:
 *       type: object
 *       required:
 *         - id_produto
 *         - id_usuario
 *         - movimentacao
 *         - quantidade
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da movimentação
 *         id_produto:
 *           type: string
 *           description: ID do produto movimentado
 *         id_usuario:
 *           type: string
 *           description: ID do usuário responsável pela movimentação
 *         movimentacao:
 *           type: string
 *           enum: [entrada, saida]
 *           description: Tipo da movimentação
 *         quantidade:
 *           type: number
 *           description: Quantidade movimentada
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
 * /movimentacoes-estoques:
 *   get:
 *     summary: Lista todas as movimentações de estoque
 *     tags: [Movimentações de Estoque]
 *     responses:
 *       200:
 *         description: Lista de movimentações
 */

/**
 * @swagger
 * /movimentacoes-estoques/{id}:
 *   get:
 *     summary: Busca uma movimentação por ID
 *     tags: [Movimentações de Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movimentação encontrada
 *       404:
 *         description: Movimentação não encontrada
 */

/**
 * @swagger
 * /movimentacoes-estoques:
 *   post:
 *     summary: Registra uma nova movimentação de estoque
 *     tags: [Movimentações de Estoque]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoEstoque'
 *     responses:
 *       201:
 *         description: Movimentação registrada
 */

/**
 * @swagger
 * /movimentacoes-estoques/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma movimentação
 *     tags: [Movimentações de Estoque]
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
 *             $ref: '#/components/schemas/MovimentacaoEstoque'
 *     responses:
 *       200:
 *         description: Movimentação atualizada
 */

/**
 * @swagger
 * /movimentacoes-estoques/{id}:
 *   put:
 *     summary: Substitui uma movimentação
 *     tags: [Movimentações de Estoque]
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
 *             $ref: '#/components/schemas/MovimentacaoEstoque'
 *     responses:
 *       200:
 *         description: Movimentação substituída
 */

/**
 * @swagger
 * /movimentacoes-estoques/{id}:
 *   delete:
 *     summary: Exclui uma movimentação de estoque
 *     tags: [Movimentações de Estoque]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Movimentação excluída
 *       404:
 *         description: Movimentação não encontrada
 */

class MovimentacaoController extends ModelRouter<IMovimentacoesEstoque> {
    constructor () {
        super(MovimentacoesEstoque)
    }

    applyrouter(app: express.Application) {
        app.get(`${this.basePath}`, [permissao(this.basePath, 'leitura'), autenticacao, this.find]);
        app.get(`${this.basePath}/:id`, [permissao(this.basePath, 'leitura'), autenticacao,this.validateID,this.findById]);
        app.post(`${this.basePath}`, [permissao(this.basePath, 'cadastro'), autenticacao, this.save, registraLog(this.basePath, "cadastro"), movimentaEstoque]);
        app.patch(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao,this.validateID,this.update, registraLog(this.basePath, "edicao")]);
        app.put(`${this.basePath}/:id`, [permissao(this.basePath, 'edicao'), autenticacao, this.validateID,this.replace, registraLog(this.basePath, "edicao")]);
        app.delete(`${this.basePath}/:id`, [permissao(this.basePath, 'exclusão'), autenticacao, this.validateID,this.delete, registraLog(this.basePath, "exclusão")]);
    }
};

const MovimentacoesController = new MovimentacaoController();

console.log(MovimentacoesController.basePath);

export { MovimentacoesController };