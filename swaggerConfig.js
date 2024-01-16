module.exports = {
    swaggerDefinition: {
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for your API',
      },
      servers: [
        {
          url: 'http://localhost:3001', // Mettez à jour avec le port de votre serveur
          description: 'Local server',
        },
      ],
    },
    apis: ['./server.js'], // Mettez à jour le chemin selon votre structure
  };
  