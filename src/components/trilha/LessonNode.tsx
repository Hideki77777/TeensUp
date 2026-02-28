'use client'

import { motion } from 'framer-motion'
import { Lock, Star, CheckCircle, Swords } from 'lucide-react'
import type { StatusLicao, TipoLicao } from '@/types'

interface LessonNodeProps {
  status: StatusLicao
  tipo: TipoLicao
  cor: string
  onClick: () => void
  isActive?: boolean
}

const ICON_BY_TIPO: Record<TipoLicao, React.ReactNode> = {
  TEORIA: <Star size={22} className="fill-current" />,
  PRATICA: <Star size={22} className="fill-current" />,
  DESAFIO: <Star size={22} className="fill-current" />,
  CHEFE: <Swords size={22} />,
}

export default function LessonNode({ status, tipo, cor, onClick, isActive }: LessonNodeProps) {
  const isLocked = status === 'locked'
  const isComplete = status === 'complete'

  return (
    <motion.button
      data-lesson-node="true"
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      whileTap={isLocked ? {} : { scale: 0.92 }}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={isActive ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : {}}
      className={`
        relative w-16 h-16 rounded-2xl flex items-center justify-center
        shadow-lg transition-all duration-200 select-none
        ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        backgroundColor: isLocked
          ? '#243540'
          : isComplete
          ? '#7DB61C'
          : cor,
        boxShadow: isLocked
          ? 'none'
          : isComplete
          ? '0 4px 0 #4B6C13'
          : `0 4px 0 ${cor}99`,
      }}
    >
      {/* Glow no nó ativo */}
      {isActive && !isLocked && !isComplete && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ backgroundColor: cor, filter: 'blur(8px)' }}
        />
      )}

      {isLocked ? (
        <Lock size={22} className="text-[#7A9BA8]" />
      ) : isComplete ? (
        <CheckCircle size={22} className="text-white fill-white" />
      ) : (
        <span className="text-white relative z-10">
          {ICON_BY_TIPO[tipo]}
        </span>
      )}
    </motion.button>
  )
}
