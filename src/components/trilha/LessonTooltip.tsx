'use client'

import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { Licao, StatusLicao } from '@/types'
import { Zap } from 'lucide-react'
import Image from 'next/image'
import { MASCOTE_SRC } from '@/components/mascote/Mascote'
import { useGamificacaoStore } from '@/store/gamificacaoStore'

interface LessonTooltipProps {
  licao: Licao
  trilhaSlug: string
  status: StatusLicao
  licaoNumero: number
  totalLicoes: number
  open: boolean
  onClose: () => void
  placement?: 'above' | 'below'
  anchorRef?: React.RefObject<HTMLElement | null>
}

export default function LessonTooltip({
  licao,
  trilhaSlug,
  status,
  licaoNumero,
  totalLicoes,
  open,
  onClose,
}: LessonTooltipProps) {
  const router = useRouter()
  const isComplete = status === 'complete'
  const { coracoes } = useGamificacaoStore()
  const [showSemVidaInfo, setShowSemVidaInfo] = useState(false)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (tooltipRef.current?.contains(target)) return
      onClose()
    }

    document.addEventListener('mousedown', handleOutside, true)
    document.addEventListener('touchstart', handleOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleOutside, true)
      document.removeEventListener('touchstart', handleOutside, true)
    }
  }, [open, onClose])

  const handleStart = () => {
    if (coracoes <= 0) {
      setShowSemVidaInfo(true)
      return
    }

    setShowSemVidaInfo(false)
    onClose()
    router.push(`/trilhas/${trilhaSlug}/licao/${licao.id}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute z-[80] w-[280px] max-w-[calc(100vw-2rem)] bottom-0 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div ref={tooltipRef}>
              <div className="relative bg-[#EE6A29] rounded-[16px] px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.35)] border border-[#F58B4E]">
                <div
                  className="absolute right-3 -bottom-3 w-5 h-5 bg-[#EE6A29] rotate-45 border-r border-b border-[#F58B4E]"
                />

                <p className="text-white/90 text-xs font-bold uppercase tracking-wider mb-1">
                  Lição {licaoNumero} de {totalLicoes}
                </p>
                <h3 className="text-white font-black text-base leading-tight mb-3">{licao.titulo}</h3>

                <button
                  onClick={handleStart}
                  className="w-full h-10 rounded-[10px] bg-[#4F4AA6] text-white font-black text-[13px] shadow-[0_5px_0_#2C2A67] flex items-center justify-center gap-1.5 active:translate-y-[1px] active:shadow-[0_4px_0_#2C2A67]"
                >
                  {coracoes <= 0 ? (
                    'Sem corações'
                  ) : isComplete ? (
                    'Revisar'
                  ) : (
                    <>
                      Começar
                      <span className="flex items-center gap-0.5 text-[13px] opacity-90">
                        <Zap size={14} className="fill-current" />
                        +{licao.xpReward} XP
                      </span>
                    </>
                  )}
                </button>

                {showSemVidaInfo && (
                  <div className="mt-2 rounded-xl border border-[#F6A26C] bg-[#0F212C]/55 p-2.5">
                    <p className="text-[11px] text-white font-bold">Sem corações para iniciar.</p>
                    <p className="text-[11px] text-white/90 mt-1">
                      Como conseguir mais: ir ao PA Teens e ler o QR Code.
                    </p>
                    <p className="text-[11px] text-white/90 mt-1">
                      Regeneração: 1 coração a cada 2h (máximo de 4 corações, total de 8h).
                    </p>
                  </div>
                )}
              </div>

              <motion.div
                className="mt-2 flex justify-end pr-2"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 340, damping: 20 }}
              >
                <Image
                  src={MASCOTE_SRC}
                  alt="Robocoop"
                  width={74}
                  height={74}
                  style={{ width: 74, height: 'auto', objectFit: 'contain' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
