'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CompletarFraseConteudo } from '@/types'
import Button from '@/components/ui/Button'
import { CheckCircle, XCircle } from 'lucide-react'

interface CompletarFraseProps {
  conteudo: CompletarFraseConteudo
  onResposta: (correta: boolean) => void
}

export default function CompletarFrase({ conteudo, onResposta }: CompletarFraseProps) {
  const [selecionada, setSelecionada] = useState<string | null>(null)
  const [confirmada, setConfirmada] = useState(false)

  const correta = selecionada === conteudo.resposta

  // Embaralhar opções (estável por render)
  const opcoes = [...conteudo.opcoes].sort(() => 0)

  const handleContinuar = () => {
    if (selecionada === null) return
    if (!confirmada) {
      setConfirmada(true)
      return
    }
    onResposta(correta)
  }

  // Quebra a frase no ___
  const partes = conteudo.frase.split('___')

  return (
    <div className="flex flex-col gap-4">
      {/* Frase com lacuna */}
      <div className="bg-[#1A2B33] rounded-2xl p-5">
        <p className="text-[#7A9BA8] text-xs font-bold uppercase tracking-wider mb-3">Complete a frase</p>
        <p className="text-white font-bold text-lg leading-relaxed">
          {partes[0]}
          <span
            className={`
              inline-block min-w-[80px] px-2 mx-1 rounded-lg border-b-2 text-center
              ${confirmada
                ? correta
                  ? 'text-[#7DB61C] border-[#7DB61C] bg-[#7DB61C]/10'
                  : 'text-[#FF4B4B] border-[#FF4B4B] bg-[#FF4B4B]/10'
                : selecionada
                ? 'text-[#EE6A29] border-[#EE6A29] bg-[#EE6A29]/10'
                : 'text-[#7A9BA8] border-[#243540]'
              }
            `}
          >
            {selecionada ?? '?'}
          </span>
          {partes[1]}
        </p>
      </div>

      {/* Opções */}
      <div className="flex flex-wrap gap-2 justify-center">
        {opcoes.map((opcao) => {
          const isSelected = selecionada === opcao
          const isCorrect = confirmada && opcao === conteudo.resposta
          const isWrong = confirmada && isSelected && !correta

          return (
            <motion.button
              key={opcao}
              whileTap={confirmada ? {} : { scale: 0.95 }}
              onClick={confirmada ? undefined : () => setSelecionada(opcao)}
              className={`
                px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-colors duration-150
                ${isCorrect
                  ? 'bg-[#7DB61C]/20 border-[#7DB61C] text-[#7DB61C]'
                  : isWrong
                  ? 'bg-[#FF4B4B]/20 border-[#FF4B4B] text-[#FF4B4B]'
                  : isSelected
                  ? 'bg-[#EE6A29]/20 border-[#EE6A29] text-[#EE6A29]'
                  : 'bg-[#1A2B33] border-[#243540] text-white'
                }
              `}
            >
              {opcao}
              {isCorrect && <CheckCircle size={14} className="inline ml-1.5" />}
              {isWrong && <XCircle size={14} className="inline ml-1.5" />}
            </motion.button>
          )
        })}
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
              {correta ? '✓ Correto!' : `✗ A resposta era: "${conteudo.resposta}"`}
            </p>
            <p className="text-[#7A9BA8] text-sm leading-relaxed">{conteudo.explicacao}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão */}
      <div className="mt-2">
        {!confirmada ? (
          <Button fullWidth size="lg" disabled={selecionada === null} onClick={handleContinuar}>
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
