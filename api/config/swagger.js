    const swaggerJSDoc = require('swagger-jsdoc');

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Performance Review API',
          version: '1.0.0',
          description: 'A description of your API',
        },
        servers: [
          {
            url: 'http://localhost:3000', // Replace with your server URL
            description: 'Development server',
          },
        ],
      },
      apis: ['./routes/*.js'], // Path to your API route files containing JSDoc comments
    };

    const swaggerSpec = swaggerJSDoc(options);

    module.exports = swaggerSpec;