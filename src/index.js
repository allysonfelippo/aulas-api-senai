import cors from 'cors';
import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';
import AutenticacaoController from './controllers/AutenticacaoController.js';

const port = 3000;

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

// autenticação
const autenticacaoController = new AutenticacaoController();
app.post('/logar', autenticacaoController.logar);

// CRUD Usuários
const usuariosController = new UsuariosController();
app.get('/usuarios', usuariosController.listar);
app.post('/usuarios', usuariosController.adicionar);
app.put('/usuarios', usuariosController.atualizar);
app.delete('/usuarios/:idUsuario', usuariosController.excluir);

app.listen(port, () => {
    console.log(`App funcionando corretamente na porta ${port}`);
});