'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { useProgressoStore } from '@/store/progressoStore'
import { useConquistaStore } from '@/store/conquistaStore'
import { CONQUISTAS } from '@/content/conquistas'
import { TRILHAS } from '@/content/trilhas'
import { getLicoesOrdenadas } from '@/content/trilhas'
import { useShareStore } from '@/store/shareStore'
import { Heart, Zap, Gem, Trophy, BookOpen, CalendarDays, ShoppingBag, Medal, Share2, Copy } from 'lucide-react'
import Button from '@/components/ui/Button'
import { TrilhaIcon } from '@/components/ui/AppIcon'
import Image from 'next/image'

export default function PerfilPage() {
  const { xpTotal, gemas, coracoes, streak } = useGamificacaoStore()
  const { totalLicoesCompletas, licoesCompletas } = useProgressoStore()
  const { conquistasDesbloqueadas } = useConquistaStore()
  const { codigoConvite, registrarCompartilhamento, compartilhamentosHoje, getLimiteDiario } = useShareStore()
  const [shareMsg, setShareMsg] = useState<{ texto: string; ok: boolean } | null>(null)

  const totalLicoes = TRILHAS.reduce((acc, t) => acc + getLicoesOrdenadas(t).length, 0)
  const licoesConcluidas = totalLicoesCompletas()

  const stats = [
    { label: 'XP Total', value: xpTotal, icon: Zap, color: '#FFD700' },
    { label: 'Gemas', value: gemas, icon: Gem, color: '#00AE9D' },
    { label: 'Streak', value: `${streak} dias`, icon: Zap, color: '#FF8C50' },
    { label: 'Corações', value: coracoes, icon: Heart, color: '#FF4B4B' },
    { label: 'Lições', value: `${licoesConcluidas}/${totalLicoes}`, icon: BookOpen, color: '#7DB61C' },
    { label: 'Conquistas', value: `${conquistasDesbloqueadas.length}/${CONQUISTAS.length}`, icon: Trophy, color: '#FFD700' },
  ]

  const linkConvite =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?convite=${codigoConvite}`
      : `https://teensup.app/?convite=${codigoConvite}`

  const handleCompartilhar = async () => {
    const shareText = `Bora evoluir no TeensUp comigo! Use meu link: ${linkConvite}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'TeensUp',
          text: 'Vem aprender e ganhar recompensas no TeensUp!',
          url: linkConvite,
        })
      } else {
        await navigator.clipboard.writeText(shareText)
      }
      const resultado = registrarCompartilhamento()
      setShareMsg({ texto: resultado.mensagem, ok: resultado.ok })
    } catch {
      setShareMsg({ texto: 'Compartilhamento cancelado.', ok: false })
    }
  }

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkConvite)
      const resultado = registrarCompartilhamento()
      setShareMsg({ texto: resultado.mensagem, ok: resultado.ok })
    } catch {
      setShareMsg({ texto: 'Não foi possível copiar o link.', ok: false })
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-2">
        {/* Avatar placeholder */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-20 h-20 rounded-full bg-[#1A2B33] border border-[#243540] flex items-center justify-center overflow-hidden">
            <Image
              src="/Tela%20-%20Robo%20com%20olho.svg"
              alt="Você"
              width={66}
              height={66}
              style={{ width: 66, height: 'auto' }}
              priority
            />
          </div>
          <h1 className="text-xl font-black text-white">Você</h1>
          <div className="flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-3 py-1">
            <Zap size={14} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="text-[#FFD700] text-sm font-bold">{xpTotal} XP</span>
          </div>
        </div>

        {/* Stats grid */}
        <h2 className="text-white font-bold text-base mb-3">Seu progresso</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="bg-[#1A2B33] rounded-2xl p-4 flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: stat.color + '22' }}
              >
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{stat.value}</p>
                <p className="text-[#7A9BA8] text-xs">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progresso por trilha */}
        <h2 className="text-white font-bold text-base mb-3">Trilhas</h2>
        <div className="flex flex-col gap-2">
          {TRILHAS.map((trilha) => {
            const todas = getLicoesOrdenadas(trilha)
            const completas = todas.filter(({ licao }) => licoesCompletas[licao.id]).length
            const pct = todas.length > 0 ? Math.round((completas / todas.length) * 100) : 0

            return (
              <div key={trilha.slug} className="bg-[#1A2B33] rounded-2xl p-3 flex items-center gap-3">
                <span className="text-xl">
                  <TrilhaIcon slug={trilha.slug} size={20} className="text-white" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-xs font-bold truncate">{trilha.titulo}</span>
                    <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: trilha.cor }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#243540] rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: trilha.cor }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <h2 className="text-white font-bold text-base mt-6 mb-3">Convide amigos</h2>
        <div className="bg-[#1A2B33] rounded-2xl p-4 border border-[#243540] mb-6">
          <p className="text-white text-sm font-bold">Ganhe XP compartilhando seu link</p>
          <p className="text-[#7A9BA8] text-xs mt-1">
            Suba de nível para ganhar moedas. Limite diário: até {getLimiteDiario()} compartilhamentos ({compartilhamentosHoje}/{getLimiteDiario()} hoje)
          </p>
          <p className="text-[#00AE9D] text-xs font-bold mt-2 break-all">{linkConvite}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button variant="primary" size="sm" fullWidth onClick={handleCompartilhar} className="flex items-center justify-center gap-1.5">
              <Share2 size={14} />
              Compartilhar
            </Button>
            <Button variant="secondary" size="sm" fullWidth onClick={handleCopiarLink} className="flex items-center justify-center gap-1.5">
              <Copy size={14} />
              Copiar link
            </Button>
          </div>
          {shareMsg && (
            <p className={`mt-3 text-xs font-bold ${shareMsg.ok ? 'text-[#A0D843]' : 'text-[#FF6B6B]'}`}>
              {shareMsg.texto}
            </p>
          )}
        </div>

        <h2 className="text-white font-bold text-base mt-6 mb-3">Acessos rápidos</h2>
        <div className="grid grid-cols-3 gap-2">
          <Link href="/eventos" className="bg-[#1A2B33] rounded-2xl p-3 border border-[#243540]">
            <CalendarDays size={18} className="text-[#00AE9D] mb-2" />
            <p className="text-white text-xs font-bold">Eventos</p>
          </Link>
          <Link href="/loja" className="bg-[#1A2B33] rounded-2xl p-3 border border-[#243540]">
            <ShoppingBag size={18} className="text-[#EE6A29] mb-2" />
            <p className="text-white text-xs font-bold">Loja</p>
          </Link>
          <Link href="/ranking" className="bg-[#1A2B33] rounded-2xl p-3 border border-[#243540]">
            <Medal size={18} className="text-[#FFD700] mb-2" />
            <p className="text-white text-xs font-bold">Ranking</p>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}



