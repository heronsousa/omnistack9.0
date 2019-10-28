const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Servidor acessar o protocolo web socket
const socket = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();

// Extrair servidor http do express
const server = http.Server(app);

// Server tem acesso ao protocolo web socket
const io = socket(server);

// Ouvir todos os usuários que entram na aplicação
io.on('connection', socket => {
    // socket é a conexão com o usuário
    console.log('Usuário conectado', socket.id);
});

mongoose.connect('mongodb+srv://omnis:omnis@cluster0-hrfg8.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);