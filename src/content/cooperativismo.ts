import type { Trilha } from '@/types'

const trilhaCooperativismo: Trilha = {
  slug: 'cooperativismo',
  titulo: 'Cooperativismo',
  descricao: 'Descubra o poder de agir junto em cooperação',
  cor: '#7DB61C',
  corClara: '#A0D843',
  icone: 'handshake',
  totalLicoes: 4,
  unidades: [
    {
      id: 'coop-u1',
      titulo: 'O que é Cooperativismo',
      descricao: 'Entenda os princípios e valores do cooperativismo',
      licoes: [
        {
          id: 'coop-u1-l1',
          titulo: 'O que é uma Cooperativa?',
          tipo: 'TEORIA',
          xpReward: 10,
          gemasReward: 0,
          exercicios: [
            {
              id: 'coop-u1-l1-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que é uma cooperativa?',
                opcoes: [
                  { texto: 'Uma associação de pessoas com objetivos comuns, gerida democraticamente', correta: true },
                  { texto: 'Uma empresa com apenas um dono', correta: false },
                  { texto: 'Um banco público do governo', correta: false },
                  { texto: 'Uma organização sem fins lucrativos de caridade', correta: false },
                ],
                explicacao: 'Cooperativa é uma organização formada por pessoas que se unem voluntariamente para alcançar objetivos comuns, com gestão democrática - cada cooperado tem um voto.',
              },
            },
            {
              id: 'coop-u1-l1-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Em uma cooperativa, os membros são ao mesmo tempo donos e usuários dos serviços.',
                correto: true,
                explicacao: 'O cooperado é o dono da cooperativa E o usuário dos seus serviços. - diferente de um banco comum, onde os clientes não têm poder de decisão.',
              },
            },
            {
              id: 'coop-u1-l1-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'No cooperativismo, cada membro tem direito a ___ voto, independente do valor investido.',
                resposta: 'um',
                opcoes: ['um', 'dois', 'nenhum', 'vários'],
                explicacao: 'O princípio "um cooperado, um voto" garante a igualdade entre todos os membros, independente de quanto cada um investiu.',
              },
            },
          ],
        },
        {
          id: 'coop-u1-l2',
          titulo: 'Os 7 Princípios',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'coop-u1-l2-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual é o número oficial de princípios do cooperativismo?',
                opcoes: [
                  { texto: '7 princípios', correta: true },
                  { texto: '5 princípios', correta: false },
                  { texto: '10 princípios', correta: false },
                  { texto: '3 princípios', correta: false },
                ],
                explicacao: 'São 7 os princípios cooperativistas: Adesão voluntária, Gestão democrática, Participação econômica, Autonomia, Educação, Cooperação entre cooperativas e Interesse pela comunidade.',
              },
            },
            {
              id: 'coop-u1-l2-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Qualquer pessoa pode entrar ou sair de uma cooperativa livremente.',
                correto: true,
                explicacao: 'O princípio da "adesão voluntária e livre" garante que ninguém é obrigado a entrar ou ficar em uma cooperativa. A porta está sempre aberta.',
              },
            },
            {
              id: 'coop-u1-l2-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'As sobras (lucros) de uma cooperativa são distribuídas entre os ___ proporcionalmente ao uso.',
                resposta: 'cooperados',
                opcoes: ['diretores', 'cooperados', 'funcionários', 'bancos'],
                explicacao: 'Em uma cooperativa, as sobras (resultado positivo) pertencem aos cooperados e são devolvidas proporcionalmente ao quanto cada um utilizou os serviços.',
              },
            },
          ],
        },
        {
          id: 'coop-u1-l3',
          titulo: 'Cooperativa vs Banco',
          tipo: 'DESAFIO',
          xpReward: 20,
          gemasReward: 10,
          exercicios: [
            {
              id: 'coop-u1-l3-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual a principal diferença entre uma cooperativa de crédito e um banco?',
                opcoes: [
                  { texto: 'Na cooperativa, os clientes são os donos e participam das decisões', correta: true },
                  { texto: 'A cooperativa cobra juros maiores que os bancos', correta: false },
                  { texto: 'Bancos oferecem mais segurança para o dinheiro', correta: false },
                  { texto: 'Cooperativas só aceitam pessoas com muito dinheiro', correta: false },
                ],
                explicacao: 'Na cooperativa você é cooperado (dono), não apenas cliente. Você vota nas decisões, compartilha os resultados e tem taxas geralmente melhores.',
              },
            },
            {
              id: 'coop-u1-l3-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'As cooperativas de crédito no Brasil são reguladas e fiscalizadas pelo Banco Central.',
                correto: true,
                explicacao: 'Sim! Cooperativas de crédito são instituições financeiras reguladas pelo Banco Central, com a mesma segurança jurídica dos bancos tradicionais.',
              },
            },
            {
              id: 'coop-u1-l3-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'O lucro de um banco vai para os ___, enquanto as sobras de uma cooperativa vão para os cooperados.',
                resposta: 'acionistas',
                opcoes: ['acionistas', 'diretores', 'governos', 'clientes'],
                explicacao: 'Em bancos, o lucro vai para quem tem ações (acionistas). Nas cooperativas, as sobras retornam para quem usa os serviços - os próprios cooperados.',
              },
            },
          ],
        },
        {
          id: 'coop-u1-l4',
          titulo: 'Impacto na Comunidade',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'coop-u1-l4-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Como uma cooperativa fortalece a comunidade local?',
                opcoes: [
                  { texto: 'Reinvestindo resultados e apoiando projetos locais', correta: true },
                  { texto: 'Enviando todo o lucro para investidores externos', correta: false },
                  { texto: 'Atuando apenas em grandes capitais', correta: false },
                  { texto: 'Oferecendo serviços somente para empresas', correta: false },
                ],
                explicacao: 'Cooperativas costumam manter os recursos na própria região, apoiando educação, negócios locais e iniciativas sociais.',
              },
            },
            {
              id: 'coop-u1-l4-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'O cooperativismo também promove educação financeira para os cooperados.',
                correto: true,
                explicacao: 'Educação e formação fazem parte dos princípios cooperativistas e ajudam as pessoas a tomarem melhores decisões.',
              },
            },
            {
              id: 'coop-u1-l4-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'No cooperativismo, crescer junto e gerar ___ para todos é prioridade.',
                resposta: 'valor',
                opcoes: ['valor', 'dívida', 'risco', 'custo'],
                explicacao: 'A ideia central é gerar valor compartilhado para cooperados e comunidade.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default trilhaCooperativismo



