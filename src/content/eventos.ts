export interface Evento {
  id: string
  titulo: string
  local: string
  data: string
  moedasPresenca: number
  status: string
}

export const EVENTOS: Evento[] = [
  {
    id: 'ev-1',
    titulo: 'Workshop de Educacao Financeira',
    local: 'PA Teens - Sala Criativa',
    data: '05/03 - 19h',
    moedasPresenca: 120,
    status: 'Inscricoes abertas',
  },
  {
    id: 'ev-2',
    titulo: 'Hackathon Cooperativo Teen',
    local: 'PA Teens - Arena Tech',
    data: '12/03 - 08h',
    moedasPresenca: 250,
    status: 'Vagas limitadas',
  },
  {
    id: 'ev-3',
    titulo: 'Talk: Carreira e Inovacao',
    local: 'PA Teens - Auditorio',
    data: '20/03 - 18h30',
    moedasPresenca: 90,
    status: 'Em breve',
  },
]
