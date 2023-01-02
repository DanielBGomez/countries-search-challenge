/* eslint-disable no-unused-expressions */

// Modules
require('dotenv').config();
const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contentSecurityPolicy = require('helmet-csp');

// Local Modules
// const Cache = require('./Cache')
const Router = require('./Router');

// Configs
const DEFAULT_PORT = 3100;

/**
 * Server class.
 *
 * Customized for the Countries Search Challenge.
 *
 * @version 1.0.0
 * @author Daniel B Gomez <contact@danielbgomez.com>
 */
class Server {
  constructor(params = {}) {
    /**
     * Vars
    */
    this._App;
    this._Server;

    this.CACHE_OPTIONS = params.cache || {};

    this.CORS_OPTIONS = params.corsOptions || {};
    this.DIST_PATH = params.distPath || 'dist';

    this.SSL_CERT = (params.ssl || {}).cert;
    this.SSL_KEY = (params.ssl || {}).key;

    this.PORT = params.port || DEFAULT_PORT;

    // Listeners
    this.LISTENERS = {};
  }

  /**
   * Initialize server instance.
   *
   * @param {object} params   Configuration params
   */
  async init(params = {}) {
    // Create app
    this._App = express();

    // Init Cache connection
    // try {
    //     this._Cache = Cache(params.cache || this.CACHE_OPTIONS)
    // } catch(err){
    //     console.log("Can't connect to cache server", err)
    //     process.exit()
    // }

    // Setup middlewares
    // Cors
    this._App.use(cors(params.corsOptions || this.CORS_OPTIONS));
    // Setup dist path
    this._App.use(express.static(path.join(__dirname, '../', params.distPath || this.DIST_PATH), { index: false }));
    this._App.use(helmet());
    this._App.use(contentSecurityPolicy({
      useDefaults: true,
      directives: {
        imgSrc: ['\'self\'', 'data:', 'https://avatars.githubusercontent.com', 'https://flagcdn.com']
      }
    }));

    this._App.use(express.json());

    this._App.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../', params.distPath || this.DIST_PATH, 'index.html'));
    });
    this._App.use(Router);

    // Start server
    this._Server = https.createServer({
      cert: (params.ssl || {}).cert || this.SSL_CERT,
      key: (params.ssl || {}).key || this.SSL_KEY
    }, this._App);

    // Start
    this._Server.listen(params.port || this.PORT, () => this.log(`Server listening on port ${this.PORT}`));

    // Return instance
    return this;
  }

  /**
     * Log any server event
     *
     * @param {*} msg
     * @param  {...any} data
     */
  log(msg, ...data) {
    // Log time
    const time = new Date();
    // Output msg in console
    console.log(`[${time.toISOString()}]`, msg);
    // If data is defined, output in console
    if (data.length) { console.log(`[${time.toISOString()}]`, ...data); }
  }
}

module.exports = params => new Server(params);
module.exports.Class = Server;
