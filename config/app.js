const { SERVEUR_PORT } = require('./env_variables');

require('dotenv').config();
const PORT = SERVEUR_PORT || 3000;
const RESPONSE_CONTENT_TYPE_JSON = { 'Content-type': 'application/json' };

module.exports = { 
    PORT, 
    RESPONSE_CONTENT_TYPE_JSON,
}