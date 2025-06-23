# ProjetoArqSw

ProjetoArqSw é uma API backend desenvolvida como parte da disciplina de **Arquitetura de Software** com a ideia de ser um sistema de gerenciamento de materiais.  
O projeto utiliza **Node.js**, **Express** e **TypeScript**, seguindo o padrão de arquitetura **MVC** (Model-View-Controller), proporcionando uma estrutura modular, organizada e escalável.

## Tecnologias Utilizadas

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **@types/express**: Tipagens TypeScript para o framework Express.
- **@types/jsonwebtoken**: Tipagens TypeScript para uso da biblioteca jsonwebtoken com TypeScript.
- **@types/node**: Tipagens TypeScript para os módulos nativos do Node.js.
- **typescript**: Compilador TypeScript.
- **dotenv**: Gerenciamento de variáveis de ambiente via arquivo `.env`.
- **Express**: Framework minimalista para construção de APIs REST.
- **mongodb**: Driver oficial do MongoDB para Node.js.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, facilitando a modelagem de dados.
- **nodemon**: Ferramenta que reinicia automaticamente a aplicação durante o desenvolvimento ao detectar mudanças.
- **bcrypt**: Biblioteca para hashing de senhas e comparação segura.
- **jsonwebtoken**: Geração e verificação de tokens JWT para autenticação.
- **swagger-jsdoc**: Geração de documentação Swagger a partir de comentários JSDoc.
- **swagger-ui-express**: Middleware para servir a interface visual do Swagger na aplicação Express.

## Estrutura de Pastas

O projeto segue a arquitetura **MVC** (Model-View-Controller):

```
ProjetoArqSw/
│
├── src/
│   ├── common/             # Utilitários comuns (ex: rotas base, variáveis de ambiente)
│   ├── controllers/        # Controladores das entidades (lógica das requisições)
│   ├── middleware/         # Funções intermediárias executadas durante o ciclo de requisição/resposta (ex: autenticação, permissões)
│   ├── models/             # Modelos de dados (estrutura das entidades)
│   ├── server/             # Configurações e inicialização do servidor
│   ├── services/           # Regras de negócio reutilizáveis e lógica de acesso a dados fora dos controladores
│   ├── main.router.ts      # Arquivo principal de roteamento
│   └── main.ts             # Ponto de entrada da aplicação
│
├── .gitignore              # Arquivos e pastas ignorados pelo Git
├── package.json            # Dependências, scripts e metadados do projeto
├── README.md               # Documentação do projeto
└── tsconfig.json           # Configurações do compilador TypeScript
```

## Instalação

Siga os passos para configurar o projeto localmente:

1. Clone o repositório:
```bash
git clone https://github.com/anaca2804/ProjetoArqSw
```

2. Acesse o diretório do projeto:
```bash
cd ProjetoArqSw
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente criando o arquivo `.env` na raiz. Exemplo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/projetoarqsw
```

## Como Rodar o Projeto

### Ambiente de Desenvolvimento
1. Compile o projeto:
```bash
npm run build
```

2. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```
(O projeto será iniciado utilizando `nodemon` para recarregamento automático.)

## Exemplos de Endpoints

Abaixo alguns exemplos básicos de como interagir com a API usando `curl`:

### Registrar um novo usuário (rota protegida - requer token JWT)
```bash
curl -X POST http://localhost:3000/api/usuarios/   -H "Content-Type: application/json"   -d '{"name": "João Silva", "email": "joao@email.com", "password": "senha123"}'
```

### Fazer login
```bash
curl -X POST http://localhost:3000/api/users/login   -H "Content-Type: application/json"   -d '{"email": "joao@email.com", "password": "senha123"}'
```

### Buscar todos os usuários (rota protegida - requer token JWT)
```bash
curl -X GET http://localhost:3000/api/users   -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

> ⚡ Observação: substitua `SEU_TOKEN_AQUI` pelo token JWT obtido após o login.

---

## Observação

Este projeto foi desenvolvido para fins acadêmicos, como parte da matéria de **Arquitetura de Software**, e tem como objetivo exercitar conceitos de boas práticas de desenvolvimento de software, como separação de responsabilidades, modularização e uso de padrões de projeto.

## Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
```bash
git checkout -b feature/NomeDaFeature
```
3. Commit suas alterações:
```bash
git commit -m "Adiciona NomeDaFeature"
```
4. Envie para seu repositório:
```bash
git push origin feature/NomeDaFeature
```
5. Abra um Pull Request para análise.

---
