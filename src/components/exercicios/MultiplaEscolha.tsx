'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MultiplaEscolhaConteudo } from '@/types'
import Button from '@/components/ui/Button'
import { CheckCircle, XCircle } from 'lucide-react'

interface MultiplaEscolhaProps {
  conteudo: MultiplaEscolhaConteudo
  onResposta: (correta: boolean) => void
}

export default function MultiplaEscolha({ conteudo, onResposta }: MultiplaEscolhaProps) {
  const [selecionada, setSelecionada] = useState<number | null>(null)
  const [confirmada, setConfirmada] = useState(false)

  const opcoes = conteudo.opcoes
  const correta = selecionada !== null && opcoes[selecionada]?.correta

  const handleConfirmar = () => {
    if (selecionada === null) return
    setConfirmada(true)
  }

  const handleContinuar = () => {
    onResposta(correta ?? false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Pergunta */}
      <div className="bg-[#1A2B33] rounded-2xl p-5">
        <p className="text-white font-bold text-lg leading-snug">{conteudo.pergunta}</p>
      </div>

      {/* Opções */}
      <div className="flex flex-col gap-3">
        {opcoes.map((opcao, i) => {
          let bg = 'bg-[#1A2B33] border-[#243540]'
          let textColor = 'text-white'
          let icon = null

          if (confirmada) {
            if (opcao.correta) {
              bg = 'bg-[#7DB61C]/20 border-[#7DB61C]'
              textColor = 'text-[#7DB61C]'
              icon = <CheckCircle size={20} className="text-[#7DB61C] flex-shrink-0" />
            } else if (i === selecionada && !opcao.correta) {
              bg = 'bg-[#FF4B4B]/20 border-[#FF4B4B]'
              textColor = 'text-[#FF4B4B]'
              icon = <XCircle size={20} className="text-[#FF4B4B] flex-shrink-0" />
            }
          } else if (i === selecionada) {
            bg = 'bg-[#EE6A29]/20 border-[#EE6A29]'
          }

          return (
            <motion.button
              key={i}
              whileTap={confirmada ? {} : { scale: 0.98 }}
              onClick={confirmada ? undefined : () => setSelecionada(i)}
              className={`
                flex items-center justify-between gap-3 w-full p-4
                rounded-2xl border-2 text-left transition-colors duration-150
                ${bg}
              `}
            >
              <span className={`font-semibold text-sm ${textColor}`}>{opcao.texto}</span>
              {icon}
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
              {correta ? '✓ Correto!' : '✗ Ops! Quase...'}
            </p>
            <p className="text-[#7A9BA8] text-sm leading-relaxed">{conteudo.explicacao}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão */}
      <div className="mt-2">
        {!confirmada ? (
          <Button
            fullWidth
            size="lg"
            disabled={selecionada === null}
            onClick={handleConfirmar}
          >
            Confirmar
          </Button>
        ) : (
          <Button
            fullWidth
            size="lg"
            variant={correta ? 'success' : 'danger'}
            onClick={handleContinuar}
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  )
}
