import { LogsController } from "./controllers/log.controller";
import { MovimentacoesController } from "./controllers/movimentacoes-estoque.controller";
import { PermissaoCadController } from "./controllers/permissao.controller";
import { PermissoesMoveController } from "./controllers/permissoes.controller";
import { ProdutosController } from "./controllers/produto.controller";
import { UsuariosController } from "./controllers/usuario.controller";
import { mainRouter } from "./main.router";
import { Server } from "./server/server"; 


const aplicacao = new Server()

aplicacao.iniciarServico([
    mainRouter,
    LogsController,
    MovimentacoesController,
    PermissaoCadController,
    PermissoesMoveController,
    ProdutosController,
    UsuariosController
])