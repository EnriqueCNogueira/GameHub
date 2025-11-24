import { PrismaClient } from '@prisma/client';
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

const prisma = new PrismaClient();

// ========== USUARIO REPOSITORY ==========

export class UsuarioRepository {
  async findById(id: number): Promise<Usuario | null> {
    const usuarioData = await prisma.usuario.findUnique({
      where: { id_usuario: id }
    });
    
    if (!usuarioData) return null;
    
    const usuario = new Usuario(
      usuarioData.nome,
      usuarioData.email,
      usuarioData.senha,
      usuarioData.saldo,
      usuarioData.data_criacao
    );
    usuario.id_usuario = usuarioData.id_usuario;
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    const usuariosData = await prisma.usuario.findMany();
    
    return usuariosData.map(usuarioData => {
      const usuario = new Usuario(
        usuarioData.nome,
        usuarioData.email,
        usuarioData.senha,
        usuarioData.saldo,
        usuarioData.data_criacao
      );
      usuario.id_usuario = usuarioData.id_usuario;
      return usuario;
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuarioData = await prisma.usuario.findUnique({
      where: { email }
    });
    
    if (!usuarioData) return null;
    
    const usuario = new Usuario(
      usuarioData.nome,
      usuarioData.email,
      usuarioData.senha,
      usuarioData.saldo,
      usuarioData.data_criacao
    );
    usuario.id_usuario = usuarioData.id_usuario;
    return usuario;
  }

  async save(usuario: Usuario): Promise<Usuario> {
    const usuarioData = await prisma.usuario.create({
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        saldo: usuario.saldo,
        data_criacao: usuario.data_criacao
      }
    });
    
    usuario.id_usuario = usuarioData.id_usuario;
    return usuario;
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        saldo: usuario.saldo
      }
    });
    
    return usuario;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.usuario.delete({
      where: { id_usuario: id }
    });
    
    return true;
  }
}

// ========== DESENVOLVEDOR REPOSITORY ==========

export class DesenvolvedorRepository {
  async findById(id: number): Promise<Desenvolvedor | null> {
    const devData = await prisma.desenvolvedor.findUnique({
      where: { id_dev: id }
    });
    
    if (!devData) return null;
    
    const dev = new Desenvolvedor(
      devData.nome,
      devData.pais_origem,
      devData.site
    );
    dev.id_dev = devData.id_dev;
    return dev;
  }

  async findAll(): Promise<Desenvolvedor[]> {
    const devsData = await prisma.desenvolvedor.findMany();
    
    return devsData.map(devData => {
      const dev = new Desenvolvedor(
        devData.nome,
        devData.pais_origem,
        devData.site
      );
      dev.id_dev = devData.id_dev;
      return dev;
    });
  }

  async save(desenvolvedor: Desenvolvedor): Promise<Desenvolvedor> {
    const devData = await prisma.desenvolvedor.create({
      data: {
        nome: desenvolvedor.nome,
        pais_origem: desenvolvedor.pais_origem,
        site: desenvolvedor.site
      }
    });
    
    desenvolvedor.id_dev = devData.id_dev;
    return desenvolvedor;
  }

  async update(desenvolvedor: Desenvolvedor): Promise<Desenvolvedor> {
    await prisma.desenvolvedor.update({
      where: { id_dev: desenvolvedor.id_dev },
      data: {
        nome: desenvolvedor.nome,
        pais_origem: desenvolvedor.pais_origem,
        site: desenvolvedor.site
      }
    });
    
    return desenvolvedor;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.desenvolvedor.delete({
      where: { id_dev: id }
    });
    
    return true;
  }
}

// ========== PUBLICADORA REPOSITORY ==========

export class PublicadoraRepository {
  async findById(id: number): Promise<Publicadora | null> {
    const pubData = await prisma.publicadora.findUnique({
      where: { id_publi: id }
    });
    
    if (!pubData) return null;
    
    const pub = new Publicadora(
      pubData.nome,
      pubData.pais_origem,
      pubData.site
    );
    pub.id_publi = pubData.id_publi;
    return pub;
  }

  async findAll(): Promise<Publicadora[]> {
    const pubsData = await prisma.publicadora.findMany();
    
    return pubsData.map(pubData => {
      const pub = new Publicadora(
        pubData.nome,
        pubData.pais_origem,
        pubData.site
      );
      pub.id_publi = pubData.id_publi;
      return pub;
    });
  }

  async save(publicadora: Publicadora): Promise<Publicadora> {
    const pubData = await prisma.publicadora.create({
      data: {
        nome: publicadora.nome,
        pais_origem: publicadora.pais_origem,
        site: publicadora.site
      }
    });
    
    publicadora.id_publi = pubData.id_publi;
    return publicadora;
  }

  async update(publicadora: Publicadora): Promise<Publicadora> {
    await prisma.publicadora.update({
      where: { id_publi: publicadora.id_publi },
      data: {
        nome: publicadora.nome,
        pais_origem: publicadora.pais_origem,
        site: publicadora.site
      }
    });
    
    return publicadora;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.publicadora.delete({
      where: { id_publi: id }
    });
    
    return true;
  }
}

// ========== GENERO REPOSITORY ==========

export class GeneroRepository {
  async findById(id: number): Promise<Genero | null> {
    const genData = await prisma.genero.findUnique({
      where: { id_gen: id }
    });
    
    if (!genData) return null;
    
    const gen = new Genero(genData.nome);
    gen.id_gen = genData.id_gen;
    return gen;
  }

  async findAll(): Promise<Genero[]> {
    const gensData = await prisma.genero.findMany();
    
    return gensData.map(genData => {
      const gen = new Genero(genData.nome);
      gen.id_gen = genData.id_gen;
      return gen;
    });
  }

  async save(genero: Genero): Promise<Genero> {
    const genData = await prisma.genero.create({
      data: {
        nome: genero.nome
      }
    });
    
    genero.id_gen = genData.id_gen;
    return genero;
  }

  async update(genero: Genero): Promise<Genero> {
    await prisma.genero.update({
      where: { id_gen: genero.id_gen },
      data: {
        nome: genero.nome
      }
    });
    
    return genero;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.genero.delete({
      where: { id_gen: id }
    });
    
    return true;
  }
}

// ========== TAG REPOSITORY ==========

export class TagRepository {
  async findById(id: number): Promise<Tag | null> {
    const tagData = await prisma.tag.findUnique({
      where: { id_tag: id }
    });
    
    if (!tagData) return null;
    
    const tag = new Tag(tagData.nome);
    tag.id_tag = tagData.id_tag;
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    const tagsData = await prisma.tag.findMany();
    
    return tagsData.map(tagData => {
      const tag = new Tag(tagData.nome);
      tag.id_tag = tagData.id_tag;
      return tag;
    });
  }

  async save(tag: Tag): Promise<Tag> {
    const tagData = await prisma.tag.create({
      data: {
        nome: tag.nome
      }
    });
    
    tag.id_tag = tagData.id_tag;
    return tag;
  }

  async update(tag: Tag): Promise<Tag> {
    await prisma.tag.update({
      where: { id_tag: tag.id_tag },
      data: {
        nome: tag.nome
      }
    });
    
    return tag;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.tag.delete({
      where: { id_tag: id }
    });
    
    return true;
  }
}

// ========== JOGO REPOSITORY ==========

export class JogoRepository {
  async findById(id: number): Promise<Jogo | null> {
    const jogoData = await prisma.jogo.findUnique({
      where: { id_jogo: id },
      include: {
        desenvolvedor: true,
        publicadora: true,
        jogo_genero: { include: { genero: true } },
        jogo_tag: { include: { tag: true } }
      }
    });
    
    if (!jogoData) return null;
    
    const jogo = new Jogo(
      jogoData.titulo,
      jogoData.descricao,
      jogoData.preco,
      jogoData.data_lanc,
      jogoData.id_dev,
      jogoData.id_publi
    );
    jogo.id_jogo = jogoData.id_jogo;
    return jogo;
  }

  async findAll(): Promise<Jogo[]> {
    const jogosData = await prisma.jogo.findMany({
      include: {
        desenvolvedor: true,
        publicadora: true
      }
    });
    
    return jogosData.map(jogoData => {
      const jogo = new Jogo(
        jogoData.titulo,
        jogoData.descricao,
        jogoData.preco,
        jogoData.data_lanc,
        jogoData.id_dev,
        jogoData.id_publi
      );
      jogo.id_jogo = jogoData.id_jogo;
      return jogo;
    });
  }

  async findByTitulo(titulo: string): Promise<Jogo[]> {
    const jogosData = await prisma.jogo.findMany({
      where: {
        titulo: {
          contains: titulo
        }
      },
      include: {
        desenvolvedor: true,
        publicadora: true
      }
    });
    
    return jogosData.map(jogoData => {
      const jogo = new Jogo(
        jogoData.titulo,
        jogoData.descricao,
        jogoData.preco,
        jogoData.data_lanc,
        jogoData.id_dev,
        jogoData.id_publi
      );
      jogo.id_jogo = jogoData.id_jogo;
      return jogo;
    });
  }

  async save(jogo: Jogo): Promise<Jogo> {
    const jogoData = await prisma.jogo.create({
      data: {
        titulo: jogo.titulo,
        descricao: jogo.descricao,
        preco: jogo.preco,
        data_lanc: jogo.data_lanc,
        id_dev: jogo.id_dev,
        id_publi: jogo.id_publi
      }
    });
    
    jogo.id_jogo = jogoData.id_jogo;
    return jogo;
  }

  async update(jogo: Jogo): Promise<Jogo> {
    await prisma.jogo.update({
      where: { id_jogo: jogo.id_jogo },
      data: {
        titulo: jogo.titulo,
        descricao: jogo.descricao,
        preco: jogo.preco,
        data_lanc: jogo.data_lanc,
        id_dev: jogo.id_dev,
        id_publi: jogo.id_publi
      }
    });
    
    return jogo;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.jogo.delete({
      where: { id_jogo: id }
    });
    
    return true;
  }
}

// ========== TRANSACAO REPOSITORY ==========

export class TransacaoRepository {
  async findById(id: number): Promise<Transacao | null> {
    const transData = await prisma.transacao.findUnique({
      where: { id_trans: id },
      include: {
        itens: {
          include: {
            jogo: true
          }
        }
      }
    });
    
    if (!transData) return null;
    
    const trans = new Transacao(
      transData.id_usuario,
      transData.valor_total,
      transData.data_trans
    );
    trans.id_trans = transData.id_trans;
    return trans;
  }

  async findAll(): Promise<Transacao[]> {
    const transData = await prisma.transacao.findMany({
      include: {
        itens: {
          include: {
            jogo: true
          }
        }
      }
    });
    
    return transData.map(t => {
      const trans = new Transacao(
        t.id_usuario,
        t.valor_total,
        t.data_trans
      );
      trans.id_trans = t.id_trans;
      return trans;
    });
  }

  async findByUsuarioId(idUsuario: number): Promise<Transacao[]> {
    const transData = await prisma.transacao.findMany({
      where: { id_usuario: idUsuario },
      include: {
        itens: {
          include: {
            jogo: true
          }
        }
      }
    });
    
    return transData.map(t => {
      const trans = new Transacao(
        t.id_usuario,
        t.valor_total,
        t.data_trans
      );
      trans.id_trans = t.id_trans;
      return trans;
    });
  }

  async save(transacao: Transacao): Promise<Transacao> {
    const transData = await prisma.transacao.create({
      data: {
        id_usuario: transacao.id_usuario,
        valor_total: transacao.valor_total,
        data_trans: transacao.data_trans
      }
    });
    
    transacao.id_trans = transData.id_trans;
    return transacao;
  }

  async update(transacao: Transacao): Promise<Transacao> {
    await prisma.transacao.update({
      where: { id_trans: transacao.id_trans },
      data: {
        valor_total: transacao.valor_total
      }
    });
    
    return transacao;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.transacao.delete({
      where: { id_trans: id }
    });
    
    return true;
  }
}

// ========== ITEM TRANSACAO REPOSITORY ==========

export class ItemTransacaoRepository {
  async findByTransacaoId(idTransacao: number): Promise<ItemTransacao[]> {
    const itensData = await prisma.itemTransacao.findMany({
      where: { id_transacao: idTransacao },
      include: {
        jogo: true
      }
    });
    
    return itensData.map(item => {
      return new ItemTransacao(item.id_jogo, item.id_transacao);
    });
  }

  async save(itemTransacao: ItemTransacao): Promise<ItemTransacao> {
    await prisma.itemTransacao.create({
      data: {
        id_jogo: itemTransacao.id_jogo,
        id_transacao: itemTransacao.id_transacao
      }
    });
    
    return itemTransacao;
  }

  async delete(idJogo: number, idTransacao: number): Promise<boolean> {
    await prisma.itemTransacao.delete({
      where: {
        id_jogo_id_transacao: {
          id_jogo: idJogo,
          id_transacao: idTransacao
        }
      }
    });
    
    return true;
  }
}

// ========== JOGO TAG REPOSITORY ==========

export class JogoTagRepository {
  async findByJogoId(idJogo: number): Promise<JogoTag[]> {
    const jogoTagsData = await prisma.jogoTag.findMany({
      where: { id_jogo: idJogo },
      include: {
        tag: true
      }
    });
    
    return jogoTagsData.map(jt => {
      return new JogoTag(jt.id_jogo, jt.id_tag);
    });
  }

  async save(jogoTag: JogoTag): Promise<JogoTag> {
    await prisma.jogoTag.create({
      data: {
        id_jogo: jogoTag.id_jogo,
        id_tag: jogoTag.id_tag
      }
    });
    
    return jogoTag;
  }

  async delete(idJogo: number, idTag: number): Promise<boolean> {
    await prisma.jogoTag.delete({
      where: {
        id_jogo_id_tag: {
          id_jogo: idJogo,
          id_tag: idTag
        }
      }
    });
    
    return true;
  }
}

// ========== JOGO GENERO REPOSITORY ==========

export class JogoGeneroRepository {
  async findByJogoId(idJogo: number): Promise<JogoGenero[]> {
    const jogoGenerosData = await prisma.jogoGenero.findMany({
      where: { id_jogo: idJogo },
      include: {
        genero: true
      }
    });
    
    return jogoGenerosData.map(jg => {
      return new JogoGenero(jg.id_jogo, jg.id_gen);
    });
  }

  async save(jogoGenero: JogoGenero): Promise<JogoGenero> {
    await prisma.jogoGenero.create({
      data: {
        id_jogo: jogoGenero.id_jogo,
        id_gen: jogoGenero.id_gen
      }
    });
    
    return jogoGenero;
  }

  async delete(idJogo: number, idGen: number): Promise<boolean> {
    await prisma.jogoGenero.delete({
      where: {
        id_jogo_id_gen: {
          id_jogo: idJogo,
          id_gen: idGen
        }
      }
    });
    
    return true;
  }
}

// ========== ANALISE REPOSITORY ==========

export class AnaliseRepository {
  async findByJogoId(idJogo: number): Promise<Analise[]> {
    const analisesData = await prisma.analise.findMany({
      where: { id_jogo: idJogo },
      include: {
        usuario: true
      }
    });
    
    return analisesData.map(a => {
      const analise = new Analise(
        a.id_jogo,
        a.id_usuario,
        a.nota,
        a.texto,
        a.data_analise
      );
      return analise;
    });
  }

  async findByUsuarioId(idUsuario: number): Promise<Analise[]> {
    const analisesData = await prisma.analise.findMany({
      where: { id_usuario: idUsuario },
      include: {
        jogo: true
      }
    });
    
    return analisesData.map(a => {
      const analise = new Analise(
        a.id_jogo,
        a.id_usuario,
        a.nota,
        a.texto,
        a.data_analise
      );
      return analise;
    });
  }

  async findByJogoAndUsuario(idJogo: number, idUsuario: number): Promise<Analise | null> {
    const analiseData = await prisma.analise.findUnique({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    if (!analiseData) return null;
    
    const analise = new Analise(
      analiseData.id_jogo,
      analiseData.id_usuario,
      analiseData.nota,
      analiseData.texto,
      analiseData.data_analise
    );
    return analise;
  }

  async save(analise: Analise): Promise<Analise> {
    await prisma.analise.create({
      data: {
        id_jogo: analise.id_jogo,
        id_usuario: analise.id_usuario,
        nota: analise.nota,
        texto: analise.texto,
        data_analise: analise.data_analise
      }
    });
    
    return analise;
  }

  async update(analise: Analise): Promise<Analise> {
    await prisma.analise.update({
      where: {
        id_jogo_id_usuario: {
          id_jogo: analise.id_jogo,
          id_usuario: analise.id_usuario
        }
      },
      data: {
        nota: analise.nota,
        texto: analise.texto
      }
    });
    
    return analise;
  }

  async delete(idJogo: number, idUsuario: number): Promise<boolean> {
    await prisma.analise.delete({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    return true;
  }
}

// ========== BIBLIOTECA REPOSITORY ==========

export class BibliotecaRepository {
  async findByUsuarioId(idUsuario: number): Promise<Biblioteca[]> {
    const bibliotecaData = await prisma.biblioteca.findMany({
      where: { id_usuario: idUsuario },
      include: {
        jogo: {
          include: {
            desenvolvedor: true,
            publicadora: true
          }
        }
      }
    });
    
    return bibliotecaData.map(b => {
      const biblioteca = new Biblioteca(
        b.id_jogo,
        b.id_usuario,
        b.tempo_jogado,
        b.data_compra
      );
      return biblioteca;
    });
  }

  async findByJogoAndUsuario(idJogo: number, idUsuario: number): Promise<Biblioteca | null> {
    const bibliotecaData = await prisma.biblioteca.findUnique({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    if (!bibliotecaData) return null;
    
    const biblioteca = new Biblioteca(
      bibliotecaData.id_jogo,
      bibliotecaData.id_usuario,
      bibliotecaData.tempo_jogado,
      bibliotecaData.data_compra
    );
    return biblioteca;
  }

  async save(biblioteca: Biblioteca): Promise<Biblioteca> {
    await prisma.biblioteca.create({
      data: {
        id_jogo: biblioteca.id_jogo,
        id_usuario: biblioteca.id_usuario,
        tempo_jogado: biblioteca.tempo_jogado,
        data_compra: biblioteca.data_compra
      }
    });
    
    return biblioteca;
  }

  async update(biblioteca: Biblioteca): Promise<Biblioteca> {
    await prisma.biblioteca.update({
      where: {
        id_jogo_id_usuario: {
          id_jogo: biblioteca.id_jogo,
          id_usuario: biblioteca.id_usuario
        }
      },
      data: {
        tempo_jogado: biblioteca.tempo_jogado
      }
    });
    
    return biblioteca;
  }

  async delete(idJogo: number, idUsuario: number): Promise<boolean> {
    await prisma.biblioteca.delete({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    return true;
  }
}

// ========== CARRINHO REPOSITORY ==========

export class CarrinhoRepository {
  async findByUsuarioId(idUsuario: number): Promise<Carrinho[]> {
    const carrinhoData = await prisma.carrinho.findMany({
      where: { id_usuario: idUsuario },
      include: {
        jogo: {
          include: {
            desenvolvedor: true,
            publicadora: true
          }
        }
      }
    });
    
    return carrinhoData.map(c => {
      const carrinho = new Carrinho(
        c.id_jogo,
        c.id_usuario,
        c.data_adicao
      );
      return carrinho;
    });
  }

  async findByJogoAndUsuario(idJogo: number, idUsuario: number): Promise<Carrinho | null> {
    const carrinhoData = await prisma.carrinho.findUnique({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    if (!carrinhoData) return null;
    
    const carrinho = new Carrinho(
      carrinhoData.id_jogo,
      carrinhoData.id_usuario,
      carrinhoData.data_adicao
    );
    return carrinho;
  }

  async save(carrinho: Carrinho): Promise<Carrinho> {
    await prisma.carrinho.create({
      data: {
        id_jogo: carrinho.id_jogo,
        id_usuario: carrinho.id_usuario,
        data_adicao: carrinho.data_adicao
      }
    });
    
    return carrinho;
  }

  async delete(idJogo: number, idUsuario: number): Promise<boolean> {
    await prisma.carrinho.delete({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    return true;
  }

  async deleteAllByUsuario(idUsuario: number): Promise<boolean> {
    await prisma.carrinho.deleteMany({
      where: { id_usuario: idUsuario }
    });
    
    return true;
  }
}

// ========== WISHLIST REPOSITORY ==========

export class WishlistRepository {
  async findByUsuarioId(idUsuario: number): Promise<Wishlist[]> {
    const wishlistData = await prisma.wishlist.findMany({
      where: { id_usuario: idUsuario },
      include: {
        jogo: {
          include: {
            desenvolvedor: true,
            publicadora: true
          }
        }
      }
    });
    
    return wishlistData.map(w => {
      const wishlist = new Wishlist(
        w.id_jogo,
        w.id_usuario,
        w.data_adicao
      );
      return wishlist;
    });
  }

  async findByJogoAndUsuario(idJogo: number, idUsuario: number): Promise<Wishlist | null> {
    const wishlistData = await prisma.wishlist.findUnique({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    if (!wishlistData) return null;
    
    const wishlist = new Wishlist(
      wishlistData.id_jogo,
      wishlistData.id_usuario,
      wishlistData.data_adicao
    );
    return wishlist;
  }

  async save(wishlist: Wishlist): Promise<Wishlist> {
    await prisma.wishlist.create({
      data: {
        id_jogo: wishlist.id_jogo,
        id_usuario: wishlist.id_usuario,
        data_adicao: wishlist.data_adicao
      }
    });
    
    return wishlist;
  }

  async delete(idJogo: number, idUsuario: number): Promise<boolean> {
    await prisma.wishlist.delete({
      where: {
        id_jogo_id_usuario: {
          id_jogo: idJogo,
          id_usuario: idUsuario
        }
      }
    });
    
    return true;
  }
}

// ========== AMIZADES REPOSITORY ==========

export class AmizadesRepository {
  async findByUsuarioId(idUsuario: number): Promise<Amizades[]> {
    const amizadesData = await prisma.amizades.findMany({
      where: {
        OR: [
          { id_usuario: idUsuario },
          { id_amigo: idUsuario }
        ]
      },
      include: {
        iniciador: true,
        amigo: true
      }
    });
    
    return amizadesData.map(a => {
      const amizade = new Amizades(
        a.id_usuario,
        a.id_amigo,
        a.status,
        a.data_amizade
      );
      return amizade;
    });
  }

  async findByUsuarioAndAmigo(idUsuario: number, idAmigo: number): Promise<Amizades | null> {
    // Verifica em ambas as direções (id_usuario -> id_amigo e id_amigo -> id_usuario)
    const amizadeData = await prisma.amizades.findFirst({
      where: {
        OR: [
          {
            id_usuario: idUsuario,
            id_amigo: idAmigo
          },
          {
            id_usuario: idAmigo,
            id_amigo: idUsuario
          }
        ]
      }
    });
    
    if (!amizadeData) return null;
    
    const amizade = new Amizades(
      amizadeData.id_usuario,
      amizadeData.id_amigo,
      amizadeData.status,
      amizadeData.data_amizade
    );
    return amizade;
  }

  async findAceitasByUsuarioId(idUsuario: number): Promise<Amizades[]> {
    const amizadesData = await prisma.amizades.findMany({
      where: {
        OR: [
          { id_usuario: idUsuario, status: 'aceita' },
          { id_amigo: idUsuario, status: 'aceita' }
        ]
      },
      include: {
        iniciador: true,
        amigo: true
      }
    });
    
    return amizadesData.map(a => {
      const amizade = new Amizades(
        a.id_usuario,
        a.id_amigo,
        a.status,
        a.data_amizade
      );
      return amizade;
    });
  }

  async save(amizade: Amizades): Promise<Amizades> {
    await prisma.amizades.create({
      data: {
        id_usuario: amizade.id_usuario,
        id_amigo: amizade.id_amigo,
        status: amizade.status,
        data_amizade: amizade.data_amizade
      }
    });
    
    return amizade;
  }

  async update(amizade: Amizades): Promise<Amizades> {
    await prisma.amizades.update({
      where: {
        id_usuario_id_amigo: {
          id_usuario: amizade.id_usuario,
          id_amigo: amizade.id_amigo
        }
      },
      data: {
        status: amizade.status
      }
    });
    
    return amizade;
  }

  async delete(idUsuario: number, idAmigo: number): Promise<boolean> {
    await prisma.amizades.delete({
      where: {
        id_usuario_id_amigo: {
          id_usuario: idUsuario,
          id_amigo: idAmigo
        }
      }
    });
    
    return true;
  }
}

// ========== REGRAS DE NEGÓCIO ==========

export class GameHubService {
  private usuarioRepo: UsuarioRepository;
  private carrinhoRepo: CarrinhoRepository;
  private bibliotecaRepo: BibliotecaRepository;
  private transacaoRepo: TransacaoRepository;
  private itemTransacaoRepo: ItemTransacaoRepository;
  private jogoRepo: JogoRepository;
  private analiseRepo: AnaliseRepository;
  private amizadesRepo: AmizadesRepository;

  constructor() {
    this.usuarioRepo = new UsuarioRepository();
    this.carrinhoRepo = new CarrinhoRepository();
    this.bibliotecaRepo = new BibliotecaRepository();
    this.transacaoRepo = new TransacaoRepository();
    this.itemTransacaoRepo = new ItemTransacaoRepository();
    this.jogoRepo = new JogoRepository();
    this.analiseRepo = new AnaliseRepository();
    this.amizadesRepo = new AmizadesRepository();
  }

  /**
   * Adiciona uma amizade entre dois usuários
   * Regras:
   * - Não pode adicionar a si mesmo
   * - Não pode adicionar se já existe amizade
   * - Cria com status 'pendente'
   */
  async addFriend(idUsuario: number, idAmigo: number): Promise<Amizades> {
    if (idUsuario === idAmigo) {
      throw new Error('Não é possível adicionar a si mesmo como amigo');
    }

    // Verifica se já existe amizade
    const amizadeExistente = await this.amizadesRepo.findByUsuarioAndAmigo(idUsuario, idAmigo);
    if (amizadeExistente) {
      throw new Error('Amizade já existe entre estes usuários');
    }

    // Verifica se os usuários existem
    const usuario = await this.usuarioRepo.findById(idUsuario);
    const amigo = await this.usuarioRepo.findById(idAmigo);
    
    if (!usuario || !amigo) {
      throw new Error('Usuário ou amigo não encontrado');
    }

    const amizade = new Amizades(idUsuario, idAmigo, 'pendente');
    return await this.amizadesRepo.save(amizade);
  }

  /**
   * Realiza o checkout do carrinho, convertendo itens em transação
   * Regras:
   * - Verifica se o usuário tem saldo suficiente
   * - Verifica se os jogos ainda existem e têm preço válido
   * - Não permite comprar jogos que já possui na biblioteca
   * - Cria a transação e itens
   * - Adiciona jogos à biblioteca
   * - Debita o saldo do usuário
   * - Limpa o carrinho
   */
  async checkoutCart(idUsuario: number): Promise<Transacao> {
    // Busca itens do carrinho
    const itensCarrinho = await this.carrinhoRepo.findByUsuarioId(idUsuario);
    
    if (itensCarrinho.length === 0) {
      throw new Error('Carrinho vazio');
    }

    // Busca usuário
    const usuario = await this.usuarioRepo.findById(idUsuario);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Calcula valor total e valida jogos
    let valorTotal = 0;
    const jogosIds: number[] = [];

    for (const item of itensCarrinho) {
      const jogo = await this.jogoRepo.findById(item.id_jogo);
      
      if (!jogo) {
        throw new Error(`Jogo com ID ${item.id_jogo} não encontrado`);
      }

      // Verifica se já possui o jogo
      const jaPossui = await this.bibliotecaRepo.findByJogoAndUsuario(item.id_jogo, idUsuario);
      if (jaPossui) {
        throw new Error(`Você já possui o jogo: ${jogo.titulo}`);
      }

      valorTotal += jogo.preco;
      jogosIds.push(item.id_jogo);
    }

    // Verifica saldo
    if (usuario.saldo < valorTotal) {
      throw new Error('Saldo insuficiente');
    }

    // Cria transação
    const transacao = new Transacao(idUsuario, valorTotal);
    await this.transacaoRepo.save(transacao);

    // Cria itens da transação e adiciona à biblioteca
    for (const idJogo of jogosIds) {
      const itemTransacao = new ItemTransacao(idJogo, transacao.id_trans);
      await this.itemTransacaoRepo.save(itemTransacao);

      // Adiciona à biblioteca
      const biblioteca = new Biblioteca(idJogo, idUsuario, 0);
      await this.bibliotecaRepo.save(biblioteca);
    }

    // Debita saldo do usuário
    usuario.debitarSaldo(valorTotal);
    await this.usuarioRepo.update(usuario);

    // Limpa carrinho
    await this.carrinhoRepo.deleteAllByUsuario(idUsuario);

    return transacao;
  }

  /**
   * Retorna a biblioteca completa do usuário com informações dos jogos
   */
  async getLibrary(idUsuario: number): Promise<Biblioteca[]> {
    const usuario = await this.usuarioRepo.findById(idUsuario);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return await this.bibliotecaRepo.findByUsuarioId(idUsuario);
  }

  /**
   * Cria ou atualiza uma análise/review de um jogo
   * Regras:
   * - Usuário deve possuir o jogo na biblioteca
   * - Nota deve estar entre 0 e 10
   * - Se já existe análise, atualiza; senão, cria nova
   */
  async postReview(
    idJogo: number,
    idUsuario: number,
    nota: number,
    texto: string | null = null
  ): Promise<Analise> {
    // Valida nota
    if (nota < 0 || nota > 10) {
      throw new Error('Nota deve estar entre 0 e 10');
    }

    // Verifica se usuário possui o jogo
    const biblioteca = await this.bibliotecaRepo.findByJogoAndUsuario(idJogo, idUsuario);
    if (!biblioteca) {
      throw new Error('Você precisa possuir o jogo para fazer uma análise');
    }

    // Verifica se já existe análise
    const analiseExistente = await this.analiseRepo.findByJogoAndUsuario(idJogo, idUsuario);
    
    if (analiseExistente) {
      // Atualiza análise existente
      analiseExistente.atualizarNota(nota);
      if (texto !== null) {
        analiseExistente.atualizarTexto(texto);
      }
      return await this.analiseRepo.update(analiseExistente);
    } else {
      // Cria nova análise
      const analise = new Analise(idJogo, idUsuario, nota, texto);
      return await this.analiseRepo.save(analise);
    }
  }
}
