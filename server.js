const express = require("express"); // Framework para criar servidor e rotas
const mysql = require("mysql2"); // Biblioteca para conectar no MySQL
const path = require("path"); // Módulo nativo do Node para lidar com caminhos

const app = express(); // Cria a aplicação Express
 
// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "biblioteca_filmes", // Nome do banco que você criou
});

// ---------- ROTAS ----------

// GET /usuarios → retorna todos os usuários do banco
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

app.get("/filmes", (req, res) => {
  db.query("SELECT * FROM filmes", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

app.get("/avaliacoes", (req, res) => {
  db.query("SELECT * FROM avaliacoes", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

app.post("/filmes", (req, res) => {
  const { nome, genero, diretor, ano } = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO filmes (nome, genero, diretor, ano) VALUES (?, ?, ?, ?)", // Query SQL com placeholders
    [nome, genero, diretor, ano], // Valores que substituem os "?"
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Comentario adicionado com sucesso!" }); // Retorno de sucesso
    }
  );
});

// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);