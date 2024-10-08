const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const port = 3000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const db = {
    host: '54.173.126.116',
    port: 3306,
    user: 'tet-adog',
    password: 'adog-1259',
    database: 'tet-adog'
};

const execSQLQuery = (sqlQry, id, res) => {
    const connection = mysql.createConnection(db);
    connection.query(sqlQry, id, (error, results, fields) => {
        if (error) {
            res.json(error);
        } else {
            res.json(results);
        }
        connection.end();
        console.log('Executou: execSQLQuery');
    });
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/usuarios', (req, res) => {
    const id = [];
    execSQLQuery("SELECT * from Usuario", id, res);
});

app.get('/pets', (req, res) => {
    const id = [];
    execSQLQuery("SELECT * from Pet", id, res);
});

app.get('/racas', (req, res) => {
    const id = [];
    execSQLQuery("SELECT * from Raca", id, res);
});

app.get('/parceiros', (req, res) => {
    const id = [];
    execSQLQuery("SELECT * from Parceiro", id, res);
});

app.post('/usuarios', (req, res) => {
    console.log('Recebendo requisição POST em /usuarios');
    const { email, nomeUsuario, cpf, telefoneUsuario, senha, rua, cidade, bairro, numero, tipo, foto, data_nascimento, descricao } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [email, nomeUsuario, cpf, telefoneUsuario, senha, rua, cidade, bairro, numero, tipo, foto, data_nascimento, descricao];
    const query = `INSERT INTO Usuario (email, nomeUsuario, cpf, telefoneUsuario, senha, rua, cidade, bairro, numero, tipo, foto, data_nascimento, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    execSQLQuery(query, id, res);
});

app.post('/pets', (req, res) => {
    console.log('Recebendo requisição POST em /pets');
    const { nomePet, tipoPet, raca, sexo, porte, dataNascimento } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [nomePet, tipoPet, raca, sexo, porte, dataNascimento];
    const query = `INSERT INTO Pet (nomePet, tipoPet, raca, sexo, porte, dataNascimento) VALUES (?, ?, ?, ?, ?, ?)`;

    execSQLQuery(query, id, res);
});

app.post('/racas', (req, res) => {
    console.log('Recebendo requisição POST em /racas');
    const { nomeRaca, porteRaca, comportamento, quantPelo } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [nomeRaca, porteRaca, comportamento, quantPelo];
    const query = `INSERT INTO Raca (nomeRaca, porteRaca, comportamento, quantPelo) VALUES (?, ?, ?, ?)`;

    execSQLQuery(query, id, res);
});

app.post('/parceiros', (req, res) => {
    console.log('Recebendo requisição POST em /parceiros');
    const { nomeParceiro, tipoParceiro, telefoneParceiro, local_parceiro } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [nomeParceiro, tipoParceiro, telefoneParceiro, local_parceiro];
    const query = `INSERT INTO Parceiro (nomeParceiro, tipoParceiro, telefoneParceiro, local_parceiro) VALUES (?, ?, ?, ?)`;

    execSQLQuery(query, id, res);
});

app.post('/anuncios', (req, res) => {
    console.log('Recebendo requisição POST em /anuncios');
    const { tipoAnuncio, dataAnuncio } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [tipoAnuncio, dataAnuncio];
    const query = `INSERT INTO Anuncio (tipoAnuncio, dataAnuncio) VALUES (?, ?)`;

    execSQLQuery(query, id, res);
});

app.post('/interesses', (req, res) => {
    console.log('Recebendo requisição POST em /interesses');
    const { idUsuario, idPet } = req.body;
    console.log('Dados recebidos:', req.body);

    const id = [idUsuario, idPet];
    const query = `INSERT INTO Interesses (idUsuario, idPet) VALUES (?, ?)`;

    execSQLQuery(query, id, res);
});

async function resultSQLQuery(sqlQry, id) {
    const connection = await mysql.createConnection(db);
    let [result] = await connection.promise().query(sqlQry, id);
    try {
        return result;
    } catch (error) {
        console.log("Erro: " + error);
        throw error;
    }
}

app.post('/login', async (req, res) => {
    const id = [req.body.email, req.body.senha];
    let result = await resultSQLQuery('SELECT * FROM Usuario WHERE email=? and senha=?', id);

    if (result.length > 0)
        res.json({ "mensagem": "Usuário válido" });
    else {
        res.json({ "mensagem": "Usuário Inválido" });
    }
    console.log(result);
    console.log("brilhou");
});


app.put('/pets/:idPet', (req, res) => {
    const idPet = req.params.idPet; 
    const { nomePet, tipoPet, raca, sexo, porte, dataNascimento } = req.body;

    const query = `
        UPDATE Pet 
        SET nomePet = ?, tipoPet = ?, raca = ?, sexo = ?, porte = ?, dataNascimento = ?
        WHERE idPet = ?
    `;

    const params = [nomePet, tipoPet, raca, sexo, porte, dataNascimento, idPet];
    execSQLQuery(query, params, res);
});


app.put('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario; 
    const { email, nomeUsuario, cpf, telefoneUsuario, senha, rua, cidade, bairro, numero, tipo, foto, data_nascimento, descricao } = req.body; // Obtém os dados atualizados do corpo da requisição

    const query = `
        UPDATE Usuario 
        SET email = ?, nomeUsuario = ?, cpf = ?, telefoneUsuario = ?, senha = ?, rua = ?, cidade = ?, bairro = ?, numero = ?, tipo = ?, foto = ?, data_nascimento = ?, descricao = ?
        WHERE idUsuario = ?
    `;

    const params = [email, nomeUsuario, cpf, telefoneUsuario, senha, rua, cidade, bairro, numero, tipo, foto, data_nascimento, descricao, idUsuario];
    execSQLQuery(query, params, res);
});



app.delete('/pets/:idPet', (req, res) => {
    const idPet = req.params.idPet; 
    const query = `DELETE FROM Pet WHERE idPet = ?`;

    execSQLQuery(query, [idPet], res);
});


app.delete('/usuarios/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario; 
    const query = `DELETE FROM Usuario WHERE idUsuario = ?`;

    execSQLQuery(query, [idUsuario], res);
});


app.listen(port, () => {
    console.log(`App escutando a porta ${port}`);
});


