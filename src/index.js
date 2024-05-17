const express = require('express');
const port = 3000;


const app = express();
app.use(express.json());

let usuarios = [];

app.get('/usuarios', (req, res) => {
    let resultado = usuarios;

    if (req.query.filtro) {
        resultado = usuarios.filter((u) => {
            return u.nome.includes(req.query.filtro);
        })
    }

    res.send(usuarios);
});

app.post('/usuarios', (req, res) => {
    console.log(req.body);

    if (!req.body || !req.body.nome || !req.body.email) {
        res.status(400).send("Os campo do nome e email são obrigatórios!");
        return;
    }

    const usuarioExistente = usuarios.find((usu) => usu.email === req.body.email);
    if (usuarioExistente) {
        res.status(409).send('Usuário já existe!');
        return;
    }

    const novoUsuario = { ...req.body, id: +new Date() };
    usuarios.push(novoUsuario)
    res.status(201).send(novoUsuario);
});

app.put('/usuarios', (req, res) => {
    usuarios = usuarios.map((user) => {
        if (user.id === req.body.id) {
            return req.body;
        } else {
            return user;
        }
    });

    res.send("Operação efetuada com sucesso!");
});

app.delete('/usuarios/:idUsuario', (req, res) => {
    usuarios = usuarios.filter((user) => {
        return user.id !== +req.params.idUsuario;
    });

    res.send("Operação efetuada com sucesso!");
});

app.listen(port, () => {
    // console.log(`App listening on port ${port}`);
});
