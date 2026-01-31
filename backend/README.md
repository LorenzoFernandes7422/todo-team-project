# Backend - To-Do App

Backend em Node.js + Express para o projeto To-Do App. **Estrutura inspirada no padrão Laravel.**

---

## Comandos

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd todo-team-project/backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o servidor

**Produção:**
```bash
npm start
```

**Desenvolvimento:**
```bash
npm run dev
```

O servidor sobe em **http://localhost:3001**

### 4. Testar se está funcionando

Acesse no navegador ou via Postman/Insomnia:

- **http://localhost:3001** — mensagem de boas-vindas
- **http://localhost:3001/api/test** — rota de teste (retorna JSON)

---

## Estrutura de pastas

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/   # Lógica das rotas (handlers)
│   │   └── Middleware/    # Middlewares (auth, validação, etc.)
│   └── Models/           # Modelos de dados (quando usar banco)
├── config/                # Configurações (DB, env, etc.)
├── database/
│   ├── migrations/       # Migrations do banco de dados
│   └── seeders/          # Seeders (dados iniciais)
├── routes/               # Definição das rotas da API
├── storage/
│   └── logs/             # Arquivos de log
├── src/
│   └── server.js         # Ponto de entrada da aplicação
├── .gitignore
├── package.json
└── README.md
```

### O que vai em cada pasta

| Pasta | Uso |
|-------|-----|
| **app/Http/Controllers** | Funções que tratam as requisições (lógica de negócio) |
| **app/Http/Middleware** | Middlewares customizados (ex: autenticação JWT) |
| **app/Models** | Modelos de dados (quando integrar com banco) |
| **config** | Arquivos de configuração (banco, variáveis, etc.) |
| **database/migrations** | Scripts de criação/alteração de tabelas |
| **database/seeders** | Scripts para popular o banco com dados iniciais |
| **routes** | Definição das rotas (endpoints da API) |
| **storage/logs** | Logs da aplicação |
| **src/server.js** | Arquivo principal — inicia o Express e sobe o servidor |

---

## Tecnologias

- **Node.js** — runtime
- **Express** — framework web
- **CORS** — permissão de requisições do frontend

---

## Requisitos

- Node.js (versão 18 ou superior recomendada)
- npm

---

## Observações

- O CORS está configurado para aceitar requisições de `http://localhost:5173` (Vite).
- O arquivo `.env` é ignorado pelo Git — variáveis sensíveis ficam nele.
- O projeto está preparado para uso futuro de JWT e banco de dados.
