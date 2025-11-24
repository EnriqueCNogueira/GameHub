-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "saldo" REAL NOT NULL,
    "data_criacao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Desenvolvedor" (
    "id_dev" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pais_origem" TEXT NOT NULL,
    "site" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Publicadora" (
    "id_publi" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pais_origem" TEXT NOT NULL,
    "site" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genero" (
    "id_gen" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id_tag" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id_jogo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "data_lanc" TEXT NOT NULL,
    "id_dev" INTEGER NOT NULL,
    "id_publi" INTEGER NOT NULL,
    CONSTRAINT "Jogo_id_dev_fkey" FOREIGN KEY ("id_dev") REFERENCES "Desenvolvedor" ("id_dev") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jogo_id_publi_fkey" FOREIGN KEY ("id_publi") REFERENCES "Publicadora" ("id_publi") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id_trans" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "data_trans" TEXT NOT NULL,
    "valor_total" REAL NOT NULL,
    CONSTRAINT "Transacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item_Transacao" (
    "id_jogo" INTEGER NOT NULL,
    "id_transacao" INTEGER NOT NULL,

    PRIMARY KEY ("id_jogo", "id_transacao"),
    CONSTRAINT "Item_Transacao_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_Transacao_id_transacao_fkey" FOREIGN KEY ("id_transacao") REFERENCES "Transacao" ("id_trans") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jogo_tag" (
    "id_jogo" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    PRIMARY KEY ("id_jogo", "id_tag"),
    CONSTRAINT "jogo_tag_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jogo_tag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag" ("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jogo_genero" (
    "id_jogo" INTEGER NOT NULL,
    "id_gen" INTEGER NOT NULL,

    PRIMARY KEY ("id_jogo", "id_gen"),
    CONSTRAINT "jogo_genero_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jogo_genero_id_gen_fkey" FOREIGN KEY ("id_gen") REFERENCES "Genero" ("id_gen") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "analise" (
    "id_jogo" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nota" REAL NOT NULL,
    "texto" TEXT,
    "data_analise" TEXT NOT NULL,

    PRIMARY KEY ("id_jogo", "id_usuario"),
    CONSTRAINT "analise_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "analise_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "biblioteca" (
    "id_jogo" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "tempo_jogado" REAL NOT NULL,
    "data_compra" TEXT NOT NULL,

    PRIMARY KEY ("id_jogo", "id_usuario"),
    CONSTRAINT "biblioteca_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "biblioteca_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "carrinho" (
    "id_jogo" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "data_adicao" TEXT NOT NULL,

    PRIMARY KEY ("id_jogo", "id_usuario"),
    CONSTRAINT "carrinho_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "carrinho_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id_jogo" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "data_adicao" TEXT NOT NULL,

    PRIMARY KEY ("id_jogo", "id_usuario"),
    CONSTRAINT "wishlist_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "Jogo" ("id_jogo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "wishlist_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "amizades" (
    "id_usuario" INTEGER NOT NULL,
    "id_amigo" INTEGER NOT NULL,
    "data_amizade" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("id_usuario", "id_amigo"),
    CONSTRAINT "amizades_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "amizades_id_amigo_fkey" FOREIGN KEY ("id_amigo") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "amizades_id_amigo_id_usuario_key" ON "amizades"("id_amigo", "id_usuario");
