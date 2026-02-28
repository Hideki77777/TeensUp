'use client'

import { Heart, Zap, Gem, Flame } from 'lucide-react'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useEffect } from 'react'
import Image from 'next/image'

interface TopBarProps {
  showBack?: boolean
  onBack?: () => void
  title?: string
}

export default function TopBar({ showBack, onBack, title }: TopBarProps) {
  const { coracoes, streak, gemas, regenerarCoracao, getProgressoNivel } = useGamificacaoStore()
  const progressoNivel = getProgressoNivel()
  const recargas = coracoes < 4 ? 1 : 0

  useEffect(() => {
    regenerarCoracao()
    const interval = setInterval(regenerarCoracao, 60000)
    return () => clearInterval(interval)
  }, [regenerarCoracao])

  return (
    <div className="px-4 pt-2 pb-3">
      <div className="flex items-center justify-between h-14">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-[#1A2B33] text-[#7A9BA8]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <Image
            src="/TeensUp%20-%20Logo%20Text.svg"
            alt="TeensUp"
            width={120}
            height={30}
            style={{ width: 120, height: 'auto' }}
            priority
          />
        )}

        {title && (
          <span className="text-sm font-bold text-white absolute left-1/2 -translate-x-1/2">
            {title}
          </span>
        )}

        <div className="flex items-center gap-3">
          {/* Vida */}
          <div className="flex items-center gap-1">
            <Heart
              size={18}
              className={coracoes > 0 ? 'text-[#FF4B4B] fill-[#FF4B4B]' : 'text-[#243540]'}
            />
            <span className={`text-[13px] font-bold ${coracoes > 0 ? 'text-[#FF4B4B]' : 'text-[#243540]'}`}>
              {coracoes}
            </span>
          </div>

          {/* Recargas */}
          <div className="flex items-center gap-1">
            <Zap size={18} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="text-[13px] font-bold text-[#FFD700]">{recargas}</span>
          </div>

          {/* Moeda */}
          <div className="flex items-center gap-1">
            <Gem size={18} className="text-[#00D1B2]" />
            <span className="text-[13px] font-bold text-[#00D1B2]">{gemas}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1">
            <Flame size={18} className="text-[#EE6A29] fill-[#EE6A29]" />
            <span className="text-[13px] font-bold text-[#EE6A29]">{streak}</span>
          </div>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[11px] font-black text-[#FFD700] whitespace-nowrap">Nível {progressoNivel.nivelAtual}</span>
        <div className="h-2 flex-1 rounded-full bg-[#243540] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#EE6A29] transition-all duration-300"
            style={{ width: `${progressoNivel.progresso}%` }}
          />
        </div>
        <span className="text-[11px] font-bold text-[#7A9BA8] whitespace-nowrap">
          {progressoNivel.xpNoNivelAtual}/{progressoNivel.xpParaProximoNivel} XP
        </span>
      </div>
    </div>
  )
}

