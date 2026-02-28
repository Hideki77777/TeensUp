'use client'

import { motion } from 'framer-motion'
import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import { CONQUISTAS } from '@/content/conquistas'
import { useConquistaStore } from '@/store/conquistaStore'
import { Lock } from 'lucide-react'
import { ConquistaIcon } from '@/components/ui/AppIcon'

export default function ConquistasPage() {
  const { jaDesbloqueou } = useConquistaStore()
  const total = CONQUISTAS.length
  const desbloqueadas = CONQUISTAS.filter((c) => jaDesbloqueou(c.id)).length

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-2">
        <div className="mb-4">
          <h1 className="text-2xl font-black text-white">Conquistas</h1>
          <p className="text-[#7A9BA8] text-sm mt-1">
            {desbloqueadas} de {total} desbloqueadas
          </p>
        </div>

        {/* Barra de progresso geral */}
        <div className="h-2 bg-[#243540] rounded-full mb-6">
          <div
            className="h-full bg-[#FFD700] rounded-full transition-all duration-500"
            style={{ width: `${Math.round((desbloqueadas / total) * 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CONQUISTAS.map((conquista, i) => {
            const desbloqueada = jaDesbloqueou(conquista.id)
            return (
              <motion.div
                key={conquista.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  rounded-2xl p-4 flex flex-col items-center text-center gap-2
                  border transition-all duration-200
                  ${desbloqueada
                    ? 'bg-[#FFD700]/10 border-[#FFD700]/30'
                    : 'bg-[#1A2B33] border-[#243540] opacity-60'
                  }
                `}
              >
                <div className="relative">
                  <ConquistaIcon
                    id={conquista.id}
                    size={30}
                    className={desbloqueada ? 'text-[#FFD700]' : 'text-[#7A9BA8] opacity-40'}
                  />
                  {!desbloqueada && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock size={16} className="text-[#7A9BA8]" />
                    </div>
                  )}
                </div>
                <div>
                  <p className={`text-xs font-black ${desbloqueada ? 'text-white' : 'text-[#7A9BA8]'}`}>
                    {conquista.titulo}
                  </p>
                  <p className="text-[#7A9BA8] text-xs mt-0.5 leading-tight">{conquista.descricao}</p>
                </div>
                {desbloqueada && (
                  <span className="text-[#FFD700] text-xs font-bold">+{conquista.xpReward} XP</span>
                )}
              </motion.div>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
