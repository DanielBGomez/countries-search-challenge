// Modules
const Express = require('express');
const Router = Express.Router();
const Axios = require('axios');

function errorHandler(req, res, error) {
  if (error.response.status === 404) {
    return res.send([]);
  }
  res.status(500).send(error.response);
}

// Routes
Router.get('/api/autocomplete/:query', (req, res) => {
  // Execute command
  Axios.get(`https://restcountries.eu/rest/v2/name/${req.params.query}`)
    .then(resp => {
      res.send(resp.data.map(country => {
        const {
          name,
          flag,
          altSpellings,
          alpha3Code
        } = country;
        // Respond only the needed values
        return {
          alpha3Code,
          name,
          flag,
          altSpellings
        }
      }))
    })
    .catch(err => errorHandler(req, res, err));
})

Router.get('/api/search/:query', (req, res) => {
  // Execute command
  Axios.get(`https://restcountries.eu/rest/v2/name/${req.params.query}`)
  .then(resp => {
    res.send(resp.data.map(country => {
      const {
        alpha2Code,
        alpha3Code,
        name,
        flag,
        altSpellings,
        region,
        languages,
        currencies,
        population,
      } = country;
      // Respond only the needed values
      return {
        alpha2Code,
        alpha3Code,
        name,
        flag,
        altSpellings,
        region,
        languages,
        currencies,
        population
      }
    }))
  })
  .catch(err => errorHandler(req, res, err));
});

Router.get('/api/countryData/:code', (req, res) => {
  // Execute command
  
  Axios.get(`https://restcountries.eu/rest/v2/alpha/${req.params.code}`)
  .then(resp => {
    const {
      alpha2Code,
      alpha3Code,
      name,
      flag,
      altSpellings,
      region,
      languages,
      currencies,
      population,
    } = resp.data;
    // Respond only the needed values
    res.send({
      alpha2Code,
      alpha3Code,
      name,
      flag,
      altSpellings,
      region,
      languages,
      currencies,
      population
    });
  })
  .catch(err => errorHandler(req, res, err));
})

// Exports
module.exports = Router