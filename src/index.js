const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Middleware para permitir o uso do req.body
app.use(express.json());

// Leitura do arquivo JSON
const loadData = () => {
  const data = fs.readFileSync('src/playlists.json');
  return JSON.parse(data);
};

// Carregamento de dados
let jsonData = loadData();
let playlists = jsonData.playlists;
let accounts = jsonData.accounts;
let musics = jsonData.musics;

// Função para salvar os dados no arquivo JSON
const saveData = () => {
  const data = {
    playlists: playlists,
    accounts: accounts,
    musics: musics
  };
  fs.writeFileSync('src/playlists.json', JSON.stringify(data));
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

// Alterar uma playlist existente
app.put('/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const { nome, musicas } = req.body;
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);

  if (playlistIndex !== -1) {
    const updatedPlaylist = {
      id: playlists[playlistIndex].id,
      nome,
      musicas,
    };

    playlists[playlistIndex] = updatedPlaylist;

    saveData();

    res.status(200).json(updatedPlaylist);
  } else {
    res.status(404).json({ error: 'Playlist não encontrada' });
  }
});

// Deletar uma playlist
app.delete('/playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);

  if (playlistIndex !== -1) {
    playlists.splice(playlistIndex, 1);

    saveData();

    res.status(200).json({ message: 'Playlist removida com sucesso' });
  } else {
    res.status(404).json({ error: 'Playlist não encontrada' });
  }
});

