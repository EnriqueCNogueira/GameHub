import express, { Request, Response } from 'express';
import cors from 'cors';
import {
  Usuario,
  Desenvolvedor,
  Publicadora,
  Genero,
  Tag,
  Jogo,
  Transacao,
  ItemTransacao,
  JogoTag,
  JogoGenero,
  Analise,
  Biblioteca,
  Carrinho,
  Wishlist,
  Amizades
} from './domain';
import {
  UsuarioRepository,
  DesenvolvedorRepository,
  PublicadoraRepository,
  GeneroRepository,
  TagRepository,
  JogoRepository,
  TransacaoRepository,
  ItemTransacaoRepository,
  JogoTagRepository,
  JogoGeneroRepository,
  AnaliseRepository,
  BibliotecaRepository,
  CarrinhoRepository,
  WishlistRepository,
  AmizadesRepository,
  GameHubService
} from './repository';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Repositories
const usuarioRepo = new UsuarioRepository();
const desenvolvedorRepo = new DesenvolvedorRepository();
const publicadoraRepo = new PublicadoraRepository();
const generoRepo = new GeneroRepository();
const tagRepo = new TagRepository();
const jogoRepo = new JogoRepository();
const transacaoRepo = new TransacaoRepository();
const itemTransacaoRepo = new ItemTransacaoRepository();
const jogoTagRepo = new JogoTagRepository();
const jogoGeneroRepo = new JogoGeneroRepository();
const analiseRepo = new AnaliseRepository();
const bibliotecaRepo = new BibliotecaRepository();
const carrinhoRepo = new CarrinhoRepository();
const wishlistRepo = new WishlistRepository();
const amizadesRepo = new AmizadesRepository();
const gameHubService = new GameHubService();

// ==================== USUARIO ROUTES ====================

/**
 * GET /api/usuarios
 * Get all usuarios
 */
app.get('/api/usuarios', async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioRepo.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usuarios', details: error });
  }
});

/**
 * GET /api/usuarios/:id
 * Get a usuario by ID
 */
app.get('/api/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const usuario = await usuarioRepo.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usuario', details: error });
  }
});

/**
 * GET /api/usuarios/search?email=...
 * Search usuarios by email
 */
app.get('/api/usuarios/search', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    const usuario = await usuarioRepo.findByEmail(email);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search usuario', details: error });
  }
});

/**
 * POST /api/usuarios
 * Create a new usuario
 * Body: { nome: string, email: string, senha: string, saldo?: number }
 */
app.post('/api/usuarios', async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, saldo } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!senha || !senha.trim()) {
      return res.status(400).json({ error: 'Senha is required' });
    }

    const usuario = new Usuario(nome, email, senha, saldo || 0);
    const savedUsuario = await usuarioRepo.save(usuario);
    res.status(201).json(savedUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create usuario', details: error });
  }
});

/**
 * PUT /api/usuarios/:id
 * Update a usuario
 * Body: { nome?: string, email?: string, senha?: string, saldo?: number }
 */
app.put('/api/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const usuario = await usuarioRepo.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    const { nome, email, senha, saldo } = req.body;
    if (nome !== undefined) usuario.nome = nome;
    if (email !== undefined) usuario.email = email;
    if (senha !== undefined) usuario.senha = senha;
    if (saldo !== undefined) usuario.saldo = saldo;

    const updatedUsuario = await usuarioRepo.update(usuario);
    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update usuario', details: error });
  }
});

/**
 * DELETE /api/usuarios/:id
 * Delete a usuario
 */
app.delete('/api/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const usuario = await usuarioRepo.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }

    await usuarioRepo.delete(id);
    res.json({ message: 'Usuario deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete usuario', details: error });
  }
});

// ==================== DESENVOLVEDOR ROUTES ====================

/**
 * GET /api/desenvolvedores
 * Get all desenvolvedores
 */
app.get('/api/desenvolvedores', async (req: Request, res: Response) => {
  try {
    const desenvolvedores = await desenvolvedorRepo.findAll();
    res.json(desenvolvedores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch desenvolvedores', details: error });
  }
});

/**
 * GET /api/desenvolvedores/:id
 * Get a desenvolvedor by ID
 */
app.get('/api/desenvolvedores/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid desenvolvedor ID' });
    }

    const desenvolvedor = await desenvolvedorRepo.findById(id);
    if (!desenvolvedor) {
      return res.status(404).json({ error: 'Desenvolvedor not found' });
    }

    res.json(desenvolvedor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch desenvolvedor', details: error });
  }
});

/**
 * POST /api/desenvolvedores
 * Create a new desenvolvedor
 * Body: { nome: string, pais_origem: string, site: string }
 */
app.post('/api/desenvolvedores', async (req: Request, res: Response) => {
  try {
    const { nome, pais_origem, site } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }
    if (!pais_origem || !pais_origem.trim()) {
      return res.status(400).json({ error: 'Pais_origem is required' });
    }
    if (!site || !site.trim()) {
      return res.status(400).json({ error: 'Site is required' });
    }

    const desenvolvedor = new Desenvolvedor(nome, pais_origem, site);
    const savedDesenvolvedor = await desenvolvedorRepo.save(desenvolvedor);
    res.status(201).json(savedDesenvolvedor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create desenvolvedor', details: error });
  }
});

/**
 * PUT /api/desenvolvedores/:id
 * Update a desenvolvedor
 * Body: { nome?: string, pais_origem?: string, site?: string }
 */
app.put('/api/desenvolvedores/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid desenvolvedor ID' });
    }

    const desenvolvedor = await desenvolvedorRepo.findById(id);
    if (!desenvolvedor) {
      return res.status(404).json({ error: 'Desenvolvedor not found' });
    }

    const { nome, pais_origem, site } = req.body;
    if (nome !== undefined) desenvolvedor.nome = nome;
    if (pais_origem !== undefined) desenvolvedor.pais_origem = pais_origem;
    if (site !== undefined) desenvolvedor.site = site;

    const updatedDesenvolvedor = await desenvolvedorRepo.update(desenvolvedor);
    res.json(updatedDesenvolvedor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update desenvolvedor', details: error });
  }
});

/**
 * DELETE /api/desenvolvedores/:id
 * Delete a desenvolvedor
 */
app.delete('/api/desenvolvedores/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid desenvolvedor ID' });
    }

    const desenvolvedor = await desenvolvedorRepo.findById(id);
    if (!desenvolvedor) {
      return res.status(404).json({ error: 'Desenvolvedor not found' });
    }

    await desenvolvedorRepo.delete(id);
    res.json({ message: 'Desenvolvedor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete desenvolvedor', details: error });
  }
});

// ==================== PUBLICADORA ROUTES ====================

/**
 * GET /api/publicadoras
 * Get all publicadoras
 */
app.get('/api/publicadoras', async (req: Request, res: Response) => {
  try {
    const publicadoras = await publicadoraRepo.findAll();
    res.json(publicadoras);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publicadoras', details: error });
  }
});

/**
 * GET /api/publicadoras/:id
 * Get a publicadora by ID
 */
app.get('/api/publicadoras/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid publicadora ID' });
    }

    const publicadora = await publicadoraRepo.findById(id);
    if (!publicadora) {
      return res.status(404).json({ error: 'Publicadora not found' });
    }

    res.json(publicadora);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch publicadora', details: error });
  }
});

/**
 * POST /api/publicadoras
 * Create a new publicadora
 * Body: { nome: string, pais_origem: string, site: string }
 */
app.post('/api/publicadoras', async (req: Request, res: Response) => {
  try {
    const { nome, pais_origem, site } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }
    if (!pais_origem || !pais_origem.trim()) {
      return res.status(400).json({ error: 'Pais_origem is required' });
    }
    if (!site || !site.trim()) {
      return res.status(400).json({ error: 'Site is required' });
    }

    const publicadora = new Publicadora(nome, pais_origem, site);
    const savedPublicadora = await publicadoraRepo.save(publicadora);
    res.status(201).json(savedPublicadora);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create publicadora', details: error });
  }
});

/**
 * PUT /api/publicadoras/:id
 * Update a publicadora
 * Body: { nome?: string, pais_origem?: string, site?: string }
 */
app.put('/api/publicadoras/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid publicadora ID' });
    }

    const publicadora = await publicadoraRepo.findById(id);
    if (!publicadora) {
      return res.status(404).json({ error: 'Publicadora not found' });
    }

    const { nome, pais_origem, site } = req.body;
    if (nome !== undefined) publicadora.nome = nome;
    if (pais_origem !== undefined) publicadora.pais_origem = pais_origem;
    if (site !== undefined) publicadora.site = site;

    const updatedPublicadora = await publicadoraRepo.update(publicadora);
    res.json(updatedPublicadora);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update publicadora', details: error });
  }
});

/**
 * DELETE /api/publicadoras/:id
 * Delete a publicadora
 */
app.delete('/api/publicadoras/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid publicadora ID' });
    }

    const publicadora = await publicadoraRepo.findById(id);
    if (!publicadora) {
      return res.status(404).json({ error: 'Publicadora not found' });
    }

    await publicadoraRepo.delete(id);
    res.json({ message: 'Publicadora deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete publicadora', details: error });
  }
});

// ==================== GENERO ROUTES ====================

/**
 * GET /api/generos
 * Get all generos
 */
app.get('/api/generos', async (req: Request, res: Response) => {
  try {
    const generos = await generoRepo.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch generos', details: error });
  }
});

/**
 * GET /api/generos/:id
 * Get a genero by ID
 */
app.get('/api/generos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genero ID' });
    }

    const genero = await generoRepo.findById(id);
    if (!genero) {
      return res.status(404).json({ error: 'Genero not found' });
    }

    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genero', details: error });
  }
});

/**
 * POST /api/generos
 * Create a new genero
 * Body: { nome: string }
 */
app.post('/api/generos', async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }

    const genero = new Genero(nome);
    const savedGenero = await generoRepo.save(genero);
    res.status(201).json(savedGenero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create genero', details: error });
  }
});

/**
 * PUT /api/generos/:id
 * Update a genero
 * Body: { nome: string }
 */
app.put('/api/generos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genero ID' });
    }

    const genero = await generoRepo.findById(id);
    if (!genero) {
      return res.status(404).json({ error: 'Genero not found' });
    }

    const { nome } = req.body;
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }

    genero.nome = nome;
    const updatedGenero = await generoRepo.update(genero);
    res.json(updatedGenero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update genero', details: error });
  }
});

/**
 * DELETE /api/generos/:id
 * Delete a genero
 */
app.delete('/api/generos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid genero ID' });
    }

    const genero = await generoRepo.findById(id);
    if (!genero) {
      return res.status(404).json({ error: 'Genero not found' });
    }

    await generoRepo.delete(id);
    res.json({ message: 'Genero deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete genero', details: error });
  }
});

// ==================== TAG ROUTES ====================

/**
 * GET /api/tags
 * Get all tags
 */
app.get('/api/tags', async (req: Request, res: Response) => {
  try {
    const tags = await tagRepo.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags', details: error });
  }
});

/**
 * GET /api/tags/:id
 * Get a tag by ID
 */
app.get('/api/tags/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid tag ID' });
    }

    const tag = await tagRepo.findById(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tag', details: error });
  }
});

/**
 * POST /api/tags
 * Create a new tag
 * Body: { nome: string }
 */
app.post('/api/tags', async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;
    
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }

    const tag = new Tag(nome);
    const savedTag = await tagRepo.save(tag);
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag', details: error });
  }
});

/**
 * PUT /api/tags/:id
 * Update a tag
 * Body: { nome: string }
 */
app.put('/api/tags/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid tag ID' });
    }

    const tag = await tagRepo.findById(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    const { nome } = req.body;
    if (!nome || !nome.trim()) {
      return res.status(400).json({ error: 'Nome is required' });
    }

    tag.nome = nome;
    const updatedTag = await tagRepo.update(tag);
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag', details: error });
  }
});

/**
 * DELETE /api/tags/:id
 * Delete a tag
 */
app.delete('/api/tags/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid tag ID' });
    }

    const tag = await tagRepo.findById(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await tagRepo.delete(id);
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag', details: error });
  }
});

// ==================== JOGO ROUTES ====================

/**
 * GET /api/jogos
 * Get all jogos
 */
app.get('/api/jogos', async (req: Request, res: Response) => {
  try {
    const jogos = await jogoRepo.findAll();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jogos', details: error });
  }
});

/**
 * GET /api/jogos/:id
 * Get a jogo by ID
 */
app.get('/api/jogos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const jogo = await jogoRepo.findById(id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo not found' });
    }

    res.json(jogo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jogo', details: error });
  }
});

/**
 * GET /api/jogos/search?titulo=...
 * Search jogos by titulo
 */
app.get('/api/jogos/search', async (req: Request, res: Response) => {
  try {
    const titulo = req.query.titulo as string;
    if (!titulo) {
      return res.status(400).json({ error: 'Titulo query parameter is required' });
    }

    const jogos = await jogoRepo.findByTitulo(titulo);
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search jogos', details: error });
  }
});

/**
 * POST /api/jogos
 * Create a new jogo
 * Body: { titulo: string, descricao: string, preco: number, data_lanc: string, id_dev: number, id_publi: number }
 */
app.post('/api/jogos', async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, preco, data_lanc, id_dev, id_publi } = req.body;
    
    if (!titulo || !titulo.trim()) {
      return res.status(400).json({ error: 'Titulo is required' });
    }
    if (!descricao || !descricao.trim()) {
      return res.status(400).json({ error: 'Descricao is required' });
    }
    if (preco === undefined || preco < 0) {
      return res.status(400).json({ error: 'Preco is required and must be >= 0' });
    }
    if (!data_lanc || !data_lanc.trim()) {
      return res.status(400).json({ error: 'Data_lanc is required' });
    }
    if (!id_dev || isNaN(id_dev)) {
      return res.status(400).json({ error: 'Id_dev is required' });
    }
    if (!id_publi || isNaN(id_publi)) {
      return res.status(400).json({ error: 'Id_publi is required' });
    }

    const jogo = new Jogo(titulo, descricao, preco, data_lanc, id_dev, id_publi);
    const savedJogo = await jogoRepo.save(jogo);
    res.status(201).json(savedJogo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create jogo', details: error });
  }
});

/**
 * PUT /api/jogos/:id
 * Update a jogo
 * Body: { titulo?: string, descricao?: string, preco?: number, data_lanc?: string, id_dev?: number, id_publi?: number }
 */
app.put('/api/jogos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const jogo = await jogoRepo.findById(id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo not found' });
    }

    const { titulo, descricao, preco, data_lanc, id_dev, id_publi } = req.body;
    if (titulo !== undefined) jogo.titulo = titulo;
    if (descricao !== undefined) jogo.descricao = descricao;
    if (preco !== undefined) jogo.preco = preco;
    if (data_lanc !== undefined) jogo.data_lanc = data_lanc;
    if (id_dev !== undefined) jogo.id_dev = id_dev;
    if (id_publi !== undefined) jogo.id_publi = id_publi;

    const updatedJogo = await jogoRepo.update(jogo);
    res.json(updatedJogo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update jogo', details: error });
  }
});

/**
 * DELETE /api/jogos/:id
 * Delete a jogo
 */
app.delete('/api/jogos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const jogo = await jogoRepo.findById(id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo not found' });
    }

    await jogoRepo.delete(id);
    res.json({ message: 'Jogo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete jogo', details: error });
  }
});

// ==================== TRANSACAO ROUTES ====================

/**
 * GET /api/transacoes
 * Get all transacoes
 */
app.get('/api/transacoes', async (req: Request, res: Response) => {
  try {
    const transacoes = await transacaoRepo.findAll();
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transacoes', details: error });
  }
});

/**
 * GET /api/transacoes/:id
 * Get a transacao by ID
 */
app.get('/api/transacoes/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid transacao ID' });
    }

    const transacao = await transacaoRepo.findById(id);
    if (!transacao) {
      return res.status(404).json({ error: 'Transacao not found' });
    }

    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transacao', details: error });
  }
});

/**
 * GET /api/usuarios/:idUsuario/transacoes
 * Get all transacoes for a usuario
 */
app.get('/api/usuarios/:idUsuario/transacoes', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const transacoes = await transacaoRepo.findByUsuarioId(idUsuario);
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transacoes', details: error });
  }
});

/**
 * POST /api/transacoes
 * Create a new transacao
 * Body: { id_usuario: number, valor_total: number }
 */
app.post('/api/transacoes', async (req: Request, res: Response) => {
  try {
    const { id_usuario, valor_total } = req.body;
    
    if (!id_usuario || isNaN(id_usuario)) {
      return res.status(400).json({ error: 'Id_usuario is required' });
    }
    if (valor_total === undefined || valor_total < 0) {
      return res.status(400).json({ error: 'Valor_total is required and must be >= 0' });
    }

    const transacao = new Transacao(id_usuario, valor_total);
    const savedTransacao = await transacaoRepo.save(transacao);
    res.status(201).json(savedTransacao);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transacao', details: error });
  }
});

/**
 * PUT /api/transacoes/:id
 * Update a transacao
 * Body: { valor_total?: number }
 */
app.put('/api/transacoes/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid transacao ID' });
    }

    const transacao = await transacaoRepo.findById(id);
    if (!transacao) {
      return res.status(404).json({ error: 'Transacao not found' });
    }

    const { valor_total } = req.body;
    if (valor_total !== undefined) {
      if (valor_total < 0) {
        return res.status(400).json({ error: 'Valor_total must be >= 0' });
      }
      transacao.valor_total = valor_total;
    }

    const updatedTransacao = await transacaoRepo.update(transacao);
    res.json(updatedTransacao);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transacao', details: error });
  }
});

/**
 * DELETE /api/transacoes/:id
 * Delete a transacao
 */
app.delete('/api/transacoes/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid transacao ID' });
    }

    const transacao = await transacaoRepo.findById(id);
    if (!transacao) {
      return res.status(404).json({ error: 'Transacao not found' });
    }

    await transacaoRepo.delete(id);
    res.json({ message: 'Transacao deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transacao', details: error });
  }
});

// ==================== ITEM TRANSACAO ROUTES ====================

/**
 * GET /api/transacoes/:idTransacao/itens
 * Get all itens for a transacao
 */
app.get('/api/transacoes/:idTransacao/itens', async (req: Request, res: Response) => {
  try {
    const idTransacao = parseInt(req.params.idTransacao);
    if (isNaN(idTransacao)) {
      return res.status(400).json({ error: 'Invalid transacao ID' });
    }

    const itens = await itemTransacaoRepo.findByTransacaoId(idTransacao);
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch itens', details: error });
  }
});

/**
 * POST /api/transacoes/:idTransacao/itens
 * Create a new item transacao
 * Body: { id_jogo: number }
 */
app.post('/api/transacoes/:idTransacao/itens', async (req: Request, res: Response) => {
  try {
    const idTransacao = parseInt(req.params.idTransacao);
    if (isNaN(idTransacao)) {
      return res.status(400).json({ error: 'Invalid transacao ID' });
    }

    const { id_jogo } = req.body;
    if (!id_jogo || isNaN(id_jogo)) {
      return res.status(400).json({ error: 'Id_jogo is required' });
    }

    const itemTransacao = new ItemTransacao(id_jogo, idTransacao);
    const savedItem = await itemTransacaoRepo.save(itemTransacao);
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item transacao', details: error });
  }
});

/**
 * DELETE /api/transacoes/:idTransacao/itens/:idJogo
 * Delete an item transacao
 */
app.delete('/api/transacoes/:idTransacao/itens/:idJogo', async (req: Request, res: Response) => {
  try {
    const idTransacao = parseInt(req.params.idTransacao);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idTransacao) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await itemTransacaoRepo.delete(idJogo, idTransacao);
    res.json({ message: 'Item transacao deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item transacao', details: error });
  }
});

// ==================== JOGO TAG ROUTES ====================

/**
 * GET /api/jogos/:idJogo/tags
 * Get all tags for a jogo
 */
app.get('/api/jogos/:idJogo/tags', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const jogoTags = await jogoTagRepo.findByJogoId(idJogo);
    res.json(jogoTags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jogo tags', details: error });
  }
});

/**
 * POST /api/jogos/:idJogo/tags
 * Create a new jogo tag
 * Body: { id_tag: number }
 */
app.post('/api/jogos/:idJogo/tags', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const { id_tag } = req.body;
    if (!id_tag || isNaN(id_tag)) {
      return res.status(400).json({ error: 'Id_tag is required' });
    }

    const jogoTag = new JogoTag(idJogo, id_tag);
    const savedJogoTag = await jogoTagRepo.save(jogoTag);
    res.status(201).json(savedJogoTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create jogo tag', details: error });
  }
});

/**
 * DELETE /api/jogos/:idJogo/tags/:idTag
 * Delete a jogo tag
 */
app.delete('/api/jogos/:idJogo/tags/:idTag', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    const idTag = parseInt(req.params.idTag);
    
    if (isNaN(idJogo) || isNaN(idTag)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await jogoTagRepo.delete(idJogo, idTag);
    res.json({ message: 'Jogo tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete jogo tag', details: error });
  }
});

// ==================== JOGO GENERO ROUTES ====================

/**
 * GET /api/jogos/:idJogo/generos
 * Get all generos for a jogo
 */
app.get('/api/jogos/:idJogo/generos', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const jogoGeneros = await jogoGeneroRepo.findByJogoId(idJogo);
    res.json(jogoGeneros);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jogo generos', details: error });
  }
});

/**
 * POST /api/jogos/:idJogo/generos
 * Create a new jogo genero
 * Body: { id_gen: number }
 */
app.post('/api/jogos/:idJogo/generos', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const { id_gen } = req.body;
    if (!id_gen || isNaN(id_gen)) {
      return res.status(400).json({ error: 'Id_gen is required' });
    }

    const jogoGenero = new JogoGenero(idJogo, id_gen);
    const savedJogoGenero = await jogoGeneroRepo.save(jogoGenero);
    res.status(201).json(savedJogoGenero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create jogo genero', details: error });
  }
});

/**
 * DELETE /api/jogos/:idJogo/generos/:idGen
 * Delete a jogo genero
 */
app.delete('/api/jogos/:idJogo/generos/:idGen', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    const idGen = parseInt(req.params.idGen);
    
    if (isNaN(idJogo) || isNaN(idGen)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await jogoGeneroRepo.delete(idJogo, idGen);
    res.json({ message: 'Jogo genero deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete jogo genero', details: error });
  }
});

// ==================== ANALISE ROUTES ====================

/**
 * GET /api/jogos/:idJogo/analises
 * Get all analises for a jogo
 */
app.get('/api/jogos/:idJogo/analises', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const analises = await analiseRepo.findByJogoId(idJogo);
    res.json(analises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analises', details: error });
  }
});

/**
 * GET /api/usuarios/:idUsuario/analises
 * Get all analises for a usuario
 */
app.get('/api/usuarios/:idUsuario/analises', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const analises = await analiseRepo.findByUsuarioId(idUsuario);
    res.json(analises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analises', details: error });
  }
});

/**
 * GET /api/jogos/:idJogo/analises/:idUsuario
 * Get a specific analise
 */
app.get('/api/jogos/:idJogo/analises/:idUsuario', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    const idUsuario = parseInt(req.params.idUsuario);
    
    if (isNaN(idJogo) || isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const analise = await analiseRepo.findByJogoAndUsuario(idJogo, idUsuario);
    if (!analise) {
      return res.status(404).json({ error: 'Analise not found' });
    }

    res.json(analise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analise', details: error });
  }
});

/**
 * POST /api/jogos/:idJogo/analises
 * Create or update an analise
 * Body: { id_usuario: number, nota: number, texto?: string }
 */
app.post('/api/jogos/:idJogo/analises', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    if (isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid jogo ID' });
    }

    const { id_usuario, nota, texto } = req.body;
    
    if (!id_usuario || isNaN(id_usuario)) {
      return res.status(400).json({ error: 'Id_usuario is required' });
    }
    if (nota === undefined || nota < 0 || nota > 10) {
      return res.status(400).json({ error: 'Nota is required and must be between 0 and 10' });
    }

    const analise = await gameHubService.postReview(idJogo, id_usuario, nota, texto || null);
    res.status(201).json(analise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create/update analise', details: error });
  }
});

/**
 * PUT /api/jogos/:idJogo/analises/:idUsuario
 * Update an analise
 * Body: { nota?: number, texto?: string }
 */
app.put('/api/jogos/:idJogo/analises/:idUsuario', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    const idUsuario = parseInt(req.params.idUsuario);
    
    if (isNaN(idJogo) || isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const analise = await analiseRepo.findByJogoAndUsuario(idJogo, idUsuario);
    if (!analise) {
      return res.status(404).json({ error: 'Analise not found' });
    }

    const { nota, texto } = req.body;
    if (nota !== undefined) {
      if (nota < 0 || nota > 10) {
        return res.status(400).json({ error: 'Nota must be between 0 and 10' });
      }
      analise.atualizarNota(nota);
    }
    if (texto !== undefined) {
      analise.atualizarTexto(texto);
    }

    const updatedAnalise = await analiseRepo.update(analise);
    res.json(updatedAnalise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update analise', details: error });
  }
});

/**
 * DELETE /api/jogos/:idJogo/analises/:idUsuario
 * Delete an analise
 */
app.delete('/api/jogos/:idJogo/analises/:idUsuario', async (req: Request, res: Response) => {
  try {
    const idJogo = parseInt(req.params.idJogo);
    const idUsuario = parseInt(req.params.idUsuario);
    
    if (isNaN(idJogo) || isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await analiseRepo.delete(idJogo, idUsuario);
    res.json({ message: 'Analise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete analise', details: error });
  }
});

// ==================== BIBLIOTECA ROUTES ====================

/**
 * GET /api/usuarios/:idUsuario/biblioteca
 * Get all biblioteca items for a usuario
 */
app.get('/api/usuarios/:idUsuario/biblioteca', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const biblioteca = await gameHubService.getLibrary(idUsuario);
    res.json(biblioteca);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch biblioteca', details: error });
  }
});

/**
 * GET /api/usuarios/:idUsuario/biblioteca/:idJogo
 * Get a specific biblioteca item
 */
app.get('/api/usuarios/:idUsuario/biblioteca/:idJogo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idUsuario) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const biblioteca = await bibliotecaRepo.findByJogoAndUsuario(idJogo, idUsuario);
    if (!biblioteca) {
      return res.status(404).json({ error: 'Biblioteca item not found' });
    }

    res.json(biblioteca);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch biblioteca item', details: error });
  }
});

/**
 * PUT /api/usuarios/:idUsuario/biblioteca/:idJogo
 * Update a biblioteca item (tempo_jogado)
 * Body: { tempo_jogado: number }
 */
app.put('/api/usuarios/:idUsuario/biblioteca/:idJogo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idUsuario) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const biblioteca = await bibliotecaRepo.findByJogoAndUsuario(idJogo, idUsuario);
    if (!biblioteca) {
      return res.status(404).json({ error: 'Biblioteca item not found' });
    }

    const { tempo_jogado } = req.body;
    if (tempo_jogado !== undefined) {
      if (tempo_jogado < 0) {
        return res.status(400).json({ error: 'Tempo_jogado must be >= 0' });
      }
      biblioteca.tempo_jogado = tempo_jogado;
    }

    const updatedBiblioteca = await bibliotecaRepo.update(biblioteca);
    res.json(updatedBiblioteca);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update biblioteca', details: error });
  }
});

/**
 * DELETE /api/usuarios/:idUsuario/biblioteca/:idJogo
 * Delete a biblioteca item
 */
app.delete('/api/usuarios/:idUsuario/biblioteca/:idJogo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idUsuario) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await bibliotecaRepo.delete(idJogo, idUsuario);
    res.json({ message: 'Biblioteca item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete biblioteca item', details: error });
  }
});

// ==================== CARRINHO ROUTES ====================

/**
 * GET /api/usuarios/:idUsuario/carrinho
 * Get all carrinho items for a usuario
 */
app.get('/api/usuarios/:idUsuario/carrinho', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const carrinho = await carrinhoRepo.findByUsuarioId(idUsuario);
    res.json(carrinho);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carrinho', details: error });
  }
});

/**
 * POST /api/usuarios/:idUsuario/carrinho
 * Add a jogo to carrinho
 * Body: { id_jogo: number }
 */
app.post('/api/usuarios/:idUsuario/carrinho', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const { id_jogo } = req.body;
    if (!id_jogo || isNaN(id_jogo)) {
      return res.status(400).json({ error: 'Id_jogo is required' });
    }

    // Verifica se já existe no carrinho
    const itemExistente = await carrinhoRepo.findByJogoAndUsuario(id_jogo, idUsuario);
    if (itemExistente) {
      return res.status(400).json({ error: 'Jogo already in carrinho' });
    }

    const carrinho = new Carrinho(id_jogo, idUsuario);
    const savedCarrinho = await carrinhoRepo.save(carrinho);
    res.status(201).json(savedCarrinho);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to carrinho', details: error });
  }
});

/**
 * DELETE /api/usuarios/:idUsuario/carrinho/:idJogo
 * Remove a jogo from carrinho
 */
app.delete('/api/usuarios/:idUsuario/carrinho/:idJogo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idUsuario) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await carrinhoRepo.delete(idJogo, idUsuario);
    res.json({ message: 'Item removed from carrinho successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from carrinho', details: error });
  }
});

/**
 * POST /api/usuarios/:idUsuario/carrinho/checkout
 * Checkout carrinho (converte em transacao)
 */
app.post('/api/usuarios/:idUsuario/carrinho/checkout', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const transacao = await gameHubService.checkoutCart(idUsuario);
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Failed to checkout', details: error });
  }
});

// ==================== WISHLIST ROUTES ====================

/**
 * GET /api/usuarios/:idUsuario/wishlist
 * Get all wishlist items for a usuario
 */
app.get('/api/usuarios/:idUsuario/wishlist', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const wishlist = await wishlistRepo.findByUsuarioId(idUsuario);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist', details: error });
  }
});

/**
 * POST /api/usuarios/:idUsuario/wishlist
 * Add a jogo to wishlist
 * Body: { id_jogo: number }
 */
app.post('/api/usuarios/:idUsuario/wishlist', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const { id_jogo } = req.body;
    if (!id_jogo || isNaN(id_jogo)) {
      return res.status(400).json({ error: 'Id_jogo is required' });
    }

    // Verifica se já existe na wishlist
    const itemExistente = await wishlistRepo.findByJogoAndUsuario(id_jogo, idUsuario);
    if (itemExistente) {
      return res.status(400).json({ error: 'Jogo already in wishlist' });
    }

    const wishlist = new Wishlist(id_jogo, idUsuario);
    const savedWishlist = await wishlistRepo.save(wishlist);
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist', details: error });
  }
});

/**
 * DELETE /api/usuarios/:idUsuario/wishlist/:idJogo
 * Remove a jogo from wishlist
 */
app.delete('/api/usuarios/:idUsuario/wishlist/:idJogo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idJogo = parseInt(req.params.idJogo);
    
    if (isNaN(idUsuario) || isNaN(idJogo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await wishlistRepo.delete(idJogo, idUsuario);
    res.json({ message: 'Item removed from wishlist successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from wishlist', details: error });
  }
});

// ==================== AMIZADES ROUTES ====================

/**
 * GET /api/usuarios/:idUsuario/amizades
 * Get all amizades for a usuario
 */
app.get('/api/usuarios/:idUsuario/amizades', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const amizades = await amizadesRepo.findByUsuarioId(idUsuario);
    res.json(amizades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch amizades', details: error });
  }
});

/**
 * GET /api/usuarios/:idUsuario/amizades/aceitas
 * Get all accepted amizades for a usuario
 */
app.get('/api/usuarios/:idUsuario/amizades/aceitas', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const amizades = await amizadesRepo.findAceitasByUsuarioId(idUsuario);
    res.json(amizades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch amizades', details: error });
  }
});

/**
 * POST /api/usuarios/:idUsuario/amizades
 * Add a friend (create amizade)
 * Body: { id_amigo: number }
 */
app.post('/api/usuarios/:idUsuario/amizades', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'Invalid usuario ID' });
    }

    const { id_amigo } = req.body;
    if (!id_amigo || isNaN(id_amigo)) {
      return res.status(400).json({ error: 'Id_amigo is required' });
    }

    const amizade = await gameHubService.addFriend(idUsuario, id_amigo);
    res.status(201).json(amizade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add friend', details: error });
  }
});

/**
 * PATCH /api/usuarios/:idUsuario/amizades/:idAmigo/aceitar
 * Accept an amizade
 */
app.patch('/api/usuarios/:idUsuario/amizades/:idAmigo/aceitar', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    
    if (isNaN(idUsuario) || isNaN(idAmigo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const amizade = await amizadesRepo.findByUsuarioAndAmigo(idUsuario, idAmigo);
    if (!amizade) {
      return res.status(404).json({ error: 'Amizade not found' });
    }

    amizade.aceitar();
    const updatedAmizade = await amizadesRepo.update(amizade);
    res.json(updatedAmizade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept amizade', details: error });
  }
});

/**
 * PATCH /api/usuarios/:idUsuario/amizades/:idAmigo/rejeitar
 * Reject an amizade
 */
app.patch('/api/usuarios/:idUsuario/amizades/:idAmigo/rejeitar', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    
    if (isNaN(idUsuario) || isNaN(idAmigo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    const amizade = await amizadesRepo.findByUsuarioAndAmigo(idUsuario, idAmigo);
    if (!amizade) {
      return res.status(404).json({ error: 'Amizade not found' });
    }

    amizade.rejeitar();
    const updatedAmizade = await amizadesRepo.update(amizade);
    res.json(updatedAmizade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject amizade', details: error });
  }
});

/**
 * DELETE /api/usuarios/:idUsuario/amizades/:idAmigo
 * Delete an amizade
 */
app.delete('/api/usuarios/:idUsuario/amizades/:idAmigo', async (req: Request, res: Response) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idAmigo = parseInt(req.params.idAmigo);
    
    if (isNaN(idUsuario) || isNaN(idAmigo)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }

    await amizadesRepo.delete(idUsuario, idAmigo);
    res.json({ message: 'Amizade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete amizade', details: error });
  }
});

// ==================== ROOT ROUTE ====================

/**
 * GET /
 * API welcome message
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'GameHub API',
    version: '1.0.0',
    endpoints: {
      usuarios: {
        'GET /api/usuarios': 'Get all usuarios',
        'GET /api/usuarios/:id': 'Get a usuario by ID',
        'GET /api/usuarios/search?email=...': 'Search usuario by email',
        'POST /api/usuarios': 'Create a new usuario',
        'PUT /api/usuarios/:id': 'Update a usuario',
        'DELETE /api/usuarios/:id': 'Delete a usuario',
        'GET /api/usuarios/:id/transacoes': 'Get all transacoes for a usuario',
        'GET /api/usuarios/:id/analises': 'Get all analises for a usuario',
        'GET /api/usuarios/:id/biblioteca': 'Get biblioteca for a usuario',
        'GET /api/usuarios/:id/carrinho': 'Get carrinho for a usuario',
        'POST /api/usuarios/:id/carrinho': 'Add jogo to carrinho',
        'POST /api/usuarios/:id/carrinho/checkout': 'Checkout carrinho',
        'DELETE /api/usuarios/:id/carrinho/:idJogo': 'Remove jogo from carrinho',
        'GET /api/usuarios/:id/wishlist': 'Get wishlist for a usuario',
        'POST /api/usuarios/:id/wishlist': 'Add jogo to wishlist',
        'DELETE /api/usuarios/:id/wishlist/:idJogo': 'Remove jogo from wishlist',
        'GET /api/usuarios/:id/amizades': 'Get all amizades for a usuario',
        'GET /api/usuarios/:id/amizades/aceitas': 'Get accepted amizades for a usuario',
        'POST /api/usuarios/:id/amizades': 'Add a friend',
        'PATCH /api/usuarios/:id/amizades/:idAmigo/aceitar': 'Accept amizade',
        'PATCH /api/usuarios/:id/amizades/:idAmigo/rejeitar': 'Reject amizade',
        'DELETE /api/usuarios/:id/amizades/:idAmigo': 'Delete amizade'
      },
      desenvolvedores: {
        'GET /api/desenvolvedores': 'Get all desenvolvedores',
        'GET /api/desenvolvedores/:id': 'Get a desenvolvedor by ID',
        'POST /api/desenvolvedores': 'Create a new desenvolvedor',
        'PUT /api/desenvolvedores/:id': 'Update a desenvolvedor',
        'DELETE /api/desenvolvedores/:id': 'Delete a desenvolvedor'
      },
      publicadoras: {
        'GET /api/publicadoras': 'Get all publicadoras',
        'GET /api/publicadoras/:id': 'Get a publicadora by ID',
        'POST /api/publicadoras': 'Create a new publicadora',
        'PUT /api/publicadoras/:id': 'Update a publicadora',
        'DELETE /api/publicadoras/:id': 'Delete a publicadora'
      },
      generos: {
        'GET /api/generos': 'Get all generos',
        'GET /api/generos/:id': 'Get a genero by ID',
        'POST /api/generos': 'Create a new genero',
        'PUT /api/generos/:id': 'Update a genero',
        'DELETE /api/generos/:id': 'Delete a genero'
      },
      tags: {
        'GET /api/tags': 'Get all tags',
        'GET /api/tags/:id': 'Get a tag by ID',
        'POST /api/tags': 'Create a new tag',
        'PUT /api/tags/:id': 'Update a tag',
        'DELETE /api/tags/:id': 'Delete a tag'
      },
      jogos: {
        'GET /api/jogos': 'Get all jogos',
        'GET /api/jogos/:id': 'Get a jogo by ID',
        'GET /api/jogos/search?titulo=...': 'Search jogos by titulo',
        'POST /api/jogos': 'Create a new jogo',
        'PUT /api/jogos/:id': 'Update a jogo',
        'DELETE /api/jogos/:id': 'Delete a jogo',
        'GET /api/jogos/:id/tags': 'Get all tags for a jogo',
        'POST /api/jogos/:id/tags': 'Add tag to jogo',
        'DELETE /api/jogos/:id/tags/:idTag': 'Remove tag from jogo',
        'GET /api/jogos/:id/generos': 'Get all generos for a jogo',
        'POST /api/jogos/:id/generos': 'Add genero to jogo',
        'DELETE /api/jogos/:id/generos/:idGen': 'Remove genero from jogo',
        'GET /api/jogos/:id/analises': 'Get all analises for a jogo',
        'POST /api/jogos/:id/analises': 'Create or update analise for a jogo',
        'GET /api/jogos/:id/analises/:idUsuario': 'Get analise by jogo and usuario',
        'PUT /api/jogos/:id/analises/:idUsuario': 'Update analise',
        'DELETE /api/jogos/:id/analises/:idUsuario': 'Delete analise'
      },
      transacoes: {
        'GET /api/transacoes': 'Get all transacoes',
        'GET /api/transacoes/:id': 'Get a transacao by ID',
        'POST /api/transacoes': 'Create a new transacao',
        'PUT /api/transacoes/:id': 'Update a transacao',
        'DELETE /api/transacoes/:id': 'Delete a transacao',
        'GET /api/transacoes/:id/itens': 'Get all itens for a transacao',
        'POST /api/transacoes/:id/itens': 'Add item to transacao',
        'DELETE /api/transacoes/:id/itens/:idJogo': 'Remove item from transacao'
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`GameHub API Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/`);
});

export default app;

