import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API de Domínios',
      version: '1.0.0',
      description: 'API interna da empresa para controle de domínios',
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [{
      ApiKeyAuth: []
    }],
  },
  apis: ['./src/routes/*.js'], // onde estão seus comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
