'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_CORACOES = 4
const MINUTOS_REGENERAR = 120
const MOEDAS_POR_NIVEL = 120
const XP_BASE_POR_NIVEL = 100
const XP_INCREMENTO_POR_NIVEL = 40

interface ProgressoNivel {
  nivelAtual: number
  xpNoNivelAtual: number
  xpParaProximoNivel: number
  progresso: number
}

interface ResultadoGanhoXP {
  niveisSubidos: number
  moedasGanhas: number
  nivelAtual: number
  xpTotal: number
}

function xpNecessarioParaNivel(nivel: number) {
  return XP_BASE_POR_NIVEL + (nivel - 1) * XP_INCREMENTO_POR_NIVEL
}

function calcularProgressoNivel(xpTotal: number): ProgressoNivel {
  let nivelAtual = 1
  let xpRestante = xpTotal
  let xpParaProximoNivel = xpNecessarioParaNivel(nivelAtual)

  while (xpRestante >= xpParaProximoNivel) {
    xpRestante -= xpParaProximoNivel
    nivelAtual += 1
    xpParaProximoNivel = xpNecessarioParaNivel(nivelAtual)
  }

  return {
    nivelAtual,
    xpNoNivelAtual: xpRestante,
    xpParaProximoNivel,
    progresso: Math.round((xpRestante / xpParaProximoNivel) * 100),
  }
}

interface GamificacaoState {
  xpTotal: number
  gemas: number
  coracoes: number
  ultimoCoracao: number // timestamp ms do ultimo coracao perdido
  streak: number
  ultimaAtividade: string // YYYY-MM-DD

  ganharXP: (valor: number) => ResultadoGanhoXP
  perderCoracao: () => void
  ganharGema: (valor: number) => void
  gastarGema: (valor: number) => boolean
  verificarStreak: () => void
  regenerarCoracao: () => void
  minutosParaProximoCoracao: () => number
  getProgressoNivel: () => ProgressoNivel
}

export const useGamificacaoStore = create<GamificacaoState>()(
  persist(
    (set, get) => ({
      xpTotal: 0,
      gemas: 10000,
      coracoes: MAX_CORACOES,
      ultimoCoracao: 0,
      streak: 0,
      ultimaAtividade: '',

      ganharXP: (valor) => {
        const { xpTotal } = get()
        const progressoAntes = calcularProgressoNivel(xpTotal)
        const novoXpTotal = xpTotal + valor
        const progressoDepois = calcularProgressoNivel(novoXpTotal)
        const niveisSubidos = progressoDepois.nivelAtual - progressoAntes.nivelAtual
        const moedasGanhas = niveisSubidos > 0 ? niveisSubidos * MOEDAS_POR_NIVEL : 0

        set((s) => ({
          xpTotal: novoXpTotal,
          gemas: moedasGanhas > 0 ? s.gemas + moedasGanhas : s.gemas,
        }))

        return {
          niveisSubidos,
          moedasGanhas,
          nivelAtual: progressoDepois.nivelAtual,
          xpTotal: novoXpTotal,
        }
      },

      perderCoracao: () =>
        set((s) => ({
          coracoes: Math.max(0, s.coracoes - 1),
          ultimoCoracao: s.coracoes <= MAX_CORACOES ? Date.now() : s.ultimoCoracao,
        })),

      ganharGema: (valor) =>
        set((s) => ({ gemas: s.gemas + valor })),

      gastarGema: (valor) => {
        const { gemas } = get()
        if (gemas < valor) return false
        set((s) => ({ gemas: s.gemas - valor }))
        return true
      },

      verificarStreak: () => {
        const { ultimaAtividade, streak } = get()
        const hoje = new Date().toISOString().split('T')[0]
        const ontem = new Date(Date.now() - 86400000).toISOString().split('T')[0]

        if (ultimaAtividade === hoje) return

        if (ultimaAtividade === ontem) {
          set({ streak: streak + 1, ultimaAtividade: hoje })
        } else if (ultimaAtividade === '') {
          set({ streak: 1, ultimaAtividade: hoje })
        } else {
          set({ streak: 1, ultimaAtividade: hoje })
        }
      },

      regenerarCoracao: () => {
        const { coracoes, ultimoCoracao } = get()
        if (coracoes >= MAX_CORACOES) return

        const agora = Date.now()
        const msPorCoracao = MINUTOS_REGENERAR * 60 * 1000
        const coracoesGanhos = Math.floor((agora - ultimoCoracao) / msPorCoracao)

        if (coracoesGanhos > 0) {
          const novoTotal = Math.min(MAX_CORACOES, coracoes + coracoesGanhos)
          set({
            coracoes: novoTotal,
            ultimoCoracao: novoTotal >= MAX_CORACOES ? 0 : ultimoCoracao + coracoesGanhos * msPorCoracao,
          })
        }
      },

      minutosParaProximoCoracao: () => {
        const { coracoes, ultimoCoracao } = get()
        if (coracoes >= MAX_CORACOES) return 0
        const msPorCoracao = MINUTOS_REGENERAR * 60 * 1000
        const msPassados = Date.now() - ultimoCoracao
        const msRestantes = msPorCoracao - (msPassados % msPorCoracao)
        return Math.ceil(msRestantes / 60000)
      },

      getProgressoNivel: () => {
        const { xpTotal } = get()
        return calcularProgressoNivel(xpTotal)
      },
    }),
    {
      name: 'teenup-gamificacao',
      version: 4,
      migrate: (persistedState) => ({
        ...(persistedState as Record<string, unknown>),
        coracoes: MAX_CORACOES,
        ultimoCoracao: 0,
      }),
    }
  )
)
