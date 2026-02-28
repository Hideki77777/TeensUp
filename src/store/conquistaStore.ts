'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ConquistaDesbloqueada } from '@/types'

interface ConquistaState {
  conquistasDesbloqueadas: ConquistaDesbloqueada[]
  novasConquistas: string[]  // IDs para mostrar no popup

  desbloquearConquista: (conquistaId: string) => void
  jaDesbloqueou: (conquistaId: string) => boolean
  limparNovas: () => void
}

export const useConquistaStore = create<ConquistaState>()(
  persist(
    (set, get) => ({
      conquistasDesbloqueadas: [],
      novasConquistas: [],

      desbloquearConquista: (conquistaId) => {
        if (get().jaDesbloqueou(conquistaId)) return

        set((s) => ({
          conquistasDesbloqueadas: [
            ...s.conquistasDesbloqueadas,
            {
              conquistaId,
              desbloqueadaEm: new Date().toISOString(),
            },
          ],
          novasConquistas: [...s.novasConquistas, conquistaId],
        }))
      },

      jaDesbloqueou: (conquistaId) =>
        get().conquistasDesbloqueadas.some((c) => c.conquistaId === conquistaId),

      limparNovas: () => set({ novasConquistas: [] }),
    }),
    {
      name: 'teenup-conquistas',
    }
  )
)
