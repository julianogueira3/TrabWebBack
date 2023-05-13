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
let playlists = require('../src/playlists');
let musics = require('../src/music');
let accounts = require('../src/accounts');
let userPlaylists = require('./userPlaylist');

// Função para salvar os dados nos arquivos
const saveData = () => {
  fs.writeFileSync('./playlists.js', 'module.exports = ' + JSON.stringify(playlists));
  fs.writeFileSync('./music.js', 'module.exports = ' + JSON.stringify(musics));
  fs.writeFileSync('./accounts.js', 'module.exports = ' + JSON.stringify(accounts));
  fs.writeFileSync('./userPlaylist.js', 'module.exports = ' + JSON.stringify(userPlaylists));
};

// Função para gerar ID aleatório
const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber.toString();
};

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
  const id = generateId();
  const novoUsuario = { id, username, email, password };
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
app.put('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { nome, email } = req.body;
  const usuarioIndex = accounts.findIndex((u) => u.id === userId);
  if (usuarioIndex === -1) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  } else {
    const novoId = generateId();
    accounts[usuarioIndex] = { id: novoId, nome, email };
    saveData();
    res.json(accounts[usuarioIndex]);
  }
});

// Criar uma nova playlist
app.post('/playlists', (req, res) => {
  const { nome, musicas } = req.body;
  const id = generateId();
  const novaPlaylist = { id, nome, musicas };
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
  const musicaId = parseInt(req.params.id);
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

  const usuario = accounts.find((u) => u.id === userId);
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado.' });
    return;
  }

  const playlist = userPlaylists.find((p) => p.id === playlistId && p.userId === userId);
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

  const playlist = userPlaylists.find((p) => p.id === playlistId && p.userId === userId);
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

// Exemplo de uso:
// POST /usuarios/1/playlists/1/musicas
// Corpo da requisição: { "musicaId": 1 }
// Adiciona a música com ID 1 à playlist com ID 1 do usuário com ID 1

// DELETE /usuarios/1/playlists/1/musicas/1
// Remove a música com ID 1 da playlist com ID 1 do usuário com ID 1