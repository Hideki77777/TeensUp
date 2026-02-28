'use client'

import { useEffect } from 'react'
import { useConquistaStore } from '@/store/conquistaStore'
import { useProgressoStore } from '@/store/progressoStore'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useGamificacaoStore as useGami } from '@/store/gamificacaoStore'

/**
 * Hook que monitora o estado da aplicação e desbloqueia conquistas automaticamente.
 * Deve ser montado em um componente que persista entre navegações (ex: layout).
 */
export function useConquistas() {
  const { desbloquearConquista, novasConquistas, limparNovas } = useConquistaStore()
  const { totalLicoesCompletas, licoesCompletas } = useProgressoStore()
  const { streak, xpTotal } = useGami()

  useEffect(() => {
    const total = totalLicoesCompletas()

    // Primeira lição
    if (total >= 1) desbloquearConquista('primeira_licao')

    // 5 e 10 lições
    if (total >= 5) desbloquearConquista('5_licoes')
    if (total >= 10) desbloquearConquista('10_licoes')

    // Streak
    if (streak >= 3) desbloquearConquista('streak_3')
    if (streak >= 7) desbloquearConquista('streak_7')

    // Lição perfeita
    const temPerfeita = Object.values(licoesCompletas).some((p) => p.perfeita)
    if (temPerfeita) desbloquearConquista('licao_perfeita')

  }, [licoesCompletas, streak, desbloquearConquista, totalLicoesCompletas])

  return { novasConquistas, limparNovas }
}
