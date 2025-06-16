import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { enviroment } from './environment';

const port = enviroment.server.port;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentação da API - Projeto Arquitetura SW',
    version: '1.0.0',
    description: 'API do projeto com rotas protegidas por JWT e middleware de permissões',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/controllers/*.ts'], // caminhos dos arquivos com as anotações JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
