# Backend - To-Do App

API REST em **Node.js**, **Express** e **Prisma**, com autenticação JWT e banco **PostgreSQL**.

---

## Tecnologias

| Tecnologia    | Uso                    |
|---------------|------------------------|
| Node.js       | Runtime                |
| Express       | Framework web          |
| Prisma        | ORM (PostgreSQL)       |
| PostgreSQL    | Banco de dados         |
| JWT           | Autenticação (jsonwebtoken) |
| bcryptjs      | Hash de senhas         |
| dotenv        | Variáveis de ambiente  |
| CORS          | Requisições do frontend |
| nodemon       | Desenvolvimento (reload) |

---

## Pré-requisitos

- **Node.js** 18 ou superior  
- **npm**  
- **PostgreSQL** 12+ instalado e em execução (porta 5432)  

---

## Configuração do projeto

### 1. Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd todo-team-project/backend
npm install
```

### 2. Variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Edite o `.env`. Exemplo:

```env
# Porta do servidor
PORT=3001

# CORS (origem do frontend)
CORS_ORIGIN=http://localhost:5173

# JWT (use uma chave longa e aleatória em produção)
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=1h

# PostgreSQL
# Formato: postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/nome_do_banco"
```

| Variável      | Descrição                          |
|---------------|------------------------------------|
| `PORT`        | Porta do servidor (padrão: 3001)  |
| `CORS_ORIGIN` | URL do frontend permitida          |
| `JWT_SECRET`  | Chave para assinar os tokens JWT   |
| `JWT_EXPIRES_IN` | Validade do token (ex: 1h, 7d) |
| `DATABASE_URL`   | URL de conexão do PostgreSQL  |

**Importante:** o `.env` não é versionado. Nunca commite senhas ou chaves.

### 3. Banco de dados (PostgreSQL)

**Criar o banco:**

No terminal (psql) ou no pgAdmin:

```sql
CREATE DATABASE nome_do_banco;
```

Use o mesmo nome definido em `DATABASE_URL` no `.env`.

**Gerar o Prisma Client:**

```bash
npm run prisma:generate
```

**Criar as tabelas (migrations):**

```bash
npm run prisma:migrate
```

Quando solicitado, dê um nome à migration (ex.: `init`).

**Popular dados iniciais (seed – admin):**

```bash
npx prisma db seed
```

Isso cria um admin de exemplo (ver seção [Usuário seed](#usuário-seed)).

### 4. Rodar o servidor

**Produção:**

```bash
npm start
```

**Desenvolvimento (com reload):**

```bash
npm run dev
```

O servidor sobe em **http://localhost:3001**.

---

## Scripts disponíveis

| Comando                  | Descrição                          |
|--------------------------|------------------------------------|
| `npm start`              | Inicia o servidor (produção)       |
| `npm run dev`             | Inicia com nodemon (desenvolvimento) |
| `npm run prisma:generate`| Gera o Prisma Client               |
| `npm run prisma:migrate`  | Cria/aplica migrations             |
| `npx prisma db seed`      | Executa o seed (admin inicial)     |

---

## Estrutura de pastas

```
backend/
├── prisma/
│   ├── schema.prisma       # Modelos e conexão do banco
│   ├── migrations/         # Migrations (criadas pelo Prisma)
│   └── seed.js             # Seed do admin inicial
├── src/
│   ├── server.js           # Entrada: sobe o servidor
│   ├── app.js              # Configuração do Express (CORS, rotas)
│   ├── config/             # Configurações (JWT, etc.)
│   │   └── jwt.js
│   ├── controllers/        # Lógica das rotas
│   │   ├── authController.js
│   │   └── adminController.js
│   ├── lib/                # Prisma Client (singleton)
│   │   └── prisma.js
│   ├── middleware/         # Middlewares (auth JWT)
│   │   └── auth.js
│   └── routes/             # Definição das rotas
│       └── api.js
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

| Pasta / arquivo     | Função                                      |
|---------------------|---------------------------------------------|
| `prisma/schema.prisma` | Modelos (ex.: Admin) e provider PostgreSQL |
| `prisma/seed.js`    | Cria o admin inicial (bcrypt no password)   |
| `src/server.js`     | Carrega dotenv e inicia o app               |
| `src/app.js`        | Express: CORS, JSON, montagem das rotas     |
| `src/config/jwt.js` | Secret e expiresIn do JWT                   |
| `src/controllers/`  | Handlers (login, CRUD admin)                |
| `src/lib/prisma.js`| Instância única do Prisma Client            |
| `src/middleware/auth.js` | Valida JWT e coloca usuário em `req.usuario` |
| `src/routes/api.js` | Rotas da API (/api/*)                       |

---

## Rotas da API

Base URL: `http://localhost:3001` (ou a porta definida em `PORT`).

| Método | Rota              | Descrição                    |
|--------|-------------------|------------------------------|
| GET    | `/`               | Mensagem de boas-vindas      |
| GET    | `/api/test`       | Teste (JSON)                 |
| POST   | `/api/auth/login`| Login (retorna JWT)           |
| POST   | `/api/admin`     | Criar admin                   |
| GET    | `/api/admin`     | Listar admins                 |
| GET    | `/api/admin/:id` | Buscar admin por ID           |

Rotas que exigem autenticação podem usar o middleware `auth` (header `Authorization: Bearer <token>`).

---

## Usuário seed

Após rodar `npx prisma db seed`, existe um admin de teste:

| Campo   | Valor              |
|---------|--------------------|
| name    | admin              |
| email   | admin@support.com  |
| senha   | admin123           |

A senha é armazenada com hash (bcrypt). Use esses dados apenas em desenvolvimento.

---

## Modelo de dados (Prisma)

**Admin**

| Campo      | Tipo     | Observação        |
|------------|----------|-------------------|
| id         | Int      | PK, autoincrement |
| name       | String   |                   |
| email      | String   | Único             |
| password   | String   | Hash (bcrypt)     |
| createdAt  | DateTime |                   |
| updatedAt  | DateTime |                   |

---

## Observações

1. **Prisma 5.20** — O projeto usa Prisma 5.20.0 (evita bug de "path" em versões mais novas no Windows). Não altere a versão sem testar `prisma generate`.

2. **CORS** — Configurado para a origem em `CORS_ORIGIN` (ex.: frontend Vite em `http://localhost:5173`). Ajuste se o frontend rodar em outra URL.

3. **JWT** — O login retorna um token; rotas protegidas devem usar o middleware `auth` e o header `Authorization: Bearer <token>`.

4. **PostgreSQL** — O schema está com `provider = "postgresql"`. A conexão é feita via `DATABASE_URL` no `.env`.

---

## Requisitos de ambiente

- Node.js 18+
- npm
- PostgreSQL 12+ (rodando localmente ou em serviço remoto)
- Arquivo `.env` preenchido a partir do `.env.example`

---

## Resumo rápido (quem já tem Node e PostgreSQL)

```bash
cd todo-team-project/backend
npm install
cp .env.example .env
# Editar .env (DATABASE_URL, JWT_SECRET, etc.)
# Criar o banco no PostgreSQL
npm run prisma:generate
npm run prisma:migrate
npx prisma db seed
npm run dev
```

Acesse: http://localhost:3001/api/test
