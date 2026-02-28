'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressoLicao } from '@/types'

interface ProgressoState {
  licoesCompletas: Record<string, ProgressoLicao>

  completarLicao: (licaoId: string, pontuacao: number) => void
  getLicaoStatus: (licaoId: string, licaoAnteriorId?: string) => 'locked' | 'available' | 'complete'
  getProgresso: (licaoId: string) => ProgressoLicao | null
  isPrimeiraLicao: (licaoId: string) => boolean
  totalLicoesCompletas: () => number
  resetarTudo: () => void
}

export const useProgressoStore = create<ProgressoState>()(
  persist(
    (set, get) => ({
      licoesCompletas: {},

      completarLicao: (licaoId, pontuacao) =>
        set((s) => ({
          licoesCompletas: {
            ...s.licoesCompletas,
            [licaoId]: {
              pontuacao,
              concluidaEm: new Date().toISOString(),
              perfeita: pontuacao === 100,
            },
          },
        })),

      getLicaoStatus: (licaoId, licaoAnteriorId) => {
        const { licoesCompletas } = get()

        if (licoesCompletas[licaoId]) return 'complete'

        // Primeira lição da trilha é sempre disponível
        if (!licaoAnteriorId) return 'available'

        // Disponível se a anterior foi concluída
        if (licoesCompletas[licaoAnteriorId]) return 'available'

        return 'locked'
      },

      getProgresso: (licaoId) => {
        return get().licoesCompletas[licaoId] ?? null
      },

      isPrimeiraLicao: (licaoId) => {
        return !Object.keys(get().licoesCompletas).length && true
      },

      totalLicoesCompletas: () => {
        return Object.keys(get().licoesCompletas).length
      },

      resetarTudo: () => set({ licoesCompletas: {} }),
    }),
    {
      name: 'teenup-progresso',
    }
  )
)
