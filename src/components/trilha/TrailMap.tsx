'use client'

import { useState } from 'react'
import type { Trilha, Licao, StatusLicao } from '@/types'
import { useProgressoStore } from '@/store/progressoStore'
import { getLicoesOrdenadas } from '@/content/trilhas'
import LessonNode from './LessonNode'
import LessonTooltip from './LessonTooltip'
import { Lock } from 'lucide-react'
import { TrilhaIcon } from '@/components/ui/AppIcon'

interface TrailMapProps {
  trilhas: Trilha[]
}

export default function TrailMap({ trilhas }: TrailMapProps) {
  const { getLicaoStatus } = useProgressoStore()
  const [tooltipLicao, setTooltipLicao] = useState<Licao | null>(null)
  const [tooltipStatus, setTooltipStatus] = useState<StatusLicao>('locked')
  const [tooltipTrilhaSlug, setTooltipTrilhaSlug] = useState('')
  const [tooltipNumero, setTooltipNumero] = useState(0)

  // Lista flat de todas as lições em ordem, com referência à trilha
  const todasLicoes = trilhas.flatMap((trilha) =>
    getLicoesOrdenadas(trilha).map((l) => ({ ...l, trilha }))
  )

  // Itens do mapa: header de trilha, banner de unidade e lição
  type Item =
    | { type: 'trilha-header'; trilha: Trilha }
    | { type: 'unidade-banner'; titulo: string; descricao: string; trilha: Trilha; numero: number }
    | { type: 'licao'; licao: Licao; trilha: Trilha; globalIndex: number }

  const items: Item[] = []
  let globalIndex = 0

  trilhas.forEach((trilha) => {
    items.push({ type: 'trilha-header', trilha })
    trilha.unidades.forEach((unidade, ui) => {
      items.push({
        type: 'unidade-banner',
        titulo: unidade.titulo,
        descricao: unidade.descricao,
        trilha,
        numero: ui + 1,
      })
      unidade.licoes.forEach((licao) => {
        items.push({ type: 'licao', licao, trilha, globalIndex })
        globalIndex++
      })
    })
  })

  const handleNodeClick = (licao: Licao, trilhaSlug: string, status: StatusLicao, numero: number) => {
    if (status === 'locked') return
    if (tooltipLicao?.id === licao.id) {
      setTooltipLicao(null)
      return
    }
    setTooltipLicao(licao)
    setTooltipStatus(status)
    setTooltipTrilhaSlug(trilhaSlug)
    setTooltipNumero(numero)
  }

  let licaoCounter = 0

  return (
    <div className="relative w-full pb-32">
      <div className="flex flex-col items-center">
        {items.map((item) => {
          // Header da trilha
          if (item.type === 'trilha-header') {
            return (
              <div key={`header-${item.trilha.slug}`} className="w-full px-4 mt-6 mb-0">
                <div
                  className="flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: item.trilha.cor + '18',
                    border: `1px solid ${item.trilha.cor}44`,
                  }}
                >
                  <span className="text-2xl">
                    <TrilhaIcon slug={item.trilha.slug} size={22} className="text-white" />
                  </span>
                  <div>
                    <p className="text-white font-black text-sm leading-tight">{item.trilha.titulo}</p>
                    <p className="text-xs mt-0.5" style={{ color: item.trilha.corClara }}>
                      {item.trilha.descricao}
                    </p>
                  </div>
                </div>
              </div>
            )
          }

          // Banner de unidade
          if (item.type === 'unidade-banner') {
            return (
              <div key={`unit-${item.trilha.slug}-${item.numero}`} className="w-full px-4 mt-3 mb-0">
                <div
                  className="rounded-xl px-4 py-2"
                  style={{ backgroundColor: item.trilha.cor + '14' }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: item.trilha.cor }}
                  >
                    Unidade {item.numero} - {item.titulo}
                  </p>
                </div>
              </div>
            )
          }

          // Nó de lição
          licaoCounter++
          const numero = licaoCounter
          const { licao, trilha, globalIndex: gIdx } = item

          const anteriorId = gIdx > 0 ? todasLicoes[gIdx - 1].licao.id : undefined
          const status = getLicaoStatus(licao.id, anteriorId)
          const isActive = status === 'available'
          const isTooltipOpen = tooltipLicao?.id === licao.id

          // Zigue-zague: -40 / 0 / +40 / 0
          const offsetX = [-40, 0, 40, 0][gIdx % 4]

          return (
            <div
              key={licao.id}
              className="relative flex items-center justify-center w-full"
              style={{ height: '88px', zIndex: isTooltipOpen ? 60 : 5 }}
            >
              <div className="relative" style={{ marginLeft: `${offsetX}px` }}>
                <LessonNode
                  status={status}
                  tipo={licao.tipo}
                  cor={trilha.cor}
                  onClick={() => handleNodeClick(licao, trilha.slug, status, numero)}
                  isActive={isActive}
                />

                {isTooltipOpen && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[70]">
                    <LessonTooltip
                      licao={licao}
                      trilhaSlug={tooltipTrilhaSlug}
                      status={tooltipStatus}
                      licaoNumero={tooltipNumero}
                      totalLicoes={todasLicoes.length}
                      open={isTooltipOpen}
                      onClose={() => setTooltipLicao(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}

        <div className="w-full px-4 mt-4 mb-8">
          <div className="rounded-3xl border border-[#355166] bg-[#10232E]/75 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
            <div className="mx-auto w-fit rounded-md bg-[#344D5E] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#AFC5D0]">
              A seguir
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <Lock size={18} className="text-white/90" />
              <p className="text-white text-3xl font-black leading-none">Seção 4</p>
            </div>

            <p className="mt-3 text-center text-[#7A9BA8] text-base leading-relaxed font-semibold">
              Use frases em conversas sobre tópicos do dia a dia.
            </p>

            <button
              type="button"
              className="mt-4 w-full h-11 rounded-2xl border border-[#355166] bg-transparent text-[#4FC3FF] text-[15px] font-black uppercase tracking-wide"
            >
              Quer pular pra cá?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


