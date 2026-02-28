'use client'

import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import { useRankingStore } from '@/store/rankingStore'
import { motion } from 'framer-motion'
import { Crown, Medal, Trophy } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function RankingPage() {
  const { elo, ligaAtual, progressoLiga, historico } = useRankingStore()
  const liga = ligaAtual()
  const progresso = progressoLiga()

  const ranking = [
    { id: 'u1', nome: 'Ana M.', pontos: elo + 140, destaque: false },
    { id: 'u2', nome: 'Lucas P.', pontos: elo + 70, destaque: false },
    { id: 'u3', nome: 'Voce', pontos: elo, destaque: true },
    { id: 'u4', nome: 'Rafa C.', pontos: Math.max(0, elo - 55), destaque: false },
    { id: 'u5', nome: 'Duda S.', pontos: Math.max(0, elo - 120), destaque: false },
  ].sort((a, b) => b.pontos - a.pontos)

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-2">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-black text-white">Ranking</h1>
          <p className="text-[#7A9BA8] text-sm mt-1">
            Suba no ranking semanal e aumente a competitividade entre os participantes.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="mb-4"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-[#FFD700]" />
                  <CardTitle>Seu elo atual</CardTitle>
                </div>
                <span className="text-[#FFD700] text-base font-black">{elo} pts</span>
              </div>
              <CardDescription>
                Liga {liga.nome} • progresso de {progresso}% para a proxima liga.
              </CardDescription>
              <div className="h-2 bg-[#243540] rounded-full mt-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progresso}%`, backgroundColor: liga.cor }}
                />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="flex flex-col gap-2">
          {ranking.map((item, index) => {
            const posicao = index + 1
            const top3 = posicao <= 3
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.22 }}
                className={`rounded-2xl p-3 border flex items-center justify-between ${
                  item.destaque
                    ? 'bg-[#EE6A29]/15 border-[#EE6A29]/40'
                    : 'bg-[#1A2B33] border-[#243540]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#243540] flex items-center justify-center">
                    {posicao === 1 && <Crown size={16} className="text-[#FFD700]" />}
                    {posicao !== 1 && <Medal size={16} className={top3 ? 'text-[#A0D843]' : 'text-[#7A9BA8]'} />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{posicao}o - {item.nome}</p>
                    <p className="text-[#7A9BA8] text-xs">{item.destaque ? 'Seu perfil' : 'Participante'}</p>
                  </div>
                </div>
                <span className="text-[#FFD700] text-xs font-black">{item.pontos} pts</span>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ultimas variacoes de elo</CardTitle>
              <CardDescription>Mostra os ganhos recentes para manter o engajamento.</CardDescription>
              <div className="mt-1 flex flex-col gap-1.5">
                {(historico.length ? historico.slice(0, 5) : [{ id: 'vazio', motivo: 'Sem movimentacoes ainda', delta: 0 }]).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-[#7A9BA8]">{item.motivo}</span>
                    <span className={`font-black ${item.delta >= 0 ? 'text-[#A0D843]' : 'text-[#FF6B6B]'}`}>
                      {item.delta >= 0 ? '+' : ''}{item.delta}
                    </span>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
