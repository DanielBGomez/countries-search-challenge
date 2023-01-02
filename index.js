// Modules
require('dotenv').config();
const fs = require('fs');

// Local Modules
const Server = require('./lib/Server');

// Configs
const DEFAULT_PORT = 3100;

// Init server
Server({
  distPath: 'dist',
  port: process.env.PORT || DEFAULT_PORT,
  ssl: {
    cert: fs.readFileSync('ssl/server.crt'),
    key: fs.readFileSync('ssl/server.key')
  }
}).init();
