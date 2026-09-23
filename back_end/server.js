const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa a conexão com o banco

const app = express();
app.use(cors());
app.use(express.json());

// Rota de Login (usada pelo main.js)
app.post('/api/login', async (req, res) => {
  // ... Seu código de login atual
});

// NOVA ROTA: Cadastro de Animais (usada pelo cadastro.js)
app.post('/api/animais', async (req, res) => {
  const { raca, idade, porte, genero } = req.body;

  if (!raca || !idade || !porte || !genero) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO animais (raca, idade, porte, genero) VALUES (?, ?, ?, ?)';
    await db.query(query, [raca, idade, porte, genero]);
    
    return res.status(201).json({ message: 'Animal cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao salvar no banco de dados.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
