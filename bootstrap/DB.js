const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = require('../config/env_variables');
const Pool = require('pg').Pool
class DB extends Pool {}

const db = new DB({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USERNAME,
    password: DB_PASSWORD,
})

module.exports = {
    db,
}