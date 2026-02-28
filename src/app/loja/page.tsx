'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import { useGamificacaoStore } from '@/store/gamificacaoStore'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ITENS_LOJA } from '@/content/loja'
import { useLojaStore } from '@/store/lojaStore'

export default function LojaPage() {
  const { gemas } = useGamificacaoStore()
  const { comprarItem, quantidadeComprada } = useLojaStore()
  const [mensagemAcao, setMensagemAcao] = useState<{ texto: string; ok: boolean } | null>(null)

  const handleComprarItem = (itemId: string, custo: number, nomeItem: string) => {
    const resultado = comprarItem(itemId, custo, nomeItem)
    setMensagemAcao({ texto: resultado.mensagem, ok: resultado.ok })
  }

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
          <h1 className="text-2xl font-black text-white">Loja</h1>
          <p className="text-[#7A9BA8] text-sm mt-1">
            Troque suas moedas por personalizacoes, brindes e experiencias do PA Teens.
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
                <CardTitle>Saldo de moedas</CardTitle>
                <span className="text-[#FFD700] text-base font-black">{gemas}</span>
              </div>
              <CardDescription>
                Use suas moedas para personalizar o Robocoop e trocar por recompensas reais.
              </CardDescription>
              {mensagemAcao && (
                <p className={`text-xs font-bold ${mensagemAcao.ok ? 'text-[#A0D843]' : 'text-[#FF6B6B]'}`}>
                  {mensagemAcao.texto}
                </p>
              )}
            </CardHeader>
          </Card>
        </motion.div>

        <div className="flex flex-col gap-3">
          {ITENS_LOJA.map((item) => {
            const podeTrocar = gemas >= item.custo
            const Icone = item.icone
            const quantidade = quantidadeComprada(item.id)
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + Number(item.id.replace('l', '')) * 0.04, duration: 0.22 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#243540] flex items-center justify-center flex-shrink-0">
                          <Icone size={18} className="text-[#00AE9D]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#7A9BA8] text-[10px] uppercase tracking-wider truncate">{item.categoria}</p>
                          <CardTitle className="truncate">{item.nome}</CardTitle>
                        </div>
                      </div>
                      <span className="text-[#FFD700] text-xs font-black whitespace-nowrap">{item.custo} moedas</span>
                    </div>
                    {quantidade > 0 && (
                      <p className="text-[#A0D843] text-xs font-bold mt-2">Resgatado {quantidade}x</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant={podeTrocar ? 'primary' : 'ghost'}
                      size="sm"
                      fullWidth
                      disabled={!podeTrocar}
                      onClick={() => handleComprarItem(item.id, item.custo, item.nome)}
                    >
                      {podeTrocar ? 'Trocar agora' : 'Moedas insuficientes'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
