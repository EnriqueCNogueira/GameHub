# GameHub Frontend

Frontend da aplicação GameHub desenvolvido com HTML5, CSS3 e JavaScript puro.

## 📁 Estrutura de Arquivos

```
frontend/
├── index.html    # Estrutura HTML principal
├── style.css     # Estilos CSS com tema escuro
├── main.js       # Lógica JavaScript da aplicação
└── README.md     # Este arquivo
```

## 🚀 Funcionalidades Implementadas

### Autenticação
- ✅ Login de usuários
- ✅ Cadastro de novos usuários
- ✅ Logout
- ✅ Exibição de informações do usuário (nome e saldo)

### Loja (Catálogo)
- ✅ Listagem de todos os jogos
- ✅ Busca por título
- ✅ Filtros por gênero e tag (estrutura pronta)
- ✅ Visualização de detalhes do jogo
- ✅ Cards de jogos com informações básicas

### Carrinho de Compras
- ✅ Adicionar jogos ao carrinho
- ✅ Remover jogos do carrinho
- ✅ Visualizar itens do carrinho
- ✅ Cálculo do total
- ✅ Checkout (finalizar compra)

### Lista de Desejos (Wishlist)
- ✅ Adicionar jogos à lista de desejos
- ✅ Remover jogos da lista de desejos
- ✅ Visualizar lista de desejos

### Biblioteca Pessoal
- ✅ Visualizar jogos adquiridos
- ✅ Exibir tempo jogado de cada jogo

### Sistema Social
- ✅ Adicionar amigos por ID
- ✅ Listar amigos aceitos
- ✅ Exibir status de amizade

### Avaliações (Reviews)
- ✅ Criar avaliações para jogos possuídos
- ✅ Visualizar avaliações de outros usuários
- ✅ Sistema de notas (0-10)
- ✅ Comentários de texto

## 🎨 Design

O frontend utiliza um tema escuro moderno inspirado na Steam, com:
- Cores escuras e acentos azuis
- Cards responsivos
- Modais para detalhes e ações
- Notificações de feedback
- Layout responsivo para mobile

## 🔧 Como Usar

1. Certifique-se de que o backend está rodando na porta 3000
2. Abra o arquivo `index.html` em um navegador moderno
3. Ou use um servidor local (recomendado):
   ```bash
   # Com Python
   python -m http.server 8080
   
   # Com Node.js (http-server)
   npx http-server -p 8080
   ```

## 📝 Notas de Implementação

### API Base URL
A URL base da API está configurada como `http://localhost:3000/api` no arquivo `main.js`. Se o backend estiver em outra porta, altere a constante `API_BASE`.

### Autenticação
O sistema de autenticação atual é simples (email/senha em texto plano). Em produção, seria necessário implementar tokens JWT ou sessões seguras.

### Filtros
Os filtros por gênero e tag estão implementados na estrutura, mas a busca completa seria melhor implementada no backend para melhor performance.

### Estado da Aplicação
O estado do usuário é armazenado no `localStorage` do navegador. Ao recarregar a página, o usuário permanece logado.

## 🐛 Melhorias Futuras

- [ ] Implementar busca avançada no backend
- [ ] Adicionar paginação para listas grandes
- [ ] Melhorar tratamento de erros
- [ ] Adicionar loading states
- [ ] Implementar sistema de imagens para jogos
- [ ] Adicionar validação de formulários mais robusta
- [ ] Implementar sistema de notificações em tempo real
- [ ] Adicionar testes automatizados

