const jsonwebtoken = require('jsonwebtoken')

function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];;
    if (!token) {
        res.statusCode = 403;
        res.send({ message: "Requisição sem token." });
    } else {
        jsonwebtoken.verify(token, "123456", (err, decoded) => {
            if (err) {
                res.statusCode = 401;
                res.send({ message: "Token inválido." });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

module.exports = verifyToken;