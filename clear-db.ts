import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('🗑️  Limpando banco de dados...\n');

  try {
    // Ordem: deletar dependentes primeiro
    await prisma.analise.deleteMany({});
    console.log('✅ Análises deletadas');

    await prisma.biblioteca.deleteMany({});
    console.log('✅ Biblioteca deletada');

    await prisma.carrinho.deleteMany({});
    console.log('✅ Carrinho deletado');

    await prisma.wishlist.deleteMany({});
    console.log('✅ Wishlist deletada');

    await prisma.amizades.deleteMany({});
    console.log('✅ Amizades deletadas');

    await prisma.itemTransacao.deleteMany({});
    console.log('✅ Itens de Transação deletados');

    await prisma.transacao.deleteMany({});
    console.log('✅ Transações deletadas');

    await prisma.usuario.deleteMany({});
    console.log('✅ Usuários deletados');

    await prisma.jogoTag.deleteMany({});
    console.log('✅ Associações Jogo-Tag deletadas');

    await prisma.jogoGenero.deleteMany({});
    console.log('✅ Associações Jogo-Gênero deletadas');

    await prisma.jogo.deleteMany({});
    console.log('✅ Jogos deletados');

    await prisma.tag.deleteMany({});
    console.log('✅ Tags deletadas');

    await prisma.genero.deleteMany({});
    console.log('✅ Gêneros deletados');

    await prisma.publicadora.deleteMany({});
    console.log('✅ Publicadoras deletadas');

    await prisma.desenvolvedor.deleteMany({});
    console.log('✅ Desenvolvedores deletados');

    console.log('\n✨ Banco de dados limpo com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar banco de dados:', error);
    throw error;
  }
}

clearDatabase()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

