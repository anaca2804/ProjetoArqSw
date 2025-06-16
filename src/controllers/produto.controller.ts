import { ModelRouter } from "../common/model-router";
import * as express from 'express'
import { IProduto, Produto } from "../models/produto.models"; 
import { autenticacao } from "../middleware/authmiddleware";
import { registraLog } from "../middleware/logMiddleware";
import { permissao } from "../middleware/permissionMiddleware";

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos do sistema
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - quantidade
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         quantidade:
 *           type: number
 *           description: Quantidade em estoque
 *         validade:
 *           type: string
 *           format: date
 *           description: Data de validade do produto
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
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um produto
 *     tags: [Produtos]
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
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 */

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Substitui um produto
 *     tags: [Produtos]
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
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto substituído
 */

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto excluído
 *       404:
 *         description: Produto não encontrado
 */

class ProdutoController extends ModelRouter<IProduto>{
    constructor() {
        super(Produto)
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

const ProdutosController = new ProdutoController();

console.log(ProdutosController.basePath);

export {ProdutosController};