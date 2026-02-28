'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { VerdadeiroFalsoConteudo } from '@/types'
import Button from '@/components/ui/Button'
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react'

interface VerdadeiroFalsoProps {
  conteudo: VerdadeiroFalsoConteudo
  onResposta: (correta: boolean) => void
}

export default function VerdadeiroFalso({ conteudo, onResposta }: VerdadeiroFalsoProps) {
  const [resposta, setResposta] = useState<boolean | null>(null)
  const [confirmada, setConfirmada] = useState(false)

  const correta = resposta === conteudo.correto

  const handleContinuar = () => {
    if (resposta === null) return
    if (!confirmada) {
      setConfirmada(true)
      return
    }
    onResposta(correta)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Afirmação */}
      <div className="bg-[#1A2B33] rounded-2xl p-5">
        <p className="text-[#7A9BA8] text-xs font-bold uppercase tracking-wider mb-2">Verdadeiro ou Falso?</p>
        <p className="text-white font-bold text-lg leading-snug">{conteudo.afirmacao}</p>
      </div>

      {/* Botões V/F grandes */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={confirmada ? {} : { scale: 0.95 }}
          onClick={confirmada ? undefined : () => setResposta(true)}
          className={`
            flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2
            transition-colors duration-150
            ${confirmada
              ? conteudo.correto
                ? 'bg-[#7DB61C]/20 border-[#7DB61C]'
                : resposta === true
                ? 'bg-[#FF4B4B]/20 border-[#FF4B4B]'
                : 'bg-[#1A2B33] border-[#243540] opacity-50'
              : resposta === true
              ? 'bg-[#EE6A29]/20 border-[#EE6A29]'
              : 'bg-[#1A2B33] border-[#243540]'
            }
          `}
        >
          {confirmada && conteudo.correto ? (
            <CheckCircle size={28} className="text-[#7DB61C]" />
          ) : confirmada && resposta === true && !conteudo.correto ? (
            <XCircle size={28} className="text-[#FF4B4B]" />
          ) : (
            <ThumbsUp size={28} className={resposta === true ? 'text-[#EE6A29]' : 'text-[#7A9BA8]'} />
          )}
          <span className={`font-black text-sm ${resposta === true && !confirmada ? 'text-[#EE6A29]' : 'text-white'}`}>
            VERDADEIRO
          </span>
        </motion.button>

        <motion.button
          whileTap={confirmada ? {} : { scale: 0.95 }}
          onClick={confirmada ? undefined : () => setResposta(false)}
          className={`
            flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2
            transition-colors duration-150
            ${confirmada
              ? !conteudo.correto
                ? 'bg-[#7DB61C]/20 border-[#7DB61C]'
                : resposta === false
                ? 'bg-[#FF4B4B]/20 border-[#FF4B4B]'
                : 'bg-[#1A2B33] border-[#243540] opacity-50'
              : resposta === false
              ? 'bg-[#EE6A29]/20 border-[#EE6A29]'
              : 'bg-[#1A2B33] border-[#243540]'
            }
          `}
        >
          {confirmada && !conteudo.correto ? (
            <CheckCircle size={28} className="text-[#7DB61C]" />
          ) : confirmada && resposta === false && conteudo.correto ? (
            <XCircle size={28} className="text-[#FF4B4B]" />
          ) : (
            <ThumbsDown size={28} className={resposta === false ? 'text-[#EE6A29]' : 'text-[#7A9BA8]'} />
          )}
          <span className={`font-black text-sm ${resposta === false && !confirmada ? 'text-[#EE6A29]' : 'text-white'}`}>
            FALSO
          </span>
        </motion.button>
      </div>

      {/* Explicação */}
      <AnimatePresence>
        {confirmada && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 ${correta ? 'bg-[#7DB61C]/10 border border-[#7DB61C]/30' : 'bg-[#FF4B4B]/10 border border-[#FF4B4B]/30'}`}
          >
            <p className={`text-sm font-semibold mb-1 ${correta ? 'text-[#7DB61C]' : 'text-[#FF4B4B]'}`}>
              {correta ? '✓ Correto!' : '✗ Ops! Quase...'}
            </p>
            <p className="text-[#7A9BA8] text-sm leading-relaxed">{conteudo.explicacao}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão */}
      <div className="mt-2">
        {!confirmada ? (
          <Button fullWidth size="lg" disabled={resposta === null} onClick={handleContinuar}>
            Confirmar
          </Button>
        ) : (
          <Button fullWidth size="lg" variant={correta ? 'success' : 'danger'} onClick={handleContinuar}>
            Continuar
          </Button>
        )}
      </div>
    </div>
  )
}
