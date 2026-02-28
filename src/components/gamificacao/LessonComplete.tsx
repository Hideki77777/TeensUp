'use client'

import { motion } from 'framer-motion'
import { Zap, Gem, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Mascote from '@/components/mascote/Mascote'

interface LessonCompleteProps {
  xpGanho: number
  gemasGanhas: number
  erros: number
  onContinuar: () => void
}

export default function LessonComplete({ xpGanho, gemasGanhas, erros, onContinuar }: LessonCompleteProps) {
  const perfeita = erros === 0

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center gap-6">
      <motion.div
        initial={{ scale: 0, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.05 }}
      >
        <Mascote
          humor={perfeita ? 'comemorando' : 'feliz'}
          size={160}
          fala={perfeita ? 'Você foi incrível!' : 'Boa, continue assim!'}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className={`text-3xl font-black mb-1 ${perfeita ? 'text-[#FFD700]' : 'text-white'}`}>
          {perfeita ? 'Perfeito!' : 'Lição concluída!'}
        </h1>
        <p className="text-[#7A9BA8] text-sm">
          {perfeita ? 'Sem nenhum erro! Excelente resultado!' : `${erros} erro${erros !== 1 ? 's' : ''} — continue praticando!`}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <div className="bg-[#1A2B33] rounded-2xl px-6 py-4 flex flex-col items-center gap-1">
          <Zap size={24} className="text-[#FFD700] fill-[#FFD700]" />
          <span className="text-2xl font-black text-white">+{xpGanho}</span>
          <span className="text-xs text-[#7A9BA8] font-bold">XP</span>
        </div>

        {gemasGanhas > 0 && (
          <div className="bg-[#1A2B33] rounded-2xl px-6 py-4 flex flex-col items-center gap-1">
            <Gem size={24} className="text-[#00AE9D]" />
            <span className="text-2xl font-black text-white">+{gemasGanhas}</span>
            <span className="text-xs text-[#7A9BA8] font-bold">Moedas (nível)</span>
          </div>
        )}

        {perfeita && (
          <div className="bg-[#1A2B33] rounded-2xl px-6 py-4 flex flex-col items-center gap-1">
            <Star size={24} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="text-2xl font-black text-white">100%</span>
            <span className="text-xs text-[#7A9BA8] font-bold">Perfeito</span>
          </div>
        )}
      </motion.div>

      {perfeita && <Confetti />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full"
      >
        <Button fullWidth size="lg" variant="success" onClick={onContinuar}>
          Continuar
        </Button>
      </motion.div>
    </div>
  )
}

function Confetti() {
  const colors = ['#EE6A29', '#FFD700', '#7DB61C', '#FF4B4B', '#00AE9D']
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: ((i * 37) % 100),
    delay: (i % 5) * 0.08,
    color: colors[i % colors.length],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full top-0"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: -10, opacity: 1 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 }}
          transition={{ duration: 2.5, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
