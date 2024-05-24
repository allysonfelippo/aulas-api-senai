import ConexaoMySql from "../database/conexaoMySql.js";

class UsuariosController {
    async listar(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'SELECT * FROM dados_usuarios';
            const [resultado] = await conexao.execute(sql);

            resp.send(resultado.map((usu) => {
                delete usu.senha;
                return usu;
            }));
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async adicionar(req, resp) {
        try {
            const novoUsuario = req.body;

            if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
                resp.status(400).send('Os campos nome, email e senha são obrigatórios!');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'INSERT INTO dados_usuarios (nome, email, senha) VALUES(?,?,md5(?))';
            const [resultado] = await conexao.execute(sql, [novoUsuario.nome, novoUsuario.email, novoUsuario.senha]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async atualizar(seq, resp) {
        try {
            const usuarioEditar = req.body;

            if (!usuarioEditar.nome || !usuarioEditar.email) {
                resp.status(400).send('Os campos nome e email são obrigatórios para atualizar.');
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'UPDATE dados_usuarios SET nome = ?, email = ? WHERE id = ?';
            const [resultado] = await conexao.execute(sql, [
                usuarioEditar.nome,
                usuarioEditar.email,
                usuarioEditar.id,
            ]);

            resp.send({ resultado });
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async excluir(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const sql = 'DELETE FROM dados_usuarios WHERE id = ?';
            const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }
}

export default UsuariosController;