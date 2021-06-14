// Modules
require('dotenv').config()
const fs = require('fs');

// Local Modules
const Server = require('./lib/Server')

// Init server
Server({
    distPath: 'dist',
    port: 3000,
    ssl: {
      cert: fs.readFileSync('ssl/server.crt'),
      key: fs.readFileSync('ssl/server.key')
    }
}).init()