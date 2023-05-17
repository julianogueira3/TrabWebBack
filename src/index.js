const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Middleware para permitir o uso do req.body
app.use(express.json());

// Carregamento de dados mockados
let playlists = require('./playlists');
let musics = require('./music');
const accounts = require('./accounts');
let userPlaylists = require('./userplaylists');


// Função para salvar os dados nos arquivos
const saveData = () => {
  fs.writeFileSync('./playlists.js', 'module.exports = ' + JSON.stringify(playlists));
  fs.writeFileSync('./music.js', 'module.exports = ' + JSON.stringify(musics));
  fs.writeFileSync('./accounts.js', 'module.exports = ' + JSON.stringify(accounts));
};

// Função para gerar ID aleatório
const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber.toString();
};

// Verificar se um usuário existe
function isUserExists(userId) {
  return accounts.some((user) => user.userId.toString() === userId);
}

//mostrar user playlist

app.get('/userplaylists', (req, res) => {
  res.json(userPlaylists);
});


// Obter todas as playlists
app.get('/playlists', (req, res) => {
  res.json(playlists);
});

// Obter uma playlist pelo ID
app.get('/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) {
    res.status(404).json({ message: 'Playlist não encontrada.' });
  } else {
    res.json(playlist);
  }
});

// Novo usuário
app.post('/usuarios', (req, res) => { 
  const { username, email, password } = req.body;
  const userId = generateId();
  const novoUsuario = { userId: userId, username, email, password }; // Adicione o ID gerado ao campo userId
  accounts.push(novoUsuario);
  saveData();
  res.status(201).json(novoUsuario);
});


// Obter um usuário pelo endereço de e-mail
app.get('/usuarios', (req, res) => {
  const email = req.query.email;
  const usuario = accounts.find((u) => u.email === email);
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  } else {
    res.json(usuario);
  }
});

// Atualizar um usuário existente
app.put('/usuarios/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;
  const usuarioIndex = accounts.findIndex((u) => u.userId === userId);
  if (usuarioIndex === -1) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  } else {
    accounts[usuarioIndex].username = username;
    accounts[usuarioIndex].email = email;
    saveData();
    res.json(accounts[usuarioIndex]);
  }
});

// Adicionar uma nova música
app.post('/musicas', (req, res) => {
  const { id, nome, artista, imgpath } = req.body;
  const novaMusica = { id, nome, artista, imgpath };
  musics.push(novaMusica);
  saveData();
  res.status(201).json(novaMusica);
});


/// Criar uma nova playlist
app.post('/playlists', (req, res) => {
  const { userId, nome, musicas } = req.body;

  if (!isUserExists(userId)) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
    return;
  }

  const id = generateId();
  const novaPlaylist = { id, userId, nome, musicas }; 
  playlists.push(novaPlaylist);
  saveData();
  res.status(201).json(novaPlaylist);
});

// Obter músicas pelo nome
app.get('/musicas', (req, res) => {
  const nome = req.query.nome;
  const musicasFiltradas = musics.filter((m) => m.nome.includes(nome));
  res.json(musicasFiltradas);
});

// Obter uma música pelo ID
app.get('/musicas/:id', (req, res) => {
  const musicaId = (req.params.id);
  const musica = musics.find((m) => m.id === musicaId);
  if (!musica) {
    res.status(404).json({ message: 'Música não encontrada.' });
  } else {
    res.json(musica);
  }
});

// Adicionar uma música a uma playlist do usuário
app.post('/usuarios/:userId/playlists/:playlistId/musicas', (req, res) => {
  const userId = parseInt(req.params.userId);
  const playlistId = parseInt(req.params.playlistId);
  const musicaId = parseInt(req.body.musicaId);

  const usuario = accounts.find((u) => u.userId === userId);
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
    return;
  }

  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) {
    res.status(404).json({ message: 'Playlist não encontrada.' });
    return;
  }

  const musica = musics.find((m) => m.id === musicaId);
  if (!musica) {
    res.status(404).json({ message: 'Música não encontrada.' });
    return;
  }

  playlist.musicas.push(musica);
  saveData();
  res.status(201).json(playlist);
});

// Remover uma música de uma playlist do usuário
app.delete('/usuarios/:userId/playlists/:playlistId/musicas/:musicaId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const playlistId = parseInt(req.params.playlistId);
  const musicaId = parseInt(req.params.musicaId);

  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) {
    res.status(404).json({ message: 'Playlist não encontrada.' });
    return;
  }

  const musicaIndex = playlist.musicas.findIndex((m) => m.id === musicaId);
  if (musicaIndex === -1) {
    res.status(404).json({ message: 'Música não encontrada na playlist.' });
    return;
  }

  playlist.musicas.splice(musicaIndex, 1);
  saveData();
  res.status(200).json(playlist);
});

