'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useRankingStore } from '@/store/rankingStore'

interface RegistrarPresencaResult {
  ok: boolean
  mensagem: string
}

interface EventosState {
  presencas: Record<string, string>
  registrarPresenca: (eventoId: string, xpPresenca: number) => RegistrarPresencaResult
  jaRegistrou: (eventoId: string) => boolean
  totalPresencas: () => number
}

export const useEventosStore = create<EventosState>()(
  persist(
    (set, get) => ({
      presencas: {},

      registrarPresenca: (eventoId, xpPresenca) => {
        if (get().presencas[eventoId]) {
          return { ok: false, mensagem: 'Presença já registrada nesse evento.' }
        }

        const resultadoXp = useGamificacaoStore.getState().ganharXP(xpPresenca)
        useRankingStore.getState().registrarResultado('evento')
        set((state) => ({
          presencas: {
            ...state.presencas,
            [eventoId]: new Date().toISOString(),
          },
        }))

        return {
          ok: true,
          mensagem:
            resultadoXp.moedasGanhas > 0
              ? `Presença confirmada! +${xpPresenca} XP e +${resultadoXp.moedasGanhas} moedas (subida de nível).`
              : `Presença confirmada! +${xpPresenca} XP.`,
        }
      },

      jaRegistrou: (eventoId) => Boolean(get().presencas[eventoId]),

      totalPresencas: () => Object.keys(get().presencas).length,
    }),
    { name: 'teenup-eventos' }
  )
)
