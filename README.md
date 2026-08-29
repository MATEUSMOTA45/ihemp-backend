# IHEMP Backend

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=black)

API REST desenvolvida para o projeto **IHEMP**, utilizando Node.js, Express, MongoDB e autenticação com JWT.

O projeto foi criado com foco na construção de um backend organizado e funcional, utilizando autenticação, autorização por perfil de usuário, relacionamentos entre entidades, controle de estoque e gerenciamento de pedidos.

## API online

A API está publicada no Render:

https://ihemp-backend-docker.onrender.com

Exemplo de rota pública:

```text
GET https://ihemp-backend-docker.onrender.com/api/produtos
```

> O serviço utiliza uma instância gratuita do Render, portanto a primeira requisição pode levar alguns segundos caso o servidor esteja em modo de espera.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS
- Nodemon
- Git
- GitHub
- Docker
- Render

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
- Baixa automática do estoque após a criação do pedido
- Validação de que os produtos pertencem à loja informada
- Listagem dos próprios pedidos
- Consulta de pedido pelo proprietário ou administrador
- Atualização de status
- Controle de permissões administrativas

## Segurança

A API possui mecanismos básicos de segurança e autorização:

- Senhas armazenadas utilizando hash com bcrypt
- Autenticação por JWT
- Tokens com tempo de expiração
- Middleware de autenticação
- Middleware de autorização administrativa
- Proteção de rotas sensíveis
- Validação de ObjectId do MongoDB
- Senhas removidas das respostas da API
- Credenciais armazenadas em variáveis de ambiente
- `.env` ignorado pelo Git
- Tratamento de rotas inexistentes com resposta `404`

## Arquitetura

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

## Principais rotas

### Usuários

| Método | Rota | Acesso |
|---|---|---|
| POST | `/api/usuarios` | Público |
| POST | `/api/usuarios/login` | Público |
| GET | `/api/usuarios/perfil/me` | Autenticado |
| GET | `/api/usuarios` | Admin |
| GET | `/api/usuarios/:id` | Autenticado |
| PUT | `/api/usuarios/:id/admin` | Admin |

### Lojas

| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/lojas` | Público |
| GET | `/api/lojas/:id` | Público |
| POST | `/api/lojas` | Admin |
| PUT | `/api/lojas/:id` | Admin |
| DELETE | `/api/lojas/:id` | Admin |

### Produtos

| Método | Rota | Acesso |
|---|---|---|
| GET | `/api/produtos` | Público |
| GET | `/api/produtos/:id` | Público |
| POST | `/api/produtos` | Admin |
| PUT | `/api/produtos/:id` | Admin |
| DELETE | `/api/produtos/:id` | Admin |

### Pedidos

| Método | Rota | Acesso |
|---|---|---|
| POST | `/api/pedidos` | Autenticado |
| GET | `/api/pedidos/meus` | Autenticado |
| GET | `/api/pedidos` | Admin |
| GET | `/api/pedidos/:id` | Proprietário/Admin |
| PUT | `/api/pedidos/:id/status` | Admin |
| DELETE | `/api/pedidos/:id` | Admin |

## Autenticação

As rotas protegidas utilizam JWT.

Depois de realizar o login, envie o token no cabeçalho:

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

## Status dos pedidos

```text
pendente
confirmado
preparando
enviado
entregue
cancelado
```

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

Inicie em desenvolvimento:

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

```bash
docker ps
docker ps -a
docker stop ihemp-backend-container
docker start ihemp-backend-container
docker logs ihemp-backend-container
```

## Deploy e CI/CD

O projeto está publicado no Render utilizando Docker.

O fluxo de deploy funciona assim:

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

O serviço está configurado para monitorar a branch `main`, permitindo deploy automático após novos pushes.

## Testes

As rotas da API foram testadas manualmente utilizando o Postman, incluindo:

- autenticação
- autorização
- CRUD de lojas
- CRUD de produtos
- gerenciamento de pedidos
- controle de estoque
- validação de permissões
- validação de ObjectId
- tratamento de erros

## Próximas melhorias

- Documentação com Swagger / OpenAPI
- Testes automatizados
- Transações no MongoDB para operações de pedido e estoque
- Paginação e filtros
- Upload de imagens
- Recuperação de senha
- Frontend em React
- Dashboard administrativo

## Autor

**Mateus Mota**

Desenvolvedor Full Stack Júnior

GitHub: https://github.com/MATEUSMOTA45