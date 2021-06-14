// Modules
require('dotenv').config()
const fs = require('fs');

// Local Modules
const Server = require('./lib/Server')

// Init server
Server({
    distPath: 'dist',
    port: process.env.PORT || 3100,
    ssl: {
      cert: fs.readFileSync('ssl/server.crt'),
      key: fs.readFileSync('ssl/server.key')
    }
}).init()