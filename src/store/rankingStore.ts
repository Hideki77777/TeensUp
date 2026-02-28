'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LigaNome = 'Bronze' | 'Prata' | 'Ouro' | 'Platina' | 'Diamante'

interface Liga {
  nome: LigaNome
  min: number
  max: number | null
  cor: string
}

const LIGAS: Liga[] = [
  { nome: 'Bronze', min: 0, max: 1099, cor: '#CD7F32' },
  { nome: 'Prata', min: 1100, max: 1399, cor: '#C0C0C0' },
  { nome: 'Ouro', min: 1400, max: 1699, cor: '#FFD700' },
  { nome: 'Platina', min: 1700, max: 1999, cor: '#7FFFD4' },
  { nome: 'Diamante', min: 2000, max: null, cor: '#5CC8FF' },
]

export interface RegistroElo {
  id: string
  motivo: string
  delta: number
  em: string
}

interface RankingState {
  elo: number
  atividades: number
  historico: RegistroElo[]

  ganharElo: (delta: number, motivo: string) => void
  registrarResultado: (tipo: 'licao' | 'evento' | 'compra' | 'compartilhamento', perfeito?: boolean) => void
  ligaAtual: () => Liga
  progressoLiga: () => number
}

function getLigaPorElo(elo: number) {
  const liga = LIGAS.find((item) => elo >= item.min && (item.max === null || elo <= item.max))
  return liga ?? LIGAS[0]
}

export const useRankingStore = create<RankingState>()(
  persist(
    (set, get) => ({
      elo: 1000,
      atividades: 0,
      historico: [],

      ganharElo: (delta, motivo) =>
        set((state) => ({
          elo: Math.max(0, state.elo + delta),
          atividades: state.atividades + 1,
          historico: [
            {
              id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              motivo,
              delta,
              em: new Date().toISOString(),
            },
            ...state.historico,
          ].slice(0, 20),
        })),

      registrarResultado: (tipo, perfeito = false) => {
        if (tipo === 'evento') {
          get().ganharElo(18, 'Presenca em evento')
          return
        }

        if (tipo === 'compra') {
          get().ganharElo(4, 'Resgate na loja')
          return
        }

        if (tipo === 'compartilhamento') {
          get().ganharElo(10, 'Compartilhou com amigo')
          return
        }

        const ganho = perfeito ? 36 : 24
        get().ganharElo(ganho, perfeito ? 'Licao perfeita' : 'Licao concluida')
      },

      ligaAtual: () => getLigaPorElo(get().elo),

      progressoLiga: () => {
        const { elo } = get()
        const liga = getLigaPorElo(elo)
        if (liga.max === null) return 100
        const progresso = ((elo - liga.min) / (liga.max - liga.min + 1)) * 100
        return Math.max(0, Math.min(100, Math.round(progresso)))
      },
    }),
    { name: 'teenup-ranking', version: 1 }
  )
)
