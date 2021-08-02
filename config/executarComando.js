const dbConnection = require('./dbConnection');

//Modularização do método de execução de consultas
let Consulta = function(sql, callback) {
    dbConnection().query(sql, function(err, result) {
        if (!err) {
            callback(result);
        } else { throw err; }
    });
};

module.exports = Consulta;