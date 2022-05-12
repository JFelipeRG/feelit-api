const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'feel it',
}

const pool = mysql.createPool(config)

module.exports = pool