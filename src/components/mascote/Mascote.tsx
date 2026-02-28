'use client'

import Image from 'next/image'
import { motion, type TargetAndTransition } from 'framer-motion'

export type MascoteHumor = 'idle' | 'feliz' | 'comemorando' | 'pensando' | 'incentivando'

interface MascoteProps {
  humor?: MascoteHumor
  size?: number
  className?: string
  /** Balão de fala exibido ao lado do mascote */
  fala?: string
}

export const MASCOTE_SRC = encodeURI('/Personagem Robô.svg')

const animacoesPorHumor: Record<MascoteHumor, TargetAndTransition> = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  feliz: {
    y: [0, -10, 0],
    rotate: [-3, 3, -3],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  },
  comemorando: {
    y: [0, -16, 0, -10, 0],
    rotate: [-5, 5, -5, 5, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
  },
  pensando: {
    rotate: [-2, 2, -2],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  incentivando: {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Mascote({ humor = 'idle', size = 120, className = '', fala }: MascoteProps) {
  const anim = animacoesPorHumor[humor]

  return (
    <div className={`flex items-end justify-center gap-2 ${className}`}>
      <motion.div
        animate={anim}
        style={{ width: size, height: 'auto', flexShrink: 0 }}
      >
        <Image
          src={MASCOTE_SRC}
          alt="Mascote Robô TeensUp"
          width={size}
          height={size}
          style={{ width: size, height: 'auto', objectFit: 'contain' }}
          priority
        />
      </motion.div>

      {fala && (
        <motion.div
          key={fala}
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
          className="relative mb-4"
        >
          {/* Seta do balão apontando para o mascote */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2
                        w-0 h-0
                        border-t-[6px] border-t-transparent
                        border-b-[6px] border-b-transparent
                        border-r-[8px] border-r-[#1A2B33]"
          />
          <div className="bg-[#1A2B33] border border-[#243540] rounded-2xl rounded-bl-sm px-4 py-3 max-w-[160px] shadow-lg">
            <p className="text-white text-sm font-bold leading-snug">{fala}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}


