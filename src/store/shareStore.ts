'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useRankingStore } from '@/store/rankingStore'

const XP_RECOMPENSA = 40
const LIMITE_DIARIO = 3

function gerarCodigoConvite() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

interface ResultadoCompartilhamento {
  ok: boolean
  mensagem: string
}

interface ShareState {
  codigoConvite: string
  totalCompartilhamentos: number
  compartilhamentosHoje: number
  dataControle: string

  registrarCompartilhamento: () => ResultadoCompartilhamento
  podeGanharRecompensaHoje: () => boolean
  getLimiteDiario: () => number
}

export const useShareStore = create<ShareState>()(
  persist(
    (set, get) => ({
      codigoConvite: gerarCodigoConvite(),
      totalCompartilhamentos: 0,
      compartilhamentosHoje: 0,
      dataControle: '',

      registrarCompartilhamento: () => {
        const hoje = new Date().toISOString().split('T')[0]
        const state = get()

        if (state.dataControle !== hoje) {
          set({ dataControle: hoje, compartilhamentosHoje: 0 })
        }

        const atualizado = get()
        if (atualizado.compartilhamentosHoje >= LIMITE_DIARIO) {
          return {
            ok: false,
            mensagem: `Limite diário de ${LIMITE_DIARIO} recompensas de compartilhamento atingido.`,
          }
        }

        const resultadoXp = useGamificacaoStore.getState().ganharXP(XP_RECOMPENSA)
        useRankingStore.getState().registrarResultado('compartilhamento')

        set((s) => ({
          totalCompartilhamentos: s.totalCompartilhamentos + 1,
          compartilhamentosHoje: s.compartilhamentosHoje + 1,
          dataControle: hoje,
        }))

        return {
          ok: true,
          mensagem:
            resultadoXp.moedasGanhas > 0
              ? `Compartilhamento confirmado! +${XP_RECOMPENSA} XP e +${resultadoXp.moedasGanhas} moedas (subida de nível).`
              : `Compartilhamento confirmado! +${XP_RECOMPENSA} XP.`,
        }
      },

      podeGanharRecompensaHoje: () => {
        const hoje = new Date().toISOString().split('T')[0]
        const { dataControle, compartilhamentosHoje } = get()
        if (dataControle !== hoje) return true
        return compartilhamentosHoje < LIMITE_DIARIO
      },

      getLimiteDiario: () => LIMITE_DIARIO,
    }),
    { name: 'teenup-share', version: 1 }
  )
)
