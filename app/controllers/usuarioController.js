const executarComando = require("../../config/executarComando")
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

module.exports = (router) => {

    router.post("/login", (req, res) => {
        try {
            let usuario = req.body;
            let sql = "SELECT id, password FROM usuario WHERE login = '" + usuario.login + "'"

            executarComando(sql, (result) => {
                if (result.length > 0) {
                    if (bcryptjs.compareSync(usuario.password, result[0].password)) {

                        let token = jsonwebtoken.sign({ id: result[0].id }, "123456", { expiresIn: 86400 });

                        res.send({ message: "Usuário logado com sucesso!", token: token });
                    } else {
                        res.send({ message: "Login e/ou senha inválidos!" });
                    }
                } else {
                    res.send({ message: "Login e/ou senha inválidos!" });
                }
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });

    router.post("/register", (req, res) => {
        try {
            let usuario = req.body;

            executarComando("SELECT UUID() NEW_ID", (result) => {
                if (result) {
                    let uuid = result[0].NEW_ID;
                    let hashPassword = bcryptjs.hashSync(usuario.password, 8);

                    let sql = "insert into usuario(id,nome,login,password,data_hora_criacao,data_hora_ultimo_acesso) values (" +
                        "'" + uuid + "'," +
                        "'" + usuario.nome + "'," +
                        "'" + usuario.login + "'," +
                        "'" + hashPassword + "'," +
                        "now()," +
                        "now());"

                    executarComando(sql, (result) => {
                        if (result.affectedRows > 0) {
                            res.send({ message: "Usuário incluído com sucesso!" });
                        } else {
                            res.send({ message: "Problema ao inserir usuário!" });
                        }
                    });
                }
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });
}