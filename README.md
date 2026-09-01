# IHEMP Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=black" alt="Render" />
</p>

API REST desenvolvida para o projeto **IHEMP**, utilizando Node.js, Express, MongoDB e autenticação com JWT.

O backend é responsável pelas regras de negócio da aplicação, autenticação de usuários, autorização por perfil, gerenciamento de lojas, produtos, pedidos, controle de estoque e integração com o frontend.

---

## Links do projeto

### Frontend

Aplicação web publicada na Vercel:

**[Acessar aplicação](https://ihemp-frontend.vercel.app)**

Repositório do frontend:

**[ihemp-frontend](https://github.com/MATEUSMOTA45/ihemp-frontend)**

### Backend

API publicada no Render:

**[https://ihemp-backend-docker.onrender.com](https://ihemp-backend-docker.onrender.com)**

Exemplo de rota pública:

```text
GET https://ihemp-backend-docker.onrender.com/api/produtos

```
## Sobre o projeto

O **IHEMP** é uma aplicação Full Stack inspirada em plataformas de delivery.

Este repositório contém a API REST responsável pelas regras de negócio, persistência de dados, autenticação, autorização, gerenciamento de pedidos, controle de estoque e comunicação com o frontend.

O projeto foi desenvolvido com foco em praticar e demonstrar conhecimentos de:

- Desenvolvimento Backend
- APIs REST
- Node.js
- Express
- MongoDB
- Mongoose
- Autenticação com JWT
- Autorização por perfil
- Arquitetura organizada
- Regras de negócio
- Controle de estoque
- Docker
- Deploy
- CI/CD
- Integração Frontend + Backend

---

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

### Desenvolvimento

- Nodemon
- Postman
- Git
- GitHub

### Infraestrutura e deploy

- Docker
- Render
- CI/CD com GitHub + Render

---

## Funcionalidades

### Usuários

- Cadastro de usuários
- Criptografia de senhas com bcrypt
- Login com geração de JWT
- Consulta do perfil do usuário autenticado
- Perfis `cliente` e `admin`
- Controle de acesso baseado em perfil
- Promoção de usuários para administrador
- Rotas protegidas por middleware
- Cadastro público sempre definido como cliente

### Lojas

- Criar loja
- Listar lojas
- Buscar loja por ID
- Atualizar loja
- Excluir loja
- Operações de criação, atualização e exclusão restritas a administradores

### Produtos

- Criar produto
- Listar produtos
- Buscar produto por ID
- Atualizar produto
- Excluir produto
- Relacionamento entre produto e loja
- Controle de estoque
- Operações administrativas protegidas por JWT

### Pedidos

- Criação de pedidos com múltiplos produtos
- Pedido vinculado automaticamente ao usuário autenticado
- Cálculo automático do valor total
- Preço obtido diretamente do banco de dados
- Validação de estoque
- Baixa automática do estoque após criação do pedido
- Validação de que os produtos pertencem à loja informada
- Listagem dos próprios pedidos
- Consulta de pedido pelo proprietário ou administrador
- Atualização de status
- Exclusão de pedidos por administrador
- Controle de permissões administrativas

---

## Segurança

A API possui mecanismos de autenticação, autorização e proteção de dados.

Entre as medidas implementadas estão:

- Senhas armazenadas utilizando hash com bcrypt
- Autenticação por JWT
- Tokens com tempo de expiração
- Middleware de autenticação
- Middleware de autorização administrativa
- Proteção de rotas sensíveis
- Validação de ObjectId do MongoDB
- Senhas removidas das respostas da API
- Credenciais armazenadas em variáveis de ambiente
- Arquivo `.env` ignorado pelo Git
- Tratamento de rotas inexistentes com resposta `404`

---

## Arquitetura

A aplicação foi organizada separando responsabilidades entre rotas, middlewares, controllers e models.

```text
Request
   ↓
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Models
   ↓
MongoDB Atlas
```
Responsabilidades

Routes

Recebem as requisições HTTP e encaminham cada chamada para o controller responsável.

Middlewares

Executam autenticação, autorização e validações antes das regras de negócio.

Controllers

Contêm as regras de negócio da aplicação.

Models

Representam as entidades armazenadas no MongoDB utilizando Mongoose.

Estrutura do projeto

## Estrutura do projeto

```text
backend/
├── controllers/
│   ├── lojaController.js
│   ├── pedidoController.js
│   ├── produtoController.js
│   └── usuarioController.js
│
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── validarObjectId.js
│
├── models/
│   ├── Loja.js
│   ├── Pedido.js
│   ├── Produto.js
│   └── Usuario.js
│
├── routes/
│   ├── lojaRoutes.js
│   ├── pedidoRoutes.js
│   ├── produtoRoutes.js
│   └── usuarioRoutes.js
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---
## Principais rotas

## Usuários
| Método | Rota                      | Acesso      |
| ------ | ------------------------- | ----------- |
| POST   | `/api/usuarios`           | Público     |
| POST   | `/api/usuarios/login`     | Público     |
| GET    | `/api/usuarios/perfil/me` | Autenticado |
| GET    | `/api/usuarios`           | Admin       |
| GET    | `/api/usuarios/:id`       | Autenticado |
| PUT    | `/api/usuarios/:id/admin` | Admin       |

## Lojas
| Método | Rota             | Acesso  |
| ------ | ---------------- | ------- |
| GET    | `/api/lojas`     | Público |
| GET    | `/api/lojas/:id` | Público |
| POST   | `/api/lojas`     | Admin   |
| PUT    | `/api/lojas/:id` | Admin   |
| DELETE | `/api/lojas/:id` | Admin   |

## Produtos
| Método | Rota                | Acesso  |
| ------ | ------------------- | ------- |
| GET    | `/api/produtos`     | Público |
| GET    | `/api/produtos/:id` | Público |
| POST   | `/api/produtos`     | Admin   |
| PUT    | `/api/produtos/:id` | Admin   |
| DELETE | `/api/produtos/:id` | Admin   |

## Pedidos
| Método | Rota                      | Acesso             |
| ------ | ------------------------- | ------------------ |
| POST   | `/api/pedidos`            | Autenticado        |
| GET    | `/api/pedidos/meus`       | Autenticado        |
| GET    | `/api/pedidos`            | Admin              |
| GET    | `/api/pedidos/:id`        | Proprietário/Admin |
| PUT    | `/api/pedidos/:id/status` | Admin              |
| DELETE | `/api/pedidos/:id`        | Admin              |


---

## Autenticação

As rotas protegidas utilizam JWT.

Depois de realizar o login, o token deve ser enviado no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```

Exemplo de login:

```json
{
  "email": "usuario@exemplo.com",
  "senha": "123456"
}
```

O backend retorna um token JWT.

Esse token é utilizado pelo frontend nas requisições protegidas.

---

## Status dos pedidos

Os pedidos podem assumir os seguintes status:

```text
pendente
confirmado
preparando
enviado
entregue
cancelado
```

---

## Variáveis de ambiente

As informações sensíveis da aplicação são armazenadas em um arquivo `.env`.

O projeto possui um arquivo `.env.example` com o formato necessário.

Exemplo:

```env
PORT=5000
MONGODB_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
```

O arquivo `.env` real não deve ser enviado ao GitHub.

---

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/MATEUSMOTA45/ihemp-backend.git
```

Entre no projeto:

```bash
cd ihemp-backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=5000
MONGODB_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
```

Execute em modo de desenvolvimento:

```bash
npm run dev
```

Ou:

```bash
npm start
```

A aplicação estará disponível localmente em:

```text
http://localhost:5000
```

---

## Docker

O backend também pode ser executado utilizando Docker.

### Criar a imagem

```bash
docker build -t ihemp-backend .
```

### Executar o container

```bash
docker run --name ihemp-backend-container --env-file .env -p 5000:5000 ihemp-backend
```

### Comandos úteis

Ver containers em execução:

```bash
docker ps
```

Ver todos os containers:

```bash
docker ps -a
```

Parar o container:

```bash
docker stop ihemp-backend-container
```

Iniciar novamente:

```bash
docker start ihemp-backend-container
```

Ver os logs:

```bash
docker logs ihemp-backend-container
```

---

## Deploy

O backend está publicado no **Render** utilizando Docker.

API em produção:

**[https://ihemp-backend-docker.onrender.com](https://ihemp-backend-docker.onrender.com)**

---

## CI/CD

O deploy está integrado ao GitHub.

O fluxo funciona assim:

```text
Alteração no código
        ↓
git commit
        ↓
git push
        ↓
GitHub
        ↓
Render detecta a alteração
        ↓
Novo build da imagem Docker
        ↓
Deploy automático
```

O serviço está configurado para monitorar a branch `main`.

Dessa forma, alterações enviadas para a branch principal podem gerar automaticamente uma nova versão da API em produção.

---

## Integração com o frontend

O frontend do projeto foi desenvolvido utilizando:

- React
- TypeScript
- Vite
- React Router
- Context API

O frontend consome esta API através de requisições HTTP.

A URL do backend é configurada no frontend através da variável:

```env
VITE_API_URL=https://ihemp-backend-docker.onrender.com
```

O frontend utiliza o token JWT retornado pela API para acessar as rotas protegidas.

### Repositório

**[ihemp-frontend](https://github.com/MATEUSMOTA45/ihemp-frontend)**

### Aplicação publicada

**[Acessar frontend](https://ihemp-frontend.vercel.app)**

---

## Funcionalidades do frontend integrado

O frontend atualmente possui:

- Cadastro de usuários
- Login
- Logout
- Perfil protegido
- Autenticação com JWT
- Controle global de autenticação com Context API
- Navbar dinâmica
- Listagem de produtos
- Carrinho de compras
- Validação de produtos por loja
- Validação de estoque
- Finalização de pedidos
- Meus pedidos
- Área administrativa
- Gerenciamento de usuários
- Promoção de usuários para administrador
- CRUD de produtos
- CRUD de lojas
- Gerenciamento de pedidos
- Atualização de status dos pedidos
- Interface responsiva
- Variável de ambiente para URL da API
- Deploy na Vercel

---

## Testes

As rotas da API foram testadas manualmente utilizando o Postman.

Os testes realizados incluem:

- Cadastro de usuários
- Login
- Autenticação
- Autorização
- Rotas protegidas
- CRUD de lojas
- CRUD de produtos
- Criação de pedidos
- Consulta de pedidos
- Atualização de status
- Exclusão de pedidos
- Controle de estoque
- Validação de produtos por loja
- Validação de permissões
- Validação de ObjectId
- Tratamento de erros
- Respostas `401`
- Respostas `403`
- Respostas `404`

---

## Status do projeto

### Implementado

- Backend Node.js + Express
- API REST
- MongoDB Atlas
- Mongoose
- Autenticação JWT
- Autorização por perfil
- CRUD de usuários
- CRUD de lojas
- CRUD de produtos
- Gerenciamento de pedidos
- Controle de estoque
- Middlewares
- Validação de ObjectId
- Tratamento de erros
- Docker
- Deploy no Render
- CI/CD
- Frontend React + TypeScript
- Context API
- Carrinho
- Área administrativa
- Integração Frontend + Backend
- Variáveis de ambiente
- Deploy do frontend na Vercel

---

## Próximas melhorias

- Documentação com Swagger / OpenAPI
- Testes automatizados
- Transações MongoDB para operações de pedido e estoque
- Paginação
- Filtros e busca
- Upload de imagens
- Recuperação de senha
- Refresh token
- Logs estruturados
- Rate limiting
- Tratamento centralizado de erros
- Monitoramento
- Melhorias de segurança
- Melhorias de arquitetura
- Melhorias de UX no frontend

---

## Repositórios

### Backend

**[ihemp-backend](https://github.com/MATEUSMOTA45/ihemp-backend)**

### Frontend

**[ihemp-frontend](https://github.com/MATEUSMOTA45/ihemp-frontend)**

---

## Autor

**Mateus Henrique Ferreira Mota**

Desenvolvedor Full Stack Júnior  
Estudante de Análise e Desenvolvimento de Sistemas.

GitHub:

**[github.com/MATEUSMOTA45](https://github.com/MATEUSMOTA45)**