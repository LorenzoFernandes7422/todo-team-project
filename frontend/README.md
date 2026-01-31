# To-Do App - Frontend

---

## Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (já vem com o Node.js)

---

## Comandos para começar

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd todo-team-project
```

### 2. Entrar na pasta do frontend

```bash
cd frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar o projeto em modo desenvolvimento

```bash
npm run dev
```

O projeto será aberto em **http://localhost:5173** (ou outra porta se a 5173 estiver em uso).

---

## Outros comandos úteis

| Comando | Descrição |
|---------|------------|
| `npm run dev` | Inicia o servidor de desenvolvimento (com hot reload) |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint para verificar o código |

---

## Estrutura de pastas

```
frontend/
├── public/              # Arquivos estáticos (imagens, favicon)
├── src/
│   ├── assets/          # Imagens, ícones usados nos componentes
│   ├── components/      # Componentes reutilizáveis (Button, Card, etc.)
│   ├── context/         # Context API (ex: AuthContext para JWT)
│   ├── hooks/           # Custom hooks
│   ├── layouts/         # Layouts (Header, Sidebar, estrutura de páginas)
│   ├── pages/           # Telas/páginas da aplicação (Login, Dashboard, etc.)
│   ├── services/        # Chamadas à API (configuração do Axios, etc.)
│   ├── utils/           # Funções auxiliares
│   ├── App.jsx          # Componente raiz da aplicação
│   ├── App.css          # Estilos do App
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada (monta o React no DOM)
├── index.html           # HTML base
├── package.json
└── vite.config.js
```

### O que vai em cada pasta

| Pasta | Uso |
|-------|-----|
| **components/** | Componentes reutilizáveis (Button, Modal, TodoItem...) |
| **context/** | Estado global (AuthContext com token JWT, etc.) |
| **hooks/** | Custom hooks (useAuth, useTodos...) |
| **layouts/** | Estrutura comum das páginas (Header, Footer, Sidebar) |
| **pages/** | Telas da aplicação (Login, Dashboard, TodoList...) |
| **services/** | Configuração do Axios e funções que chamam a API |
| **utils/** | Funções auxiliares (formatação, validação, etc.) |

### CSS das páginas

O CSS de cada página fica **junto da página**, na mesma pasta:

```
pages/
├── Login.jsx
├── Login.css
├── Dashboard.jsx
└── Dashboard.css
```

---

## Tecnologias utilizadas

- **React 19** + **Vite 7**
- **React Router DOM** (rotas)
- **Axios** (chamadas à API)
- **Tailwind CSS** (estilização)
- **ESLint** (qualidade de código)

---

## Backend

O frontend foi preparado para consumir APIs de um backend separado (porta 3001). O backend deve estar rodando para que as chamadas à API funcionem.

---

## Dúvidas?

Entre em contato com a equipe do projeto.
