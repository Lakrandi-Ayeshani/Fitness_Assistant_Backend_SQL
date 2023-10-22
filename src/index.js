const express = require('express');
const { connectDB, disconnectDB } = require('./db/db.js');

const app = express();

const server = app.listen(8000, () => {
  console.log("API started in port 8000");
  connectDB();
});

process.on('SIGINT', () => {
  console.log('API shutting down');
  disconnectDB();
  server.close(() => {
    console.log('shutted down');
  });
});


// sequelize.close();