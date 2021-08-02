const executarComando = require("../../config/executarComando")
const verifyToken = require("../../auth/verifyToken")

module.exports = (router) => {

    router.get("/produtos", verifyToken, (req, res) => {
        try {
            //req.userId -- Autorização

            executarComando("SELECT * FROM  produtos", (result) => {
                res.json(result);
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });

    router.get("/produtos/:id", verifyToken, (req, res) => {
        try {
            executarComando("SELECT * FROM  produtos WHERE ID = " + req.params.id, (result) => {
                res.json(result);
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });

    router.post("/produtos", verifyToken, (req, res) => {
        try {
            let produto = req.body;

            let sql = "insert into produtos(nome,descricao,preco,quantidade,quantidade_minima) values (" +
                "'" + produto.nome + "'," +
                "'" + produto.descricao + "'," +
                "" + produto.preco + "," +
                "" + produto.quantidade + "," +
                "" + produto.quantidade_minima + ");"

            executarComando(sql, (result) => {
                if (result.affectedRows > 0) {
                    res.send({ message: "Produto incluído com sucesso!" });
                } else {
                    res.send({ message: "Problema ao inserir produto!" });
                }
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });

    router.put("/produtos/:id", verifyToken, (req, res) => {
        try {
            let produto = req.body;
            let sql = "update produtos " +
                "set " +
                "nome = '" + produto.nome + "', " +
                "descricao = '" + produto.descricao + "', " +
                "preco = " + produto.preco + "," +
                "quantidade = " + produto.quantidade + ", " +
                "quantidade_minima = " + produto.quantidade_minima + " " +
                "where ID = " + req.params.id;

            executarComando(sql, (result) => {
                if (result.affectedRows > 0) {
                    res.send({ message: "Produto alterado com sucesso!" });
                } else {
                    res.send({ message: "Problema ao alterar produto!" });
                }
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });

    router.delete("/produtos/:id", verifyToken, (req, res) => {
        try {
            executarComando("DELETE FROM produtos WHERE ID = " + req.params.id, function(result) {
                if (result.affectedRows > 0) {
                    res.send({ message: "Produto deletado com sucesso!" });
                } else {
                    res.send({ message: "Problema ao deletar produto!" });
                }
            });
        } catch (error) {
            res.statusCode = 505;
            res.send(error);
        }
    });
}