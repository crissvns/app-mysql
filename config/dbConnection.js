const mysql = require('mysql');

// Modularização do mysql
module.exports = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '382591',
        database: 'bd_firstapp',
        port: '3306',
        insecureAuth: true
    });
}