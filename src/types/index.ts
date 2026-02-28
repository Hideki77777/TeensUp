// Exercícios

export type TipoExercicio =
  | 'MULTIPLA_ESCOLHA'
  | 'VERDADEIRO_FALSO'
  | 'COMPLETAR_FRASE'
  | 'ASSOCIAR_PARES'
  | 'ORDENAR_PASSOS'

export type TipoLicao = 'TEORIA' | 'PRATICA' | 'DESAFIO' | 'CHEFE'

export type StatusLicao = 'locked' | 'available' | 'complete'

export interface OpcaoEscolha {
  texto: string
  correta: boolean
}

export interface MultiplaEscolhaConteudo {
  pergunta: string
  opcoes: OpcaoEscolha[]
  explicacao: string
  imagemUrl?: string
}

export interface VerdadeiroFalsoConteudo {
  afirmacao: string
  correto: boolean
  explicacao: string
}

export interface CompletarFraseConteudo {
  frase: string // "A poupança é uma forma de ___ dinheiro"
  resposta: string // "guardar"
  opcoes: string[] // ["gastar", "guardar", "perder", "investir"]
  explicacao: string
}

export interface AssociarParesConteudo {
  instrucao: string
  pares: { esquerda: string; direita: string }[]
}

export interface OrdenarPassosConteudo {
  instrucao: string
  passos: string[] // ordem embaralhada
  ordemCorreta: number[] // índices na ordem correta
}

export type ConteudoExercicio =
  | MultiplaEscolhaConteudo
  | VerdadeiroFalsoConteudo
  | CompletarFraseConteudo
  | AssociarParesConteudo
  | OrdenarPassosConteudo

export interface Exercicio {
  id: string
  tipo: TipoExercicio
  xpReward: number
  conteudo: ConteudoExercicio
}

// Estrutura de conteúdo

export interface Licao {
  id: string
  titulo: string
  tipo: TipoLicao
  xpReward: number
  gemasReward: number
  exercicios: Exercicio[]
}

export interface Unidade {
  id: string
  titulo: string
  descricao: string
  licoes: Licao[]
}

export interface Trilha {
  slug: string
  titulo: string
  descricao: string
  cor: string // hex: "#EE6A29"
  corClara: string // hex: para gradientes
  icone: string // emoji
  totalLicoes: number
  unidades: Unidade[]
}

// Gamificação

export interface ProgressoLicao {
  pontuacao: number // 0-100 (% de acertos)
  concluidaEm: string // ISO date string
  perfeita: boolean // 100% de acertos
}

export interface Conquista {
  id: string
  titulo: string
  descricao: string
  icone: string // emoji
  xpReward: number
}

export interface ConquistaDesbloqueada {
  conquistaId: string
  desbloqueadaEm: string
}

// Estado de sessão da lição

export interface RespostaExercicio {
  exercicioId: string
  correta: boolean
  tentativas: number
}
