'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercicio, Licao } from '@/types'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useProgressoStore } from '@/store/progressoStore'
import { useRankingStore } from '@/store/rankingStore'
import ProgressBar from '@/components/ui/ProgressBar'
import MultiplaEscolha from './MultiplaEscolha'
import VerdadeiroFalso from './VerdadeiroFalso'
import CompletarFrase from './CompletarFrase'
import LessonComplete from '@/components/gamificacao/LessonComplete'
import HeartBreak from '@/components/gamificacao/HeartBreak'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Heart, X } from 'lucide-react'
import Mascote from '@/components/mascote/Mascote'
import type { MascoteHumor } from '@/components/mascote/Mascote'

interface ExercicioShellProps {
  licao: Licao
  trilhaSlug: string
}

const FALAS_CERTAS = ['Isso aí!', 'Arrasou!', 'Muito bem!', 'Correto!', 'Perfeito!']
const FALAS_ERRADAS = ['Não desista!', 'Quase lá...', 'Tente de novo!', 'Força!']

export default function ExercicioShell({ licao }: ExercicioShellProps) {
  const router = useRouter()
  const { coracoes, perderCoracao, ganharXP, verificarStreak } = useGamificacaoStore()
  const { completarLicao } = useProgressoStore()
  const { registrarResultado } = useRankingStore()

  const [exercicioAtual, setExercicioAtual] = useState(0)
  const [erros, setErros] = useState(0)
  const [showHeartBreak, setShowHeartBreak] = useState(false)
  const [showCompleto, setShowCompleto] = useState(false)
  const [showSair, setShowSair] = useState(false)
  const [xpGanho, setXpGanho] = useState(0)
  const [gemasGanhas, setGemasGanhas] = useState(0)
  const [mascoteHumor, setMascoteHumor] = useState<MascoteHumor>('pensando')
  const [mascoteFala, setMascoteFala] = useState<string | undefined>('Leia com atenção!')

  const exercicios = licao.exercicios
  const progresso = Math.round((exercicioAtual / exercicios.length) * 100)

  const handleResposta = useCallback((correta: boolean) => {
    if (!correta) {
      setErros((e) => e + 1)
      perderCoracao()
      setShowHeartBreak(true)
      setMascoteHumor('incentivando')
      setMascoteFala(FALAS_ERRADAS[Math.floor(Math.random() * FALAS_ERRADAS.length)])
      setTimeout(() => {
        setShowHeartBreak(false)
        setMascoteHumor('pensando')
        setMascoteFala('Leia com atenção!')
      }, 1800)
    } else {
      setMascoteHumor('feliz')
      setMascoteFala(FALAS_CERTAS[Math.floor(Math.random() * FALAS_CERTAS.length)])
      setTimeout(() => {
        setMascoteHumor('pensando')
        setMascoteFala('Próxima pergunta!')
      }, 1500)
    }

    const xp = correta ? exercicios[exercicioAtual].xpReward : 0
    setXpGanho((x) => x + xp)

    const proximo = exercicioAtual + 1

    if (proximo >= exercicios.length) {
      // Lição concluída
      const total = exercicios.length
      const acertos = total - erros
      const pontuacao = Math.round((acertos / total) * 100)

      completarLicao(licao.id, pontuacao)
      verificarStreak()

      // Todo ganho vira XP; moedas entram somente ao subir de nível.
      const xpTotal = licao.xpReward + (erros === 0 ? 25 : 0) + licao.gemasReward
      const resultadoXp = ganharXP(xpTotal)
      registrarResultado('licao', erros === 0)
      setXpGanho(xpTotal)
      setGemasGanhas(resultadoXp.moedasGanhas)
      setShowCompleto(true)
    } else {
      setExercicioAtual(proximo)
    }
  }, [exercicioAtual, exercicios, erros, licao, completarLicao, verificarStreak, ganharXP, perderCoracao, registrarResultado])

  const renderExercicio = (exercicio: Exercicio) => {
    switch (exercicio.tipo) {
      case 'MULTIPLA_ESCOLHA':
        return (
          <MultiplaEscolha
            key={exercicio.id}
            conteudo={exercicio.conteudo as never}
            onResposta={handleResposta}
          />
        )
      case 'VERDADEIRO_FALSO':
        return (
          <VerdadeiroFalso
            key={exercicio.id}
            conteudo={exercicio.conteudo as never}
            onResposta={handleResposta}
          />
        )
      case 'COMPLETAR_FRASE':
        return (
          <CompletarFrase
            key={exercicio.id}
            conteudo={exercicio.conteudo as never}
            onResposta={handleResposta}
          />
        )
      default:
        return <p className="text-white">Tipo de exercício não suportado ainda.</p>
    }
  }

  if (showCompleto) {
    return (
      <LessonComplete
        xpGanho={xpGanho}
        gemasGanhas={gemasGanhas}
        erros={erros}
        onContinuar={() => router.push('/trilhas')}
      />
    )
  }

  if (coracoes <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center gap-5">
        <Mascote humor="incentivando" size={120} fala="Você está sem corações agora." />
        <h1 className="text-white text-2xl font-black">Sem corações para iniciar</h1>
        <div className="bg-[#1A2B33] border border-[#243540] rounded-2xl p-4 text-left max-w-md w-full">
          <p className="text-[#AFC5D0] text-sm font-bold">Como conseguir mais corações:</p>
          <p className="text-[#7A9BA8] text-sm mt-2">Ir ao PA Teens e ler o QR Code.</p>
          <p className="text-[#7A9BA8] text-sm mt-2">
            Regeneração: 1 coração a cada 2 horas. Máximo: 4 corações (8 horas para encher).
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push('/trilhas')}>
          Voltar para trilhas
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-[100dvh]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => setShowSair(true)}
          className="p-2 rounded-full hover:bg-[#1A2B33] text-[#7A9BA8]"
        >
          <X size={20} />
        </button>

        <div className="flex-1">
          <ProgressBar value={progresso} color="#EE6A29" height={10} />
        </div>

        {/* Corações */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Heart
              key={i}
              size={16}
              className={i < coracoes ? 'text-[#FF4B4B] fill-[#FF4B4B]' : 'text-[#243540]'}
            />
          ))}
        </div>
      </div>

      {/* Mascote incentivador */}
      <div className="flex justify-center pt-2 pb-1">
        <Mascote humor={mascoteHumor} size={80} fala={mascoteFala} />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 px-4 py-2 overflow-y-auto pb-8">
        <p className="text-[#7A9BA8] text-xs font-bold uppercase tracking-wider mb-4">
          {exercicioAtual + 1} / {exercicios.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={exercicioAtual}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {renderExercicio(exercicios[exercicioAtual])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animação coração quebrando */}
      <HeartBreak show={showHeartBreak} />

      {/* Modal confirmar saída */}
      <Modal open={showSair} onClose={() => setShowSair(false)} title="Sair da lição?">
        <p className="text-[#7A9BA8] text-sm mb-4">
          Seu progresso nesta lição será perdido se você sair agora.
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="danger" fullWidth onClick={() => router.push('/trilhas')}>
            Sair mesmo assim
          </Button>
          <Button variant="ghost" fullWidth onClick={() => setShowSair(false)}>
            Continuar estudando
          </Button>
        </div>
      </Modal>
    </div>
  )
}


