import type { Trilha } from '@/types'

const trilhaProdutosJovem: Trilha = {
  slug: 'produtos-jovem',
  titulo: 'Produtos Jovem',
  descricao: 'Conheca os produtos financeiros feitos para voce',
  cor: '#49479D',
  corClara: '#7F7EC4',
  icone: 'target',
  totalLicoes: 4,
  unidades: [
    {
      id: 'pj-u1',
      titulo: 'Produtos para Jovens',
      descricao: 'Poupanca, RDC Flexivel, cartao e mais',
      licoes: [
        {
          id: 'pj-u1-l1',
          titulo: 'Conta Jovem Sicoob',
          tipo: 'TEORIA',
          xpReward: 10,
          gemasReward: 0,
          exercicios: [
            {
              id: 'pj-u1-l1-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual e a principal vantagem de ter uma conta jovem?',
                opcoes: [
                  { texto: 'Acesso a produtos financeiros com condicoes especiais', correta: true },
                  { texto: 'Limite ilimitado no cartao', correta: false },
                  { texto: 'Nao precisar guardar dinheiro', correta: false },
                  { texto: 'Emprestimos sem pagamento', correta: false },
                ],
                explicacao: 'A conta jovem ajuda no inicio da vida financeira com recursos adequados ao perfil.',
              },
            },
            {
              id: 'pj-u1-l1-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Menores de 18 anos podem ter conta com autorizacao dos responsaveis.',
                correto: true,
                explicacao: 'Com autorizacao, jovens podem iniciar educacao financeira cedo.',
              },
            },
            {
              id: 'pj-u1-l1-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Com planejamento, o jovem aprende a usar dinheiro com ___.',
                resposta: 'responsabilidade',
                opcoes: ['pressa', 'responsabilidade', 'medo', 'impulso'],
                explicacao: 'Educacao financeira ajuda no uso consciente do dinheiro.',
              },
            },
          ],
        },
        {
          id: 'pj-u1-l2',
          titulo: 'Poupanca vs RDC Flexivel',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'pj-u1-l2-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual diferenca comum entre Poupanca e RDC Flexivel?',
                opcoes: [
                  { texto: 'O RDC pode render mais mantendo liquidez', correta: true },
                  { texto: 'A poupanca sempre rende mais', correta: false },
                  { texto: 'RDC nao pode resgatar', correta: false },
                  { texto: 'Sao identicos em tudo', correta: false },
                ],
                explicacao: 'O RDC Flexivel costuma oferecer melhor rendimento com acesso ao dinheiro.',
              },
            },
            {
              id: 'pj-u1-l2-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Reserva de emergencia precisa ser de facil acesso.',
                correto: true,
                explicacao: 'Uma reserva so funciona se puder ser usada em imprevistos rapidamente.',
              },
            },
            {
              id: 'pj-u1-l2-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Guardar dinheiro todo mes cria o habito de ___.',
                resposta: 'poupar',
                opcoes: ['gastar', 'poupar', 'parcelar', 'emprestar'],
                explicacao: 'Constancia e mais importante que valor alto no inicio.',
              },
            },
          ],
        },
        {
          id: 'pj-u1-l3',
          titulo: 'Cartao com Responsabilidade',
          tipo: 'PRATICA',
          xpReward: 15,
          gemasReward: 5,
          exercicios: [
            {
              id: 'pj-u1-l3-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual pratica ajuda no uso saudavel do cartao?',
                opcoes: [
                  { texto: 'Acompanhar gastos e pagar fatura em dia', correta: true },
                  { texto: 'Pagar sempre o minimo', correta: false },
                  { texto: 'Parcelar tudo sem controle', correta: false },
                  { texto: 'Ignorar limite disponivel', correta: false },
                ],
                explicacao: 'Controle de gastos e pagamento em dia evitam juros altos.',
              },
            },
            {
              id: 'pj-u1-l3-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Pagamento atrasado de fatura pode gerar juros elevados.',
                correto: true,
                explicacao: 'Juros de cartao atrasado costumam ser altos e prejudicam o planejamento.',
              },
            },
            {
              id: 'pj-u1-l3-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Antes de comprar, compare o valor da parcela com seu ___.',
                resposta: 'orcamento',
                opcoes: ['humor', 'orcamento', 'desconto', 'limite maximo'],
                explicacao: 'A compra precisa caber no planejamento mensal.',
              },
            },
          ],
        },
        {
          id: 'pj-u1-l4',
          titulo: 'Planejando Metas de Curto Prazo',
          tipo: 'DESAFIO',
          xpReward: 20,
          gemasReward: 10,
          exercicios: [
            {
              id: 'pj-u1-l4-e1',
              tipo: 'MULTIPLA_ESCOLHA',
              xpReward: 5,
              conteudo: {
                pergunta: 'Qual meta e de curto prazo?',
                opcoes: [
                  { texto: 'Juntar para um curso nos proximos 6 meses', correta: true },
                  { texto: 'Aposentadoria em 30 anos', correta: false },
                  { texto: 'Comprar uma casa em 20 anos', correta: false },
                  { texto: 'Quitar financiamento em 15 anos', correta: false },
                ],
                explicacao: 'Metas de curto prazo geralmente sao para alguns meses ate 1 ano.',
              },
            },
            {
              id: 'pj-u1-l4-e2',
              tipo: 'VERDADEIRO_FALSO',
              xpReward: 5,
              conteudo: {
                afirmacao: 'Dividir uma meta em etapas menores facilita manter o foco.',
                correto: true,
                explicacao: 'Metas menores tornam o progresso visivel e aumentam motivacao.',
              },
            },
            {
              id: 'pj-u1-l4-e3',
              tipo: 'COMPLETAR_FRASE',
              xpReward: 5,
              conteudo: {
                frase: 'Uma meta eficiente deve ser clara, realista e ter ___.',
                resposta: 'prazo',
                opcoes: ['sorte', 'prazo', 'risco', 'pressa'],
                explicacao: 'Definir prazo ajuda a medir evolucao e disciplina.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default trilhaProdutosJovem
