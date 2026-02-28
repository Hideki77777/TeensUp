import type { Trilha } from '@/types'

const trilhaEducacaoFinanceira: Trilha = {
  slug: 'educacao-financeira',
  titulo: 'Educação Financeira',
  descricao: 'Aprenda a cuidar do seu dinheiro com sabedoria',
  cor: '#EE6A29',
  corClara: '#FF8C50',
  icone: 'wallet',
  totalLicoes: 10,
  unidades: [
    {
      id: 'ef-u1',
      titulo: 'Fundamentos do Dinheiro',
      descricao: 'Entenda o que é dinheiro e por que ele é importante',
      licoes: [
        {
          id: 'ef-u1-l1',
          titulo: 'O que é dinheiro?',
          tipo: 'TEORIA',
          xpReward: 10,
          gemasReward: 0,
          exercicios: [
            {
              id: 'ef-u1-l1-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que é dinheiro?',
                opcoes: [
                  { texto: 'Um meio de troca aceito para pagar por bens e serviços', correta: true },
                  { texto: 'Apenas as notas e moedas que carregamos no bolso', correta: false },
                  { texto: 'Um presente que recebemos do governo', correta: false },
                  { texto: 'Um tipo de investimento seguro', correta: false },
                ],
                explicacao: 'Dinheiro é qualquer meio aceito pela sociedade para trocar por produtos e serviços. Hoje inclui notas, moedas, Pix e cartões.',
              },
            },
            {
              id: 'ef-u1-l1-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Antigamente, as pessoas trocavam produtos por produtos, sem usar dinheiro.',
                correto: true,
                explicacao: 'Isso se chama "escambo". Antes do dinheiro existir, as pessoas trocavam diretamente o que produziam: comida, ferramentas, tecidos.',
              },
            },
            {
              id: 'ef-u1-l1-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'O dinheiro funciona como um ___ de troca entre as pessoas.',
                resposta: 'meio',
                opcoes: ['tipo', 'meio', 'jeito', 'produto'],
                explicacao: 'Dinheiro é um meio de troca - algo que todos aceitam em troca de bens e serviços.',
              },
            },
          ],
        },
        {
          id: 'ef-u1-l2',
          titulo: 'Receita e Despesa',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'ef-u1-l2-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que é receita financeira?',
                opcoes: [
                  { texto: 'Todo dinheiro que entra, como salário ou mesada', correta: true },
                  { texto: 'Todo dinheiro que você gasta', correta: false },
                  { texto: 'Uma lista de compras do mercado', correta: false },
                  { texto: 'O valor das suas dívidas', correta: false },
                ],
                explicacao: 'Receita é tudo que você recebe: mesada, salário, dinheiro de trabalho etc. Despesa é tudo que você gasta.',
              },
            },
            {
              id: 'ef-u1-l2-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Se você gasta mais do que recebe, está tendo um prejuízo.',
                correto: true,
                explicacao: 'Quando as despesas superam a receita, há déficit (prejuízo). Quando a receita é maior, há superávit (lucro). O ideal é sempre ter equilíbrio ou superávit.',
              },
            },
            {
              id: 'ef-u1-l2-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Para ter saúde financeira, suas ___ devem ser menores que sua receita.',
                resposta: 'despesas',
                opcoes: ['economias', 'despesas', 'dívidas', 'receitas'],
                explicacao: 'Controlar as despesas para que fiquem abaixo da receita é o primeiro passo para a saúde financeira.',
              },
            },
          ],
        },
        {
          id: 'ef-u1-l3',
          titulo: 'Necessidades vs Desejos',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'ef-u1-l3-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual dos itens abaixo é uma NECESSIDADE?',
                opcoes: [
                  { texto: 'Alimentação e moradia', correta: true },
                  { texto: 'Último modelo de smartphone', correta: false },
                  { texto: 'Assinatura de streaming', correta: false },
                  { texto: 'Roupas de grife', correta: false },
                ],
                explicacao: 'Necessidades são essenciais para sobreviver: comida, saúde, moradia, educação. Desejos são coisas que queremos, mas podemos viver sem.',
              },
            },
            {
              id: 'ef-u1-l3-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Antes de comprar algo, é importante perguntar: "Eu preciso ou apenas quero isso?"',
                correto: true,
                explicacao: 'Essa reflexão simples ajuda a evitar compras por impulso e a usar o dinheiro de forma mais inteligente.',
              },
            },
            {
              id: 'ef-u1-l3-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Compras feitas por impulso, sem planejamento, são chamadas de compras por ___.',
                resposta: 'impulso',
                opcoes: ['impulso', 'vontade', 'necessidade', 'hábito'],
                explicacao: 'Compras por impulso são um grande obstáculo para a saúde financeira. Planejamento e reflexão ajudam a evitá-las.',
              },
            },
          ],
        },
        {
          id: 'ef-u1-l4',
          titulo: 'Criando seu Orçamento',
          tipo: 'DESAFIO',
          xpReward: 20,
          gemasReward: 10,
          exercicios: [
            {
              id: 'ef-u1-l4-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que é um orçamento pessoal?',
                opcoes: [
                  { texto: 'Um planejamento de quanto você vai ganhar e gastar', correta: true },
                  { texto: 'Um empréstimo do banco', correta: false },
                  { texto: 'Uma conta de investimentos', correta: false },
                  { texto: 'Um cartão de crédito pré-pago', correta: false },
                ],
                explicacao: 'Orçamento pessoal é um plano financeiro que organiza sua receita e suas despesas, ajudando a não gastar mais do que recebe.',
              },
            },
            {
              id: 'ef-u1-l4-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'A regra 50-30-20 sugere: 50% para necessidades, 30% para desejos e 20% para poupança.',
                correto: true,
                explicacao: 'A regra 50-30-20 é uma forma popular de organizar o dinheiro. 50% para necessidades básicas, 30% para lazer e desejos, e 20% para guardar ou investir.',
              },
            },
            {
              id: 'ef-u1-l4-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Anotar todos os seus gastos é o primeiro passo para criar um bom ___.',
                resposta: 'orçamento',
                opcoes: ['orçamento', 'empréstimo', 'investimento', 'salário'],
                explicacao: 'Sem saber para onde vai o seu dinheiro, é impossível controlá-lo. Anotar os gastos revela hábitos e oportunidades de economizar.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'ef-u2',
      titulo: 'Guardar e Fazer Render',
      descricao: 'Faça seu dinheiro trabalhar por você',
      licoes: [
        {
          id: 'ef-u2-l1',
          titulo: 'Por que poupar?',
          tipo: 'TEORIA',
          xpReward: 10,
          gemasReward: 0,
          exercicios: [
            {
              id: 'ef-u2-l1-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual é a principal vantagem de poupar dinheiro?',
                opcoes: [
                  { texto: 'Ter reserva para emergências e realizar sonhos', correta: true },
                  { texto: 'Não precisar trabalhar mais', correta: false },
                  { texto: 'Ficar rico rapidamente', correta: false },
                  { texto: 'Receber descontos em lojas', correta: false },
                ],
                explicacao: 'Poupar cria uma reserva de emergência (para imprevistos) e permite realizar objetivos maiores, como uma viagem ou um curso.',
              },
            },
            {
              id: 'ef-u2-l1-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'É possível começar a poupar mesmo com pouco dinheiro.',
                correto: true,
                explicacao: 'O hábito de poupar é mais importante que o valor. Guardar R$ 10 por semana já cria o hábito e, ao longo do tempo, faz diferença.',
              },
            },
            {
              id: 'ef-u2-l1-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Especialistas recomendam ter uma ___ de emergência equivalente a 3 a 6 meses de gastos.',
                resposta: 'reserva',
                opcoes: ['dívida', 'reserva', 'renda', 'despesa'],
                explicacao: 'A reserva de emergência é um valor guardado para situações inesperadas, como perder o emprego ou uma doença. Deve ser de fácil acesso.',
              },
            },
          ],
        },
        {
          id: 'ef-u2-l2',
          titulo: 'Poupança e RDC Flexível',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'ef-u2-l2-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'O que é a Poupança?',
                opcoes: [
                  { texto: 'Uma conta que rende juros sobre o valor guardado', correta: true },
                  { texto: 'Um cartão de crédito sem juros', correta: false },
                  { texto: 'Um empréstimo a longo prazo', correta: false },
                  { texto: 'Uma apólice de seguro', correta: false },
                ],
                explicacao: 'A poupança é a aplicação financeira mais popular do Brasil. O dinheiro fica guardado e rende juros mensalmente, com total segurança.',
              },
            },
            {
              id: 'ef-u2-l2-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'O RDC Flexível da Sicoob Credisul permite resgatar o dinheiro a qualquer momento.',
                correto: true,
                explicacao: 'O RDC Flexível combina a rentabilidade de um investimento com a liberdade de retirar o dinheiro quando precisar, sem perder os rendimentos.',
              },
            },
            {
              id: 'ef-u2-l2-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Quanto mais tempo o dinheiro fica aplicado, mais ___ ele rende.',
                resposta: 'juros',
                opcoes: ['riscos', 'juros', 'dívidas', 'impostos'],
                explicacao: 'Os juros compostos fazem o dinheiro crescer de forma exponencial com o tempo. Quanto mais cedo você começa, mais seu dinheiro trabalha por você.',
              },
            },
          ],
        },
        {
          id: 'ef-u2-l3',
          titulo: 'Juros: amigo ou inimigo?',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'ef-u2-l3-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Quando os juros são seus AMIGOS?',
                opcoes: [
                  { texto: 'Quando você investe e eles fazem seu dinheiro crescer', correta: true },
                  { texto: 'Quando você paga a fatura do cartão com atraso', correta: false },
                  { texto: 'Quando você faz um empréstimo', correta: false },
                  { texto: 'Quando você parcela uma compra no cartão', correta: false },
                ],
                explicacao: 'Juros são seus amigos quando trabalham PARA você (investimentos) e inimigos quando você deve PARA alguém (dívidas, cartão atrasado).',
              },
            },
            {
              id: 'ef-u2-l3-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'O cartão de crédito pode ter juros de mais de 300% ao ano se não for pago.',
                correto: true,
                explicacao: 'O rotativo do cartão de crédito é um dos juros mais altos do mercado. Pagar apenas o mínimo pode fazer uma dívida pequena se tornar enorme.',
              },
            },
            {
              id: 'ef-u2-l3-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Juros que incidem sobre juros são chamados de juros ___.',
                resposta: 'compostos',
                opcoes: ['simples', 'compostos', 'dobrados', 'especiais'],
                explicacao: 'Juros compostos (juros sobre juros) são poderosos tanto a favor quanto contra você. Em investimentos, aceleram seu crescimento. Em dívidas, aceleram o problema.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default trilhaEducacaoFinanceira



