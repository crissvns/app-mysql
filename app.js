//Variáveis de inicialização do sistema
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const router = express.Router();

//Registro de controllers
const produtosController = require('./app/controllers/produtosController')
const usuarioController = require('./app/controllers/usuarioController')

// Tratamento para parâmetros json
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

produtosController(router);
usuarioController(router);

app.use("/", router);



/*

//EndPoint
app.get("/veiculos", (request, response) => {
    response.send("<html><body><h1>Você chamou a rota de veículos</h1></body></html>");
});

//EndPoint
app.get("/clientes", (req, res) => {
    let listaClientes = [];

    listaClientes.push({ ID: 1, Nome: "Cliente 01" });
    listaClientes.push({ ID: 2, Nome: "Cliente 02" });
    listaClientes.push({ ID: 3, Nome: "Cliente 03" });
    listaClientes.push({ ID: 4, Nome: "Cliente 04" });
    listaClientes.push({ ID: 5, Nome: "Cliente 05" });

    res.send(listaClientes);
})

//EndPoint
app.get("/clientes/:id", (req, res) => {
    let clientId = req.params.id;

    switch (clientId) {
        case "1":
            res.send({ ID: clientId, Nome: "Cliente 01" });
            break;
        case "2":
            res.send({ ID: clientId, Nome: "Cliente 02" });
            break;
        default:
            res.statusCode = 506;
            res.send({ error: "Cliente Inválido" });
            break;
    }

    res.send(listaClientes);
})

//EndPoint
app.post("/clientes", (req, res) => {
    try {
        var newObj = req.body;
        newObj.ID = "Novo ID gerado pelo processamento server"
        newObj.UpdateDate = new Date

        res.send(newObj);
    } catch (error) {
        res.status = 505; //Internal server error
        res.send(error);
    }
});

app.put("/clientes/:id", (req, res) => {
    try {
        res.send({ ID: req.params.id, Nome: "Cliente alterado", UpdateDate: new Date });
    } catch (error) {
        res.status = 505; //Internal server error
        res.send(error);
    }
})

app.delete("/clientes/:id", (req, res) => {
    try {
        res.send({ message: "Cliente " + req.params.id + " excluído com sucesso." });
    } catch (error) {
        res.status = 505; //Internal server error
        res.send(error);
    }
})
*/

app.listen(3000, () => {
    console.log('Servidor no ar');
});