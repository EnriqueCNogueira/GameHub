# GameHub 🎮

Um ecossistema completo de distribuição digital de jogos, inspirado na Steam. O GameHub integra três pilares principais: uma loja virtual (e-commerce), um gerenciador de biblioteca pessoal e uma rede social para gamers.

## 📋 Sobre o Projeto

O GameHub é uma plataforma robusta que permite aos usuários:
- Navegar e comprar jogos em um catálogo completo
- Gerenciar sua biblioteca pessoal de jogos adquiridos
- Interagir socialmente com outros gamers através de amizades
- Avaliar e revisar jogos que possuem
- Organizar desejos através de wishlists

## 🛠️ Stack Tecnológica

- **Linguagem Principal**: TypeScript
- **Backend**: Node.js com Express.js
- **Banco de Dados**: SQLite manipulado via Prisma ORM
- **Frontend**: HTML5, CSS3 e JavaScript puro

## 📦 Dependências

- `@prisma/client`: Cliente Prisma para acesso ao banco de dados
- `express`: Framework web para Node.js
- `cors`: Middleware para habilitar CORS
- `date-fns`: Biblioteca para manipulação de datas

## 🗄️ Modelagem do Banco de Dados

O sistema possui as seguintes entidades principais:

- **Usuario**: Informações de login, perfil e saldo da carteira virtual
- **Jogo**: Catálogo de produtos com título, descrição, preço e referências às empresas
- **Desenvolvedor**: Empresas responsáveis pela criação técnica dos jogos
- **Publicadora**: Empresas responsáveis pela distribuição e venda
- **Genero**: Categorias principais para classificação (RPG, Ação, Estratégia, etc.)
- **Tag**: Etiquetas descritivas granulares para filtros (Zumbis, Mundo Aberto, etc.)
- **Transacao**: Registro histórico e imutável de compras finalizadas
- **ItemTransacao**: Detalhamento dos jogos incluídos em cada transação
- **Biblioteca**: Relação de posse entre usuários e jogos adquiridos
- **Carrinho**: Armazenamento temporário de jogos para compra
- **Wishlist**: Lista de desejos do usuário
- **Analise**: Reviews com nota e comentário de texto
- **Amizades**: Relacionamento social entre usuários

## 🚀 Funcionalidades

### Catálogo e Navegação
- Listagem de jogos com filtros por Gênero e Tag
- Busca por nome, desenvolvedora e publicadora

### Ciclo de Compra Completo
- Adicionar/Remover jogos do Carrinho
- Adicionar jogos à Lista de Desejos
- Checkout de Transação: converter itens do carrinho em transação fechada

### Gestão de Biblioteca
- Visualização exclusiva dos jogos adquiridos pelo usuário logado

### Sistema Social
- Enviar solicitações de amizade
- Listar amigos adicionados

### Avaliações
- Usuários podem criar análises (reviews) para jogos que possuem
- Reviews aparecem na página do produto

## 📁 Estrutura do Projeto

```
GameHub/
├── db/                 # Banco de dados SQLite
├── migrations/         # Migrações do Prisma
├── node_modules/       # Dependências npm
├── schema.prisma       # Schema do banco de dados
├── domain.ts           # Interfaces TypeScript
├── repository.ts       # Funções de CRUD e regras de negócio
├── server.ts           # Configuração do Express e rotas
├── index.html          # Frontend HTML
├── style.css           # Estilos CSS
├── main.js             # JavaScript do frontend
├── package.json        # Configuração do projeto
└── README.md           # Este arquivo
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EnriqueCNogueira/GameHub.git
cd GameHub
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
npx prisma generate
npx prisma migrate dev
```

4. Inicie o servidor:
```bash
npm start
```

## 📝 Roteiro de Execução

O projeto deve ser desenvolvido seguindo esta ordem lógica:

1. ✅ **schema.prisma**: Definição de todas as tabelas e relacionamentos
2. ✅ **domain.ts**: Criação das interfaces TypeScript equivalentes
3. ⏳ **repository.ts**: Implementação das funções de CRUD e regras de negócio
4. ⏳ **server.ts**: Configuração do Express e criação das rotas da API
5. ⏳ **Frontend**: Construção da interface visual e integração com a API

## 📄 Licença

ISC

## 👤 Autor

Desenvolvido como projeto de Programação Orientada a Objetos.

