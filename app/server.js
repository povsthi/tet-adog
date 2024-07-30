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
    connection.query(sqlQry, id, (error, results) => {
        if (error) {
            res.json(error);
        } else {
            res.json(results);
        }
        connection.end();
        console.log('Executou: execSQLQuery');
    });
};

async function resultSQLQuery(sqlQry, id) {
    const connection = await mysql.createConnection(db);
    try {
        let [result] = await connection.promise().query(sqlQry, id);
        return result;
    } catch (error) {
        console.log("Erro: " + error);
        throw error;
    } finally {
        connection.end();
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/usuarios', (req, res) => {
    execSQLQuery("SELECT * from usuario", [], res);
});

app.post('/usuarios', (req, res) => {
    const id = [req.body.nome, req.body.email, req.body.senha];
    execSQLQuery("INSERT INTO usuario VALUES(null, ?, ?, ?)", id, res);
});

app.post('/login', async (req, res) => {
    const id = [req.body.email, req.body.senha];
    let result = await resultSQLQuery('SELECT * FROM usuario WHERE usu_email=? and usu_senha=?', id);

    if (result.length > 0) {
        res.json({ 
            "mensagem": "Usuário válido",
            "idUsuario": result[0].usu_id
        });
    } else {
        res.json({ "mensagem": "Usuário Inválido" });
    }
    console.log(result);
});


app.put('/usuarios/:id', (req, res) => {
    const id = [req.body.nome, req.body.email, req.body.senha, req.params.id];
    execSQLQuery("UPDATE usuario SET usu_nome=?, usu_email=?, usu_senha=? WHERE usu_id=?", id, res);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = [req.params.id];
    execSQLQuery("DELETE FROM usuario WHERE usu_id=?", id, res);
});

app.get('/usuarios/:id', (req, res) => {
    const id = [req.params.id];
    execSQLQuery("SELECT * FROM usuario WHERE usu_id=?", id, res);
});

app.listen(port, () => {
    console.log('App escutando a porta ' + port);
});

