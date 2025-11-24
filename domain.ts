// domain.ts - Classes de domínio do GameHub

// --- Entidades Principais ---

export class Usuario {
  id_usuario: number
  nome: string
  email: string
  senha: string
  saldo: number
  data_criacao: string

  constructor(
    nome: string,
    email: string,
    senha: string,
    saldo: number = 0,
    data_criacao?: string
  ) {
    this.nome = nome
    this.email = email
    this.senha = senha
    this.saldo = saldo
    this.data_criacao = data_criacao || new Date().toISOString()
  }

  adicionarSaldo(valor: number): void {
    if (valor > 0) {
      this.saldo += valor
    }
  }

  debitarSaldo(valor: number): boolean {
    if (valor > 0 && this.saldo >= valor) {
      this.saldo -= valor
      return true
    }
    return false
  }
}

export class Desenvolvedor {
  id_dev: number
  nome: string
  pais_origem: string
  site: string

  constructor(
    nome: string,
    pais_origem: string,
    site: string
  ) {
    this.nome = nome
    this.pais_origem = pais_origem
    this.site = site
  }
}

export class Publicadora {
  id_publi: number
  nome: string
  pais_origem: string
  site: string

  constructor(
    nome: string,
    pais_origem: string,
    site: string
  ) {
    this.nome = nome
    this.pais_origem = pais_origem
    this.site = site
  }
}

export class Genero {
  id_gen: number
  nome: string

  constructor(nome: string) {
    this.nome = nome
  }
}

export class Tag {
  id_tag: number
  nome: string

  constructor(nome: string) {
    this.nome = nome
  }
}

export class Jogo {
  id_jogo: number
  titulo: string
  descricao: string
  preco: number
  data_lanc: string
  id_dev: number
  id_publi: number

  constructor(
    titulo: string,
    descricao: string,
    preco: number,
    data_lanc: string,
    id_dev: number,
    id_publi: number
  ) {
    this.titulo = titulo
    this.descricao = descricao
    this.preco = preco
    this.data_lanc = data_lanc
    this.id_dev = id_dev
    this.id_publi = id_publi
  }

  aplicarDesconto(percentual: number): void {
    if (percentual > 0 && percentual <= 100) {
      this.preco = this.preco * (1 - percentual / 100)
    }
  }
}

export class Transacao {
  id_trans: number
  id_usuario: number
  data_trans: string
  valor_total: number

  constructor(
    id_usuario: number,
    valor_total: number,
    data_trans?: string
  ) {
    this.id_usuario = id_usuario
    this.valor_total = valor_total
    this.data_trans = data_trans || new Date().toISOString()
  }
}

// --- Tabelas de Junção/M-N (Compostas) ---

export class ItemTransacao {
  id_jogo: number
  id_transacao: number

  constructor(id_jogo: number, id_transacao: number) {
    this.id_jogo = id_jogo
    this.id_transacao = id_transacao
  }
}

export class JogoTag {
  id_jogo: number
  id_tag: number

  constructor(id_jogo: number, id_tag: number) {
    this.id_jogo = id_jogo
    this.id_tag = id_tag
  }
}

export class JogoGenero {
  id_jogo: number
  id_gen: number

  constructor(id_jogo: number, id_gen: number) {
    this.id_jogo = id_jogo
    this.id_gen = id_gen
  }
}

export class Analise {
  id_jogo: number
  id_usuario: number
  nota: number
  texto: string | null
  data_analise: string

  constructor(
    id_jogo: number,
    id_usuario: number,
    nota: number,
    texto: string | null = null,
    data_analise?: string
  ) {
    this.id_jogo = id_jogo
    this.id_usuario = id_usuario
    this.nota = nota
    this.texto = texto
    this.data_analise = data_analise || new Date().toISOString()
  }

  atualizarNota(novaNota: number): void {
    if (novaNota >= 0 && novaNota <= 10) {
      this.nota = novaNota
    }
  }

  atualizarTexto(novoTexto: string): void {
    this.texto = novoTexto
  }
}

export class Biblioteca {
  id_jogo: number
  id_usuario: number
  tempo_jogado: number
  data_compra: string

  constructor(
    id_jogo: number,
    id_usuario: number,
    tempo_jogado: number = 0,
    data_compra?: string
  ) {
    this.id_jogo = id_jogo
    this.id_usuario = id_usuario
    this.tempo_jogado = tempo_jogado
    this.data_compra = data_compra || new Date().toISOString()
  }

  adicionarTempoJogado(horas: number): void {
    if (horas > 0) {
      this.tempo_jogado += horas
    }
  }
}

export class Carrinho {
  id_jogo: number
  id_usuario: number
  data_adicao: string

  constructor(
    id_jogo: number,
    id_usuario: number,
    data_adicao?: string
  ) {
    this.id_jogo = id_jogo
    this.id_usuario = id_usuario
    this.data_adicao = data_adicao || new Date().toISOString()
  }
}

export class Wishlist {
  id_jogo: number
  id_usuario: number
  data_adicao: string

  constructor(
    id_jogo: number,
    id_usuario: number,
    data_adicao?: string
  ) {
    this.id_jogo = id_jogo
    this.id_usuario = id_usuario
    this.data_adicao = data_adicao || new Date().toISOString()
  }
}

export class Amizades {
  id_usuario: number
  id_amigo: number
  data_amizade: string
  status: string

  constructor(
    id_usuario: number,
    id_amigo: number,
    status: string,
    data_amizade?: string
  ) {
    this.id_usuario = id_usuario
    this.id_amigo = id_amigo
    this.status = status
    this.data_amizade = data_amizade || new Date().toISOString()
  }

  aceitar(): void {
    this.status = 'aceita'
  }

  rejeitar(): void {
    this.status = 'rejeitada'
  }

  pendente(): void {
    this.status = 'pendente'
  }
}

