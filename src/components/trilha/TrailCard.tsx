'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Trilha } from '@/types'
import { useProgressoStore } from '@/store/progressoStore'
import { getLicoesOrdenadas } from '@/content/trilhas'
import ProgressBar from '@/components/ui/ProgressBar'
import { Lock } from 'lucide-react'
import { TrilhaIcon } from '@/components/ui/AppIcon'

interface TrailCardProps {
  trilha: Trilha
  index: number
  unlocked?: boolean
}

export default function TrailCard({ trilha, index, unlocked = true }: TrailCardProps) {
  const { licoesCompletas } = useProgressoStore()

  const todasLicoes = getLicoesOrdenadas(trilha)
  const completas = todasLicoes.filter(({ licao }) => licoesCompletas[licao.id]).length
  const progresso = todasLicoes.length > 0 ? Math.round((completas / todasLicoes.length) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={unlocked ? `/trilhas/${trilha.slug}` : '#'}>
        <div
          className={`
            relative rounded-2xl p-4 overflow-hidden
            ${unlocked ? 'cursor-pointer active:scale-98' : 'cursor-not-allowed opacity-60'}
          `}
          style={{ backgroundColor: unlocked ? trilha.cor + '22' : '#1A2B33', borderLeft: `4px solid ${unlocked ? trilha.cor : '#243540'}` }}
        >
          {/* Bg decorativo */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-10 select-none pointer-events-none"
          >
            <TrilhaIcon slug={trilha.slug} size={52} className="text-white/80" />
          </div>

          <div className="flex items-start gap-3">
            {/* Ícone */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: unlocked ? trilha.cor : '#243540' }}
            >
              {unlocked ? (
                <TrilhaIcon slug={trilha.slug} size={22} className="text-white" />
              ) : (
                <Lock size={20} className="text-[#7A9BA8]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base leading-tight">{trilha.titulo}</h3>
              <p className="text-[#7A9BA8] text-xs mt-0.5 line-clamp-2">{trilha.descricao}</p>

              {unlocked && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#7A9BA8]">{completas} de {todasLicoes.length} lições</span>
                    <span className="text-xs font-bold" style={{ color: trilha.cor }}>{progresso}%</span>
                  </div>
                  <ProgressBar value={progresso} color={trilha.cor} height={6} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
