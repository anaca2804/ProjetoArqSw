
# ProjetoArqSw

ProjetoArqSw é uma API backend desenvolvida como parte da disciplina de **Arquitetura de Software** com a ideia de ser um sistema de gerenciamento de materiais.  
O projeto utiliza **Node.js**, **Express** e **TypeScript**, seguindo o padrão de arquitetura **MVC** (Model-View-Controller), proporcionando uma estrutura modular, organizada e escalável.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework minimalista para construção de APIs REST.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Mongoose**: ODM para comunicação com bancos MongoDB.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **express-validator**: Middleware para validação de entradas de dados.
- **bcryptjs**: Biblioteca para hash de senhas.
- **jsonwebtoken**: Implementação de autenticação baseada em tokens JWT.
- **nodemon**: Monitoramento automático para ambiente de desenvolvimento.
- **cors**: Middleware para habilitar CORS nas requisições HTTP.
- **helmet**: Middleware para reforçar a segurança HTTP.
- **morgan**: Logger de requisições HTTP.

## Estrutura de Pastas

O projeto segue a arquitetura **MVC** (Model-View-Controller):

```
ProjetoArqSw/
│
├── src/
│   ├── config/            # Configurações da aplicação (ex: banco de dados)
│   ├── controllers/       # Controladores (lógica que responde às requisições)
│   ├── middlewares/       # Middlewares personalizados (ex: autenticação, validações)
│   ├── models/            # Modelos de dados (MongoDB via Mongoose)
│   ├── routes/            # Definições de rotas da aplicação
│   ├── services/          # Regras de negócio e integrações
│   ├── utils/             # Funções utilitárias (helpers)
│   └── app.ts             # Arquivo principal que configura o Express
│
├── .env                   # Variáveis de ambiente
├── .gitignore             # Arquivos e pastas ignorados pelo Git
├── package.json           # Dependências, scripts e metadados do projeto
├── tsconfig.json          # Configurações do compilador TypeScript
└── README.md
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
JWT_SECRET=sua_chave_secreta
```

## Como Rodar o Projeto

### Ambiente de Desenvolvimento
```bash
npm run dev
```
(O projeto será iniciado utilizando `nodemon` para recarregamento automático.)

### Ambiente de Produção
```bash
npm run build
npm start
```

## Testes

Para rodar os testes automatizados:

```bash
npm test
```

## Exemplos de Endpoints

Abaixo alguns exemplos básicos de como interagir com a API usando `curl`:

### Registrar um novo usuário
```bash
curl -X POST http://localhost:3000/api/users/register   -H "Content-Type: application/json"   -d '{"name": "João Silva", "email": "joao@email.com", "password": "senha123"}'
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
