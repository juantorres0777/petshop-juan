# 🐾 Petshop - Sistema Full Stack

Sistema full stack de gerenciamento de petshop, desenvolvido como Trabalho de Conclusão de Curso (TCC).

## 🚀 Tecnologias

**Back-end**
- Node.js + Express
- Prisma ORM (v7) + MySQL
- CORS

**Front-end**
- HTML5 + CSS3
- JavaScript puro (Vanilla JS)
- Bootstrap 5

**Infraestrutura**
- Docker + Docker Compose (MySQL)

## 📁 Estrutura do projeto

```
petshop/
├── back-end/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── generated/          # client do Prisma gerado (não versionado)
│   └── server.js
├── public/                 # front-end
│   ├── index.html
│   ├── css/
│   └── js/
├── docker-compose.yml
└── package.json
```

## ⚙️ Como rodar o projeto

### 1. Pré-requisitos
- Node.js instalado
- Docker instalado

### 2. Suba o banco de dados MySQL
```bash
docker compose up -d
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` dentro da pasta `back-end` com:
```env
DATABASE_URL="mysql://root:123@127.0.0.1:3306/petshop"
```

### 4. Instale as dependências
```bash
cd back-end
npm install
```

### 5. Gere o Prisma Client e aplique as migrations
```bash
npx prisma generate
npx prisma migrate dev
```

### 6. Rode o servidor
```bash
node server.js
```
O servidor sobe em `http://localhost:3000`.

### 7. Abra o front-end
Abra o arquivo `public/index.html` no navegador (recomenda-se usar uma extensão como Live Server).

## ✅ Funcionalidades implementadas

- [x] Tela de login (Bootstrap)
- [x] Autenticação de login (`/api/login`)
- [ ] Cadastro de usuário (`/api/register`)
- [ ] CRUD de pets
- [ ] Agendamento de serviços
- [ ] Dashboard do usuário
