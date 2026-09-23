const mysql = require('mysql2');

// Cria um pool de conexões com o banco de dados MySQL do Docker
const pool = mysql.createPool({
  host: 'localhost',       // Se o Node rodar fora do Docker, use 'localhost'. Se rodar dentro, altere para 'db'
  user: 'root',            // Usuário configurado no Docker Compose
  password: '123',         // Senha configurado no Docker Compose (MYSQL_ROOT_PASSWORD)
  database: 'petshop',     // Nome do banco de dados (MYSQL_DATABASE)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Transforma o pool para aceitar Promises (permitindo o uso de async/await)
const db = pool.promise();

// Testa a conexão ao iniciar o servidor para garantir que o banco está acessível
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco de dados MySQL:', err.message);
  } else {
    console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
    connection.release(); // Libera a conexão de teste de volta para o pool
  }
});

module.exports = db;
