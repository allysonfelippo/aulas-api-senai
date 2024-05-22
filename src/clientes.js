const express = require('express');
const port = 3010;

const app = express();
app.use(express.json());

var clientes = [];

app.get('/clientes', (req, res) => {
 
    res.send(clientes);
});

app.post('/clientes', (req, res) => {
    const novoCliente = ( req.body)
    clientes.push(novoCliente)
    console.log(novoCliente);
    res.send(novoCliente);
});

app.put('/', (req, res) => {



    res.send('Chamou o PUT!');
});

app.delete('/', (req, res) => {
    res.send('Chamou o DELETE!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
