const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Root Endpoint
app.get('/', (req, res) => {
  console.log('Root endpoint accessed.');
  res.status(200).send('Root endpoint is working!');
});

module.exports = serverless(app);