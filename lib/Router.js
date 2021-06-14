// Modules
const Express = require('express');
const Router = Express.Router();
const Axios = require('axios');

// Routes
Router.get('/api/autocomplete/:query', (req, res) => {
  // Execute command
  req.send([]);
})

Router.get('/api/search/:query', (req, res) => {
  // Execute command
  req.send([]);
});

Router.get('/api/countryData/:code', (req, res) => {
  // Execute command
  req.send({});
})

// Exports
module.exports = Router