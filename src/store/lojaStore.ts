'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useRankingStore } from '@/store/rankingStore'

interface CompraInfo {
  quantidade: number
  ultimaCompraEm: string
}

interface ComprarItemResult {
  ok: boolean
  mensagem: string
}

interface LojaState {
  compras: Record<string, CompraInfo>
  comprarItem: (itemId: string, custo: number, nomeItem: string) => ComprarItemResult
  quantidadeComprada: (itemId: string) => number
}

export const useLojaStore = create<LojaState>()(
  persist(
    (set, get) => ({
      compras: {},

      comprarItem: (itemId, custo, nomeItem) => {
        const conseguiuDebitar = useGamificacaoStore.getState().gastarGema(custo)
        if (!conseguiuDebitar) {
          return { ok: false, mensagem: 'Saldo insuficiente para esta compra.' }
        }

        set((state) => {
          const atual = state.compras[itemId]
          return {
            compras: {
              ...state.compras,
              [itemId]: {
                quantidade: (atual?.quantidade ?? 0) + 1,
                ultimaCompraEm: new Date().toISOString(),
              },
            },
          }
        })

        useRankingStore.getState().registrarResultado('compra')

        return { ok: true, mensagem: `${nomeItem} resgatado com sucesso!` }
      },

      quantidadeComprada: (itemId) => get().compras[itemId]?.quantidade ?? 0,
    }),
    { name: 'teenup-loja' }
  )
)
