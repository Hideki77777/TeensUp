'use client'

import { useParams } from 'next/navigation'
import { getLicao } from '@/content/trilhas'
import ExercicioShell from '@/components/exercicios/ExercicioShell'

export default function LicaoPage() {
  const { trailSlug, lessonId } = useParams<{ trailSlug: string; lessonId: string }>()

  const resultado = getLicao(trailSlug, lessonId)

  if (!resultado) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Lição não encontrada.</p>
      </div>
    )
  }

  return <ExercicioShell licao={resultado.licao} trilhaSlug={trailSlug} />
}
