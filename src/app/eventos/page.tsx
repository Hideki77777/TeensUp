'use client'

import { useMemo, useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import { motion } from 'framer-motion'
import { CalendarDays, Heart, Lightbulb, MapPin, Star, Users } from 'lucide-react'
import { EVENTOS } from '@/content/eventos'
import { useEventosStore } from '@/store/eventosStore'

type Categoria = 'Todos' | 'Workshop' | 'Hackathon' | 'Talk'

const CATEGORIAS: Array<{ label: Categoria; icon: React.ReactNode }> = [
  { label: 'Todos', icon: <Users size={14} /> },
  { label: 'Workshop', icon: <Star size={14} /> },
  { label: 'Hackathon', icon: <Lightbulb size={14} /> },
  { label: 'Talk', icon: <CalendarDays size={14} /> },
]

const EVENTO_META: Record<
  string,
  {
    categoria: Exclude<Categoria, 'Todos'>
    distancia: string
    publicoA: string
    publicoB: string
  }
> = {
  'ev-1': { categoria: 'Workshop', distancia: 'Vilhena, RO (3.5 km)', publicoA: 'Jovem', publicoB: 'Adulto' },
  'ev-2': { categoria: 'Hackathon', distancia: 'Sapezal, MT (5.8 km)', publicoA: 'Misto', publicoB: 'Jovem' },
  'ev-3': { categoria: 'Talk', distancia: 'Vilhena, RO (2.1 km)', publicoA: 'Misto', publicoB: 'Teen' },
}

export default function EventosPage() {
  const { registrarPresenca, jaRegistrou, totalPresencas } = useEventosStore()
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>('Todos')
  const [mensagemAcao, setMensagemAcao] = useState<{ texto: string; ok: boolean } | null>(null)

  const eventosFiltrados = useMemo(
    () =>
      EVENTOS.filter((evento) => {
        if (categoriaAtiva === 'Todos') return true
        return EVENTO_META[evento.id]?.categoria === categoriaAtiva
      }),
    [categoriaAtiva]
  )

  const handleRegistrarPresenca = (eventoId: string, moedasPresenca: number) => {
    const resultado = registrarPresenca(eventoId, moedasPresenca)
    setMensagemAcao({ texto: resultado.mensagem, ok: resultado.ok })
  }

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20">
      <TopBar />

      <main className="flex-1 px-4 py-2 overflow-y-auto">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-black text-white">Eventos</h1>
          <p className="text-[#7A9BA8] text-sm mt-1">
            Acompanhe os eventos do PA Teens e registre presença para ganhar XP.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="mb-4 p-0 text-white"
        >
          <div className="flex items-center justify-end mb-4">
            <div className="text-right">
              <p className="text-xs text-[#7A9BA8]">Presenças</p>
              <p className="text-lg font-black text-white">{totalPresencas()}</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
            {CATEGORIAS.map((categoria) => {
              const ativa = categoria.label === categoriaAtiva
              return (
                <button
                  key={categoria.label}
                  onClick={() => setCategoriaAtiva(categoria.label)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                    ativa ? 'bg-[#EE8C3A] text-white' : 'bg-[#243540] text-[#7A9BA8]'
                  }`}
                >
                  {categoria.icon}
                  {categoria.label}
                </button>
              )
            })}
          </div>

          <div className="mb-3">
            <p className="text-lg font-bold text-white">Destaques</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {eventosFiltrados.map((evento, i) => {
              const meta = EVENTO_META[evento.id]
              const registrado = jaRegistrou(evento.id)
              return (
                <motion.article
                  key={evento.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.2 }}
                  className="min-w-[210px] rounded-2xl bg-[#132028] shadow-sm border border-[#243540] p-3"
                >
                  <div className="h-28 rounded-xl bg-gradient-to-br from-[#1E3038] to-[#243540] flex items-center justify-center">
                    {meta?.categoria === 'Hackathon' && <Lightbulb size={30} className="text-[#9EB3BE]" />}
                    {meta?.categoria === 'Workshop' && <Users size={30} className="text-[#9EB3BE]" />}
                    {meta?.categoria === 'Talk' && <CalendarDays size={30} className="text-[#9EB3BE]" />}
                  </div>
                  <div className="mt-3">
                    <p className="text-lg leading-none font-semibold text-white">{evento.titulo}</p>
                    <p className="text-xs text-[#7A9BA8] mt-1">{evento.data}</p>
                  </div>
                  <div className="mt-2 text-[10px] inline-flex rounded-full bg-[#EE6A29]/20 text-[#FF9B6A] px-2 py-1 font-bold">
                    {evento.status}
                  </div>
                  <button
                    onClick={() => handleRegistrarPresenca(evento.id, evento.moedasPresenca)}
                    disabled={registrado}
                    className={`mt-3 w-full h-9 rounded-xl text-xs font-black ${
                      registrado ? 'bg-[#E5E7EB] text-[#6B7280]' : 'bg-[#EE6A29] text-white'
                    }`}
                  >
                    {registrado ? 'Presença registrada' : `Marcar presença (+${evento.moedasPresenca} XP)`}
                  </button>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-5">
            <p className="text-2xl font-semibold text-white">Próximos eventos</p>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {eventosFiltrados.map((evento, i) => {
              const meta = EVENTO_META[evento.id]
              return (
                <motion.article
                  key={`${evento.id}-lista`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.22 }}
                  className="rounded-2xl bg-[#132028] border border-[#243540] p-3"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1E3038] to-[#243540] flex items-center justify-center flex-shrink-0">
                      {meta?.categoria === 'Hackathon' && <Lightbulb size={24} className="text-[#9EB3BE]" />}
                      {meta?.categoria === 'Workshop' && <Users size={24} className="text-[#9EB3BE]" />}
                      {meta?.categoria === 'Talk' && <CalendarDays size={24} className="text-[#9EB3BE]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-white text-lg font-bold truncate">{evento.titulo}</p>
                        <button className="text-[#F08A5D]">
                          <Heart size={16} />
                        </button>
                      </div>
                      <p className="flex items-center gap-1 text-[#7A9BA8] text-xs mt-1">
                        <MapPin size={12} />
                        {meta?.distancia ?? evento.local}
                      </p>
                      <div className="flex gap-1 mt-2">
                        <span className="text-[10px] px-2 py-1 rounded-full bg-[#EE6A29]/20 text-[#FF9B6A] font-bold">
                          {meta?.publicoA}
                        </span>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-[#243540] text-[#AFC5D0] font-bold">
                          {meta?.publicoB}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {mensagemAcao && (
            <p className={`mt-4 text-sm font-bold ${mensagemAcao.ok ? 'text-[#A0D843]' : 'text-[#FF6B6B]'}`}>
              {mensagemAcao.texto}
            </p>
          )}
        </motion.section>
      </main>

      <BottomNav />
    </div>
  )
}
