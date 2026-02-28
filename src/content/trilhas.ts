import type { Trilha } from '@/types'
import trilhaEducacaoFinanceira from './educacao-financeira'
import trilhaCooperativismo from './cooperativismo'
import trilhaSicoobCredisul from './sicoob-credisul'
import trilhaProdutosJovem from './produtos-jovem'

export const TRILHAS: Trilha[] = [
  trilhaEducacaoFinanceira,
  trilhaCooperativismo,
  trilhaSicoobCredisul,
  trilhaProdutosJovem,
]

export function getTrilha(slug: string): Trilha | undefined {
  return TRILHAS.find((t) => t.slug === slug)
}

export function getLicao(trilhaSlug: string, licaoId: string) {
  const trilha = getTrilha(trilhaSlug)
  if (!trilha) return null

  for (const unidade of trilha.unidades) {
    const licao = unidade.licoes.find((l) => l.id === licaoId)
    if (licao) return { licao, unidade, trilha }
  }
  return null
}

export function getLicoesOrdenadas(trilha: Trilha) {
  return trilha.unidades.flatMap((unidade) =>
    unidade.licoes.map((licao) => ({ licao, unidade }))
  )
}

export function getProximaLicao(trilha: Trilha, licaoAtualId: string) {
  const todas = getLicoesOrdenadas(trilha)
  const idx = todas.findIndex((l) => l.licao.id === licaoAtualId)
  return todas[idx + 1] ?? null
}
