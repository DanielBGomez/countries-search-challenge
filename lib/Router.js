// Modules
const Express = require('express');
const Axios = require('axios');

const Router = Express.Router();

// Configs
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

function errorHandler(req, res, error) {
  if (error.response.status === NOT_FOUND) {
    return res.send([]);
  }
  return res.status(SERVER_ERROR).send(error.response);
}

// Routes
Router.get('/api/autocomplete/:query', (req, res) => {
  // Execute command
  Axios.get(`https://restcountries.com/v3.1/name/${req.params.query}`)
    .then(resp => {
      res.send(resp.data.map(country => {
        const {
          name,
          flags,
          altSpellings,
          cca3
        } = country;
        // Respond only the needed values
        return {
          alpha3Code: cca3,
          name: name.common,
          flag: flags.svg,
          altSpellings
        };
      }));
    })
    .catch(err => errorHandler(req, res, err));
});

Router.get('/api/search/:query', (req, res) => {
  // Execute command
  Axios.get(`https://restcountries.com/v3.1/name/${req.params.query}`)
    .then(resp => {
      res.send(resp.data.map(country => {
        const {
          cca2,
          cca3,
          name,
          flags,
          altSpellings,
          region,
          languages,
          currencies,
          population,
        } = country;
        // Respond only the needed values
        return {
          alpha2Code: cca2,
          alpha3Code: cca3,
          name: name.common,
          flag: flags.svg,
          altSpellings,
          region,
          languages,
          currencies: Object.keys(currencies).map(code => ({ ...currencies[code], code })),
          population
        };
      }));
    })
    .catch(err => errorHandler(req, res, err));
});

Router.get('/api/countryData/:code', (req, res) => {
  // Execute command
  Axios.get(`https://restcountries.com/v3.1/alpha/${req.params.code}`)
    .then(resp => {
      const {
        cca2,
        cca3,
        name,
        flags,
        altSpellings,
        region,
        languages,
        currencies,
        population,
      } = resp.data[0];
      // Respond only the needed values
      res.send({
        alpha2Code: cca2,
        alpha3Code: cca3,
        name: name.common,
        flag: flags.svg,
        altSpellings,
        region,
        languages,
        currencies: Object.keys(currencies).map(code => ({ ...currencies[code], code })),
        population
      });
    })
    .catch(err => errorHandler(req, res, err));
});

// Exports
module.exports = Router;
