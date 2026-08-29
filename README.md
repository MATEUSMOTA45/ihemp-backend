# IHEMP Backend

API REST desenvolvida para o projeto IHEMP, utilizando Node.js, Express, MongoDB e autenticação com JWT.

O objetivo do projeto é demonstrar a construção de um backend completo com autenticação, autorização por perfil de usuário, relacionamento entre entidades e controle de pedidos.

## API online

A API está disponível em:

https://ihemp-backend.onrender.com


## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS
- Nodemon

## Funcionalidades

### Usuários

- Cadastro de usuários
- Senhas criptografadas com bcrypt
- Login com JWT
- Perfil do usuário autenticado
- Controle de acesso por perfil
- Perfis `cliente` e `admin`
- Promoção de usuário para administrador
- Rotas protegidas por middleware

### Lojas

- Criar loja
- Listar lojas
- Buscar loja por ID
- Atualizar loja
- Excluir loja
- Criação, atualização e exclusão restritas a administradores

### Produtos

- Criar produto
- Listar produtos
- Buscar produto por ID
- Atualizar produto
- Excluir produto
- Relacionamento entre produto e loja
- Controle de estoque

### Pedidos

- Criar pedido com múltiplos produtos
- Cálculo automático do valor total
- Validação de estoque
- Baixa automática do estoque
- Validação da loja dos produtos
- Pedido vinculado ao usuário autenticado
- Listagem dos próprios pedidos
- Controle de acesso por dono do pedido
- Atualização de status
- Controle de permissões para administradores

## Estrutura do projeto

    text
backend/
├── controllers/
│       lojaController.js
│       pedidoController.js
│       produtoController.js
│       usuarioController.js
│
├── middleware/
│       adminMiddleware.js
│       authMiddleware.js
│       validarObjectId.js
│
├── models/
│       Loja.js
│       Pedido.js
│       Produto.js
│       Usuario.js
│
├── routes/
│       lojaRoutes.js
│       pedidoRoutes.js
│       produtoRoutes.js
│       usuarioRoutes.js
│
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md