import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';
const port = 3000;

const app = express();
app.use(express.json());

const usuariosController = new UsuariosController();

app.get('/usuarios', usuariosController.listar);
app.post('/usuarios', usuariosController.adicionar);
app.put('/usuarios', usuariosController.atualizar);
app.delete('/usuarios/:idUsuario', usuariosController.excluir);

app.listen(port, () => {
    console.log(`App funcionando corretamente na porta ${port}`);
});