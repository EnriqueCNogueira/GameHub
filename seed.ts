import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Iniciando seed de dados estáticos...\n');

  // ========== DESENVOLVEDORES ==========
  console.log('📦 Criando desenvolvedores...');
  const desenvolvedores = [
    { nome: 'Nintendo EAD', pais_origem: 'Japão', site: 'nintendo.com' },
    { nome: 'Namco (Project Soul)', pais_origem: 'Japão', site: 'bandainamcoent.com' },
    { nome: 'Larian Studios', pais_origem: 'Bélgica', site: 'larian.com' },
    { nome: 'Retro Studios', pais_origem: 'Estados Unidos', site: 'retrostudios.com' },
    { nome: 'Nintendo', pais_origem: 'Japão', site: 'nintendo.com' },
    { nome: 'Nintendo EPD', pais_origem: 'Japão', site: 'nintendo.com' },
    { nome: 'Nintendo EAD Tokyo', pais_origem: 'Japão', site: 'nintendo.com' },
    { nome: 'Filip Victor', pais_origem: 'Bulgária', site: 'github.com' },
    { nome: 'Sony Computer Entertainment', pais_origem: 'Japão', site: 'playstation.com' },
    { nome: 'Konami (KCEJ)', pais_origem: 'Japão', site: 'konami.com' }
  ];

  const devs = await Promise.all(
    desenvolvedores.map(dev => 
      prisma.desenvolvedor.create({ data: dev })
    )
  );
  console.log(`✅ ${devs.length} desenvolvedores criados\n`);

  // ========== PUBLICADORAS ==========
  console.log('📦 Criando publicadoras...');
  const publicadoras = [
    { nome: 'Nintendo', pais_origem: 'Japão', site: 'nintendo.com' },
    { nome: 'Namco', pais_origem: 'Japão', site: 'bandainamcoent.com' },
    { nome: 'Larian Studios', pais_origem: 'Bélgica', site: 'larian.com' },
    { nome: 'Filip Victor', pais_origem: 'Bulgária', site: 'github.com' },
    { nome: 'Sony Computer Entertainment', pais_origem: 'Japão', site: 'playstation.com' },
    { nome: 'Konami', pais_origem: 'Japão', site: 'konami.com' }
  ];

  const pubs = await Promise.all(
    publicadoras.map(pub => 
      prisma.publicadora.create({ data: pub })
    )
  );
  console.log(`✅ ${pubs.length} publicadoras criadas\n`);

  // ========== GÊNEROS ==========
  console.log('📦 Criando gêneros...');
  const generos = [
    'Action',
    'Adventure',
    'Fighting',
    'RPG',
    'Strategy',
    'FPS',
    'Racing',
    'Simulation'
  ];

  const gens = await Promise.all(
    generos.map(nome => 
      prisma.genero.create({ data: { nome } })
    )
  );
  console.log(`✅ ${gens.length} gêneros criados\n`);

  // ========== TAGS ==========
  console.log('📦 Criando tags...');
  const tags = [
    'Singleplayer',
    'Multiplayer',
    'PvP',
    'Co-op',
    'Turn-Based',
    'Fantasy',
    'Sci-Fi',
    'Stealth',
    'Open World',
    'Sandbox'
  ];

  const tagObjs = await Promise.all(
    tags.map(nome => 
      prisma.tag.create({ data: { nome } })
    )
  );
  console.log(`✅ ${tagObjs.length} tags criadas\n`);

  // ========== JOGOS ==========
  console.log('📦 Criando jogos...');
  
  // Função auxiliar para encontrar IDs
  const findDev = (nome: string) => devs.find(d => d.nome === nome)?.id_dev || devs[0].id_dev;
  const findPub = (nome: string) => pubs.find(p => p.nome === nome)?.id_publi || pubs[0].id_publi;
  const findGen = (nome: string) => gens.find(g => g.nome === nome)?.id_gen;
  const findTag = (nome: string) => tagObjs.find(t => t.nome === nome)?.id_tag;

  const jogos = [
    {
      titulo: 'The Legend of Zelda: Ocarina of Time',
      descricao: 'Um épico RPG de ação e aventura onde você controla Link em uma jornada para salvar Hyrule. Considerado um dos melhores jogos de todos os tempos.',
      preco: 19.99,
      data_lanc: '1998-11-21',
      devNome: 'Nintendo EAD',
      pubNome: 'Nintendo',
      generos: ['Action', 'Adventure'],
      tags: ['Singleplayer', 'Fantasy']
    },
    {
      titulo: 'Soulcalibur (1998)',
      descricao: 'Jogo de luta em 3D com uma variedade de personagens únicos e sistema de combate profundo. Revolucionou os jogos de luta com gráficos impressionantes.',
      preco: 14.99,
      data_lanc: '1998-07-30',
      devNome: 'Namco (Project Soul)',
      pubNome: 'Namco',
      generos: ['Fighting'],
      tags: ['Singleplayer', 'Multiplayer', 'PvP']
    },
    {
      titulo: 'Soulcalibur',
      descricao: 'A versão aprimorada do clássico jogo de luta, com novos personagens e mecânicas de combate refinadas.',
      preco: 14.99,
      data_lanc: '1999-08-05',
      devNome: 'Namco (Project Soul)',
      pubNome: 'Namco',
      generos: ['Fighting'],
      tags: ['Singleplayer', 'Multiplayer', 'PvP']
    },
    {
      titulo: 'Baldur\'s Gate III',
      descricao: 'RPG épico baseado em D&D com combate por turnos, narrativa profunda e múltiplas escolhas que afetam o mundo. Um dos RPGs mais aclamados da década.',
      preco: 249.90,
      data_lanc: '2023-08-03',
      devNome: 'Larian Studios',
      pubNome: 'Larian Studios',
      generos: ['RPG', 'Strategy'],
      tags: ['Singleplayer', 'Multiplayer', 'Co-op', 'Turn-Based', 'Fantasy']
    },
    {
      titulo: 'Metroid Prime',
      descricao: 'Aventura em primeira pessoa que combina exploração, combate e quebra-cabeças. Samus Aran explora o planeta Tallon IV em busca de artefatos.',
      preco: 49.99,
      data_lanc: '2002-11-17',
      devNome: 'Retro Studios',
      pubNome: 'Nintendo',
      generos: ['FPS', 'Action', 'Adventure'],
      tags: ['Singleplayer', 'Sci-Fi']
    },
    {
      titulo: 'Perfect Dark',
      descricao: 'FPS futurista com modo single player e multiplayer extenso. Joanna Dark investiga uma conspiração corporativa em um mundo cyberpunk.',
      preco: 9.99,
      data_lanc: '2000-05-22',
      devNome: 'Nintendo',
      pubNome: 'Nintendo',
      generos: ['FPS'],
      tags: ['Singleplayer', 'Multiplayer', 'Sci-Fi', 'Stealth']
    },
    {
      titulo: 'Super Mario Odyssey',
      descricao: 'Aventura em mundo aberto onde Mario viaja por diferentes reinos usando seu chapéu mágico. Coleta Power Moons e salva a Princesa Peach.',
      preco: 299.90,
      data_lanc: '2017-10-27',
      devNome: 'Nintendo EPD',
      pubNome: 'Nintendo',
      generos: ['Adventure'],
      tags: ['Singleplayer', 'Co-op', 'Open World', 'Sandbox']
    },
    {
      titulo: 'Super Mario Galaxy 2',
      descricao: 'Sequência do aclamado Super Mario Galaxy com novos níveis, power-ups e mecânicas. Mario viaja por galáxias em busca de Power Stars.',
      preco: 19.99,
      data_lanc: '2010-05-23',
      devNome: 'Nintendo EAD Tokyo',
      pubNome: 'Nintendo',
      generos: ['Adventure'],
      tags: ['Singleplayer', 'Co-op']
    },
    {
      titulo: 'Super Mario Galaxy',
      descricao: 'Aventura espacial revolucionária onde Mario explora galáxias únicas com física de gravidade. Um dos jogos mais inovadores da série.',
      preco: 19.99,
      data_lanc: '2007-11-01',
      devNome: 'Nintendo EAD Tokyo',
      pubNome: 'Nintendo',
      generos: ['Adventure'],
      tags: ['Singleplayer', 'Co-op']
    },
    {
      titulo: 'The Legend of Zelda: Breath of the Wild',
      descricao: 'Aventura em mundo aberto épica onde Link explora Hyrule pós-apocalíptico. Liberdade total para explorar, resolver quebra-cabeças e derrotar chefes.',
      preco: 299.90,
      data_lanc: '2017-03-03',
      devNome: 'Nintendo EPD',
      pubNome: 'Nintendo',
      generos: ['Action', 'Adventure'],
      tags: ['Singleplayer', 'Open World', 'Sandbox', 'Fantasy']
    },
    {
      titulo: 'Half-Life 2: Update',
      descricao: 'Versão aprimorada do clássico FPS com melhorias visuais e correções. Gordon Freeman luta contra os Combine em City 17.',
      preco: 9.99,
      data_lanc: '2015-05-26',
      devNome: 'Filip Victor',
      pubNome: 'Filip Victor',
      generos: ['FPS'],
      tags: ['Singleplayer', 'Sci-Fi']
    },
    {
      titulo: 'The Legend of Zelda: Tears of the Kingdom',
      descricao: 'Sequência de Breath of the Wild com novas mecânicas de construção e exploração vertical. Link explora o céu e as profundezas de Hyrule.',
      preco: 349.90,
      data_lanc: '2023-05-12',
      devNome: 'Nintendo EPD',
      pubNome: 'Nintendo',
      generos: ['Action', 'Adventure'],
      tags: ['Singleplayer', 'Open World', 'Sandbox', 'Fantasy']
    },
    {
      titulo: 'Tekken 3',
      descricao: 'Jogo de luta em 3D com sistema de combate profundo e roster diversificado. Um dos melhores jogos de luta da era PlayStation.',
      preco: 9.99,
      data_lanc: '1997-03-20',
      devNome: 'Namco',
      pubNome: 'Namco',
      generos: ['Fighting'],
      tags: ['Singleplayer', 'Multiplayer', 'PvP']
    },
    {
      titulo: 'Gran Turismo',
      descricao: 'Simulador de corrida realista com física avançada e grande variedade de carros e pistas. O simulador de corrida mais aclamado.',
      preco: 9.99,
      data_lanc: '1997-12-23',
      devNome: 'Sony Computer Entertainment',
      pubNome: 'Sony Computer Entertainment',
      generos: ['Racing', 'Simulation'],
      tags: ['Singleplayer', 'Multiplayer']
    },
    {
      titulo: 'Metal Gear Solid 2: Sons of Liberty',
      descricao: 'Ação e stealth onde você controla Solid Snake e Raiden em uma missão para impedir um grupo terrorista. Narrativa complexa e gameplay furtivo.',
      preco: 19.99,
      data_lanc: '2001-11-13',
      devNome: 'Konami (KCEJ)',
      pubNome: 'Konami',
      generos: ['Action', 'Adventure'],
      tags: ['Singleplayer', 'Stealth', 'Sci-Fi']
    }
  ];

  const jogosCriados = [];
  for (const jogoData of jogos) {
    const jogo = await prisma.jogo.create({
      data: {
        titulo: jogoData.titulo,
        descricao: jogoData.descricao,
        preco: jogoData.preco,
        data_lanc: jogoData.data_lanc,
        id_dev: findDev(jogoData.devNome),
        id_publi: findPub(jogoData.pubNome)
      }
    });

    // Associar gêneros
    for (const generoNome of jogoData.generos) {
      const genero = findGen(generoNome);
      if (genero) {
        await prisma.jogoGenero.create({
          data: {
            id_jogo: jogo.id_jogo,
            id_gen: genero
          }
        });
      }
    }

    // Associar tags
    for (const tagNome of jogoData.tags) {
      const tag = findTag(tagNome);
      if (tag) {
        await prisma.jogoTag.create({
          data: {
            id_jogo: jogo.id_jogo,
            id_tag: tag
          }
        });
      }
    }

    jogosCriados.push(jogo);
  }
  console.log(`✅ ${jogosCriados.length} jogos criados com associações\n`);

  console.log('✨ Seed concluído com sucesso!');
  console.log(`\n📊 Resumo:`);
  console.log(`   - ${devs.length} Desenvolvedores`);
  console.log(`   - ${pubs.length} Publicadoras`);
  console.log(`   - ${gens.length} Gêneros`);
  console.log(`   - ${tagObjs.length} Tags`);
  console.log(`   - ${jogosCriados.length} Jogos`);
}

seed()
  .catch((error) => {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

