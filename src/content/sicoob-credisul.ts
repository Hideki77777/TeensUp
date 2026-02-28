import type { Trilha } from '@/types'

const trilhaSicoobCredisul: Trilha = {
  slug: 'sicoob-credisul',
  titulo: 'Sicoob Credisul',
  descricao: 'Conheca a historia e missao da nossa cooperativa',
  cor: '#00AE9D',
  corClara: '#33C8BE',
  icone: 'landmark',
  totalLicoes: 4,
  unidades: [
    {
      id: 'sc-u1',
      titulo: 'Nossa Historia',
      descricao: 'De onde viemos e para onde vamos',
      licoes: [
        {
          id: 'sc-u1-l1',
          titulo: 'O que e a Sicoob Credisul?',
          tipo: 'TEORIA',
          xpReward: 10,
          gemasReward: 0,
          exercicios: [
            {
              id: 'sc-u1-l1-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que e a Sicoob Credisul?',
                opcoes: [
                  { texto: 'Uma cooperativa de credito que serve a comunidade local', correta: true },
                  { texto: 'Um banco privado com fins lucrativos', correta: false },
                  { texto: 'Uma financeira de emprestimos pessoais', correta: false },
                  { texto: 'Uma empresa de seguros', correta: false },
                ],
                explicacao: 'A Sicoob Credisul e uma cooperativa de credito pertencente aos proprios cooperados.',
              },
            },
            {
              id: 'sc-u1-l1-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'A Sicoob Credisul faz parte do maior sistema cooperativo de credito do Brasil.',
                correto: true,
                explicacao: 'Ela integra o Sistema Sicoob, com ampla presenca nacional.',
              },
            },
            {
              id: 'sc-u1-l1-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Na cooperativa, o usuario tambem e ___.',
                resposta: 'dono',
                opcoes: ['cliente', 'dono', 'funcionario', 'fornecedor'],
                explicacao: 'No cooperativismo, o cooperado participa como dono e usuario.',
              },
            },
          ],
        },
        {
          id: 'sc-u1-l2',
          titulo: 'Missao e Valores',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'sc-u1-l2-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual e a principal missao da cooperativa?',
                opcoes: [
                  { texto: 'Promover desenvolvimento financeiro e social dos cooperados', correta: true },
                  { texto: 'Maximizar lucro para investidores externos', correta: false },
                  { texto: 'Atender somente empresas grandes', correta: false },
                  { texto: 'Atuar apenas no digital', correta: false },
                ],
                explicacao: 'A missao cooperativista e gerar impacto positivo para pessoas e comunidade.',
              },
            },
            {
              id: 'sc-u1-l2-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Parte dos resultados pode ser investida em educacao e acao social.',
                correto: true,
                explicacao: 'Cooperativas aplicam recursos em iniciativas de formacao e impacto local.',
              },
            },
            {
              id: 'sc-u1-l2-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Cooperativismo acredita no poder do trabalho ___.',
                resposta: 'coletivo',
                opcoes: ['isolado', 'coletivo', 'individual', 'privado'],
                explicacao: 'A forca do cooperativismo esta na colaboracao entre pessoas.',
              },
            },
          ],
        },
        {
          id: 'sc-u1-l3',
          titulo: 'Como Participar da Cooperativa',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'sc-u1-l3-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual e o primeiro passo para participar mais da cooperativa?',
                opcoes: [
                  { texto: 'Participar das assembleias e votar', correta: true },
                  { texto: 'Apenas usar cartao de credito', correta: false },
                  { texto: 'Transferir todo salario para a conta', correta: false },
                  { texto: 'Indicar 10 pessoas por mes', correta: false },
                ],
                explicacao: 'As assembleias sao o principal espaco de decisao no cooperativismo.',
              },
            },
            {
              id: 'sc-u1-l3-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'O cooperado pode opinar sobre temas de gestao.',
                correto: true,
                explicacao: 'A gestao democratica e uma caracteristica central da cooperativa.',
              },
            },
            {
              id: 'sc-u1-l3-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Participar das ___ fortalece a transparencia e a governanca.',
                resposta: 'assembleias',
                opcoes: ['campanhas', 'assembleias', 'promocoes', 'rifas'],
                explicacao: 'Assembleias permitem acompanhamento e decisao conjunta.',
              },
            },
          ],
        },
        {
          id: 'sc-u1-l4',
          titulo: 'Beneficios para o Jovem Cooperado',
          tipo: 'DESAFIO',
          xpReward: 20,
          gemasReward: 10,
          exercicios: [
            {
              id: 'sc-u1-l4-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual beneficio e comum para jovens cooperados?',
                opcoes: [
                  { texto: 'Educacao financeira e produtos adequados ao perfil', correta: true },
                  { texto: 'Renda fixa garantida mensal', correta: false },
                  { texto: 'Isencao total para sempre', correta: false },
                  { texto: 'Credito sem analise', correta: false },
                ],
                explicacao: 'Jovens cooperados costumam ter produtos especificos e orientacao financeira.',
              },
            },
            {
              id: 'sc-u1-l4-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Participar da cooperativa pode melhorar o planejamento de metas futuras.',
                correto: true,
                explicacao: 'Com conhecimento e disciplina, fica mais facil planejar estudos e carreira.',
              },
            },
            {
              id: 'sc-u1-l4-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Jovens com educacao financeira tomam decisoes mais ___.',
                resposta: 'conscientes',
                opcoes: ['rapidas', 'conscientes', 'arriscadas', 'impulsivas'],
                explicacao: 'Educacao financeira melhora escolhas no dia a dia.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default trilhaSicoobCredisul
