// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Estado da aplicação
let currentUser = null;
let games = [];
let genres = [];
let tags = [];
let cart = [];
let wishlist = [];
let library = [];
let friends = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await loadGenres();
    await loadTags();
    await loadGames();
    checkAuth();
}

// Event Listeners
function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            navigateToPage(page);
        });
    });

    // Autenticação
    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('registerBtn').addEventListener('click', () => openModal('registerModal'));
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Busca e Filtros
    document.getElementById('searchInput').addEventListener('input', filterGames);
    document.getElementById('genreFilter').addEventListener('change', filterGames);
    document.getElementById('tagFilter').addEventListener('change', filterGames);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);

    // Carrinho
    document.getElementById('cartBtn').addEventListener('click', () => openModal('cartModal'));
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    // Amizades
    document.getElementById('addFriendBtn').addEventListener('click', handleAddFriend);

    // Modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal;
            closeModal(modalId);
        });
    });

    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Navegação
function navigateToPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(page).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    if (page === 'library') {
        loadLibrary();
    } else if (page === 'wishlist') {
        loadWishlist();
    } else if (page === 'friends') {
        loadFriends();
    }
}

// Autenticação
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedIn();
    } else {
        updateUIForLoggedOut();
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const usuarios = await apiCall('GET', '/usuarios');
        const usuario = usuarios.find(u => u.email === email && u.senha === password);
        
        if (usuario) {
            currentUser = usuario;
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            updateUIForLoggedIn();
            closeModal('loginModal');
            showNotification('Login realizado com sucesso!', 'success');
            await loadCart();
            await loadWishlist();
            await loadLibrary();
        } else {
            showNotification('Email ou senha incorretos!', 'error');
        }
    } catch (error) {
        showNotification('Erro ao fazer login: ' + error.message, 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const nome = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const senha = document.getElementById('registerPassword').value;
    const saldo = parseFloat(document.getElementById('registerSaldo').value) || 0;

    try {
        const usuario = await apiCall('POST', '/usuarios', {
            nome,
            email,
            senha,
            saldo
        });

        currentUser = usuario;
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        updateUIForLoggedIn();
        closeModal('registerModal');
        showNotification('Cadastro realizado com sucesso!', 'success');
    } catch (error) {
        showNotification('Erro ao cadastrar: ' + error.message, 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOut();
    cart = [];
    wishlist = [];
    library = [];
    friends = [];
    updateCartCount();
    showNotification('Logout realizado com sucesso!', 'success');
}

function updateUIForLoggedIn() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userName').textContent = currentUser.nome;
    document.getElementById('userBalance').textContent = `R$ ${currentUser.saldo.toFixed(2)}`;
    loadCart();
}

function updateUIForLoggedOut() {
    document.getElementById('authButtons').style.display = 'flex';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('cartCount').textContent = '0';
}

// Carregar Dados
async function loadGames() {
    try {
        games = await apiCall('GET', '/jogos');
        displayGames(games);
    } catch (error) {
        showNotification('Erro ao carregar jogos: ' + error.message, 'error');
    }
}

async function loadGenres() {
    try {
        genres = await apiCall('GET', '/generos');
        const genreSelect = document.getElementById('genreFilter');
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id_gen;
            option.textContent = genre.nome;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
}

async function loadTags() {
    try {
        tags = await apiCall('GET', '/tags');
        const tagSelect = document.getElementById('tagFilter');
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id_tag;
            option.textContent = tag.nome;
            tagSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar tags:', error);
    }
}

async function loadCart() {
    if (!currentUser) return;
    
    try {
        cart = await apiCall('GET', `/usuarios/${currentUser.id_usuario}/carrinho`);
        updateCartCount();
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

async function loadWishlist() {
    if (!currentUser) return;
    
    try {
        wishlist = await apiCall('GET', `/usuarios/${currentUser.id_usuario}/wishlist`);
        if (document.getElementById('wishlist').classList.contains('active')) {
            displayWishlist();
        }
    } catch (error) {
        console.error('Erro ao carregar wishlist:', error);
    }
}

async function loadLibrary() {
    if (!currentUser) return;
    
    try {
        library = await apiCall('GET', `/usuarios/${currentUser.id_usuario}/biblioteca`);
        if (document.getElementById('library').classList.contains('active')) {
            displayLibrary();
        }
    } catch (error) {
        console.error('Erro ao carregar biblioteca:', error);
    }
}

async function loadFriends() {
    if (!currentUser) return;
    
    try {
        friends = await apiCall('GET', `/usuarios/${currentUser.id_usuario}/amizades/aceitas`);
        if (document.getElementById('friends').classList.contains('active')) {
            displayFriends();
        }
    } catch (error) {
        console.error('Erro ao carregar amigos:', error);
    }
}

// Exibir Jogos
function displayGames(gamesToDisplay) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = '';

    if (gamesToDisplay.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎮</div><div class="empty-state-text">Nenhum jogo encontrado</div></div>';
        return;
    }

    gamesToDisplay.forEach(game => {
        const card = createGameCard(game);
        grid.appendChild(card);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    card.innerHTML = `
        <div class="game-image">🎮</div>
        <div class="game-info">
            <div class="game-title">${game.titulo}</div>
            <div class="game-price">R$ ${game.preco.toFixed(2)}</div>
            <div class="game-actions">
                <button class="btn-primary" onclick="viewGameDetails(${game.id_jogo})">Ver Detalhes</button>
                ${currentUser ? `
                    <button class="btn-secondary" onclick="addToCart(${game.id_jogo})">🛒</button>
                    <button class="btn-secondary" onclick="addToWishlist(${game.id_jogo})">❤️</button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Detalhes do Jogo
async function viewGameDetails(gameId) {
    try {
        const game = await apiCall('GET', `/jogos/${gameId}`);
        const gameGenres = await apiCall('GET', `/jogos/${gameId}/generos`);
        const gameTags = await apiCall('GET', `/jogos/${gameId}/tags`);
        const reviews = await apiCall('GET', `/jogos/${gameId}/analises`);
        
        // Buscar desenvolvedor e publicadora
        const desenvolvedor = await apiCall('GET', `/desenvolvedores/${game.id_dev}`);
        const publicadora = await apiCall('GET', `/publicadoras/${game.id_publi}`);
        
        const genresList = gameGenres.map(jg => {
            const genre = genres.find(g => g.id_gen === jg.id_gen);
            return genre ? genre.nome : '';
        }).filter(Boolean).join(', ');
        
        const tagsList = gameTags.map(jt => {
            const tag = tags.find(t => t.id_tag === jt.id_tag);
            return tag ? tag.nome : '';
        }).filter(Boolean).join(', ');

        const hasInLibrary = currentUser && library.some(l => l.id_jogo === gameId);
        const hasInWishlist = currentUser && wishlist.some(w => w.id_jogo === gameId);
        const hasInCart = currentUser && cart.some(c => c.id_jogo === gameId);

        document.getElementById('gameDetails').innerHTML = `
            <div class="game-details-header">
                <div class="game-details-image">🎮</div>
                <div class="game-details-info">
                    <h2 class="game-details-title">${game.titulo}</h2>
                    <div class="game-details-price">R$ ${game.preco.toFixed(2)}</div>
                    <div class="game-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Desenvolvedor:</span>
                            <span>${desenvolvedor?.nome || 'N/A'}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Publicadora:</span>
                            <span>${publicadora?.nome || 'N/A'}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Data de Lançamento:</span>
                            <span>${new Date(game.data_lanc).toLocaleDateString('pt-BR')}</span>
                        </div>
                        ${genresList ? `
                            <div class="meta-item">
                                <span class="meta-label">Gêneros:</span>
                                <span>${genresList}</span>
                            </div>
                        ` : ''}
                        ${tagsList ? `
                            <div class="meta-item">
                                <span class="meta-label">Tags:</span>
                                <span>${tagsList}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="game-details-description">${game.descricao}</div>
                    <div class="game-actions">
                        ${currentUser ? `
                            ${!hasInLibrary ? `
                                ${!hasInCart ? `
                                    <button class="btn-primary" onclick="addToCart(${game.id_jogo}); closeModal('gameModal');">Adicionar ao Carrinho</button>
                                ` : `
                                    <button class="btn-secondary" disabled>Já está no carrinho</button>
                                `}
                            ` : `
                                <button class="btn-secondary" disabled>Já possui na biblioteca</button>
                            `}
                            ${!hasInWishlist ? `
                                <button class="btn-secondary" onclick="addToWishlist(${game.id_jogo}); closeModal('gameModal');">Adicionar à Lista de Desejos</button>
                            ` : `
                                <button class="btn-secondary" onclick="removeFromWishlist(${game.id_jogo}); closeModal('gameModal');">Remover da Lista de Desejos</button>
                            `}
                        ` : ''}
                    </div>
                </div>
            </div>
            ${currentUser && hasInLibrary ? `
                <div class="reviews-section">
                    <div class="reviews-header">
                        <h3>Avaliações</h3>
                    </div>
                    <div class="review-form">
                        <h4>Deixe sua avaliação</h4>
                        <form id="reviewForm" onsubmit="handleSubmitReview(event, ${game.id_jogo})">
                            <div class="review-rating">
                                <label>Nota (0-10):</label>
                                <input type="number" id="reviewRating" min="0" max="10" step="0.1" required>
                            </div>
                            <textarea id="reviewText" placeholder="Escreva sua avaliação..."></textarea>
                            <button type="submit" class="btn-primary">Enviar Avaliação</button>
                        </form>
                    </div>
                    <div class="reviews-list">
                        ${reviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="review-user">Usuário #${review.id_usuario}</span>
                                    <span class="review-rating-display">⭐ ${review.nota}/10</span>
                                </div>
                                ${review.texto ? `<div class="review-text">${review.texto}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        openModal('gameModal');
    } catch (error) {
        showNotification('Erro ao carregar detalhes do jogo: ' + error.message, 'error');
    }
}

// Carrinho
async function addToCart(gameId) {
    if (!currentUser) {
        showNotification('Faça login para adicionar ao carrinho', 'error');
        return;
    }

    try {
        await apiCall('POST', `/usuarios/${currentUser.id_usuario}/carrinho`, { id_jogo: gameId });
        await loadCart();
        showNotification('Jogo adicionado ao carrinho!', 'success');
    } catch (error) {
        showNotification('Erro ao adicionar ao carrinho: ' + error.message, 'error');
    }
}

async function removeFromCart(gameId) {
    if (!currentUser) return;

    try {
        await apiCall('DELETE', `/usuarios/${currentUser.id_usuario}/carrinho/${gameId}`);
        await loadCart();
        displayCart();
        showNotification('Jogo removido do carrinho!', 'success');
    } catch (error) {
        showNotification('Erro ao remover do carrinho: ' + error.message, 'error');
    }
}

async function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><div class="empty-state-text">Carrinho vazio</div></div>';
        document.getElementById('cartTotal').textContent = '0,00';
        return;
    }

    let total = 0;
    const promises = cart.map(async (item) => {
        try {
            const game = await apiCall('GET', `/jogos/${item.id_jogo}`);
            total += game.preco;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${game.titulo}</div>
                    <div class="cart-item-price">R$ ${game.preco.toFixed(2)}</div>
                </div>
                <button class="btn-danger" onclick="removeFromCart(${item.id_jogo})">Remover</button>
            `;
            cartItems.appendChild(cartItem);
            
            return game.preco;
        } catch (error) {
            console.error('Erro ao carregar jogo do carrinho:', error);
            return 0;
        }
    });

    const prices = await Promise.all(promises);
    total = prices.reduce((sum, price) => sum + price, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

async function handleCheckout() {
    if (!currentUser) return;
    if (cart.length === 0) {
        showNotification('Carrinho vazio!', 'error');
        return;
    }

    try {
        await apiCall('POST', `/usuarios/${currentUser.id_usuario}/carrinho/checkout`);
        await loadCart();
        await loadLibrary();
        await updateUserBalance();
        displayCart();
        closeModal('cartModal');
        showNotification('Compra realizada com sucesso!', 'success');
    } catch (error) {
        showNotification('Erro ao finalizar compra: ' + error.message, 'error');
    }
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
    
    // Atualizar carrinho se modal estiver aberto
    if (document.getElementById('cartModal').classList.contains('active')) {
        displayCart();
    }
}

// Wishlist
async function addToWishlist(gameId) {
    if (!currentUser) {
        showNotification('Faça login para adicionar à lista de desejos', 'error');
        return;
    }

    try {
        await apiCall('POST', `/usuarios/${currentUser.id_usuario}/wishlist`, { id_jogo: gameId });
        await loadWishlist();
        showNotification('Jogo adicionado à lista de desejos!', 'success');
    } catch (error) {
        showNotification('Erro ao adicionar à lista de desejos: ' + error.message, 'error');
    }
}

async function removeFromWishlist(gameId) {
    if (!currentUser) return;

    try {
        await apiCall('DELETE', `/usuarios/${currentUser.id_usuario}/wishlist/${gameId}`);
        await loadWishlist();
        showNotification('Jogo removido da lista de desejos!', 'success');
    } catch (error) {
        showNotification('Erro ao remover da lista de desejos: ' + error.message, 'error');
    }
}

async function displayWishlist() {
    const grid = document.getElementById('wishlistGrid');
    grid.innerHTML = '';

    if (wishlist.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">❤️</div><div class="empty-state-text">Lista de desejos vazia</div></div>';
        return;
    }

    const promises = wishlist.map(async (item) => {
        try {
            const game = await apiCall('GET', `/jogos/${item.id_jogo}`);
            const card = createGameCard(game);
            grid.appendChild(card);
        } catch (error) {
            console.error('Erro ao carregar jogo da wishlist:', error);
        }
    });

    await Promise.all(promises);
}

// Biblioteca
async function displayLibrary() {
    const grid = document.getElementById('libraryGrid');
    grid.innerHTML = '';

    if (library.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📚</div><div class="empty-state-text">Biblioteca vazia</div></div>';
        return;
    }

    const promises = library.map(async (item) => {
        try {
            const game = await apiCall('GET', `/jogos/${item.id_jogo}`);
            const card = createGameCard(game);
            const tempoJogado = document.createElement('div');
            tempoJogado.className = 'game-info';
            tempoJogado.innerHTML = `<div style="color: var(--text-secondary); font-size: 12px; margin-top: 5px;">Tempo jogado: ${item.tempo_jogado}h</div>`;
            card.querySelector('.game-info').appendChild(tempoJogado);
            grid.appendChild(card);
        } catch (error) {
            console.error('Erro ao carregar jogo da biblioteca:', error);
        }
    });

    await Promise.all(promises);
}

// Amizades
async function handleAddFriend() {
    if (!currentUser) {
        showNotification('Faça login para adicionar amigos', 'error');
        return;
    }

    const friendId = parseInt(document.getElementById('friendIdInput').value);
    if (!friendId) {
        showNotification('Digite um ID válido', 'error');
        return;
    }

    try {
        await apiCall('POST', `/usuarios/${currentUser.id_usuario}/amizades`, { id_amigo: friendId });
        document.getElementById('friendIdInput').value = '';
        await loadFriends();
        showNotification('Solicitação de amizade enviada!', 'success');
    } catch (error) {
        showNotification('Erro ao adicionar amigo: ' + error.message, 'error');
    }
}

async function displayFriends() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = '';

    if (friends.length === 0) {
        friendsList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">👥</div><div class="empty-state-text">Nenhum amigo adicionado</div></div>';
        return;
    }

    const promises = friends.map(async (amizade) => {
        try {
            const friendId = amizade.id_usuario === currentUser.id_usuario ? amizade.id_amigo : amizade.id_usuario;
            const friend = await apiCall('GET', `/usuarios/${friendId}`);
            
            const friendItem = document.createElement('div');
            friendItem.className = 'friend-item';
            friendItem.innerHTML = `
                <div class="friend-info">
                    <div class="friend-name">${friend.nome}</div>
                    <div class="friend-status">Email: ${friend.email}</div>
                </div>
                <div class="friend-actions">
                    <span class="status-badge status-aceita">Amigo</span>
                </div>
            `;
            friendsList.appendChild(friendItem);
        } catch (error) {
            console.error('Erro ao carregar amigo:', error);
        }
    });

    await Promise.all(promises);
}

// Avaliações
async function handleSubmitReview(e, gameId) {
    e.preventDefault();
    if (!currentUser) return;

    const nota = parseFloat(document.getElementById('reviewRating').value);
    const texto = document.getElementById('reviewText').value;

    try {
        await apiCall('POST', `/jogos/${gameId}/analises`, {
            id_usuario: currentUser.id_usuario,
            nota,
            texto: texto || null
        });
        showNotification('Avaliação enviada com sucesso!', 'success');
        viewGameDetails(gameId);
    } catch (error) {
        showNotification('Erro ao enviar avaliação: ' + error.message, 'error');
    }
}

// Filtros
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const genreFilter = document.getElementById('genreFilter').value;
    const tagFilter = document.getElementById('tagFilter').value;

    let filtered = games;

    if (searchTerm) {
        filtered = filtered.filter(game => 
            game.titulo.toLowerCase().includes(searchTerm)
        );
    }

    // Filtro por gênero e tag seria melhor implementado com busca no backend
    // Por enquanto, apenas busca por título

    displayGames(filtered);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('genreFilter').value = '';
    document.getElementById('tagFilter').value = '';
    displayGames(games);
}

// Utilitários
async function apiCall(method, endpoint, data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro na requisição');
    }

    return await response.json();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        if (modalId === 'cartModal') {
            displayCart();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

async function updateUserBalance() {
    if (!currentUser) return;
    
    try {
        const usuario = await apiCall('GET', `/usuarios/${currentUser.id_usuario}`);
        currentUser = usuario;
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        document.getElementById('userBalance').textContent = `R$ ${usuario.saldo.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao atualizar saldo:', error);
    }
}

// Expor funções globalmente
window.viewGameDetails = viewGameDetails;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.handleSubmitReview = handleSubmitReview;

