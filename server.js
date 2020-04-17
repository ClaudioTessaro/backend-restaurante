// Lê os dados do arquivo .env
require("dotenv").config();

// Importa os frameworks
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Conecta ao banco de dados
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("conectado ao banco de dados"));

// Cria o servidor web
const app = express();
const http = require("http").createServer(app);

// Configura o servidor web
app.use(cors()); // permite requisições CORS de qualquer host
app.use(express.json()); // se o corpo da requisição é json, popula um objeto req.body com seu valor

// Configura os roteamentos
app.get("/", (req, res) => {
  res.send("Backend do Restaurante - Node.JS + MongoDB");
});
app.use("/produtos", require("./rotas/produtos"));

// Inicia o servidor web
http.listen(parseInt(process.env.SERVER_PORT), () => {
  console.log("servidor iniciado com sucesso");
  console.log(
    "Servidor rodando em http://localhost:" + process.env.SERVER_PORT
  );
});
