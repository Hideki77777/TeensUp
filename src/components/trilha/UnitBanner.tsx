import type { Unidade } from '@/types'

interface UnitBannerProps {
  unidade: Unidade
  cor: string
  numero: number
}

export default function UnitBanner({ unidade, cor, numero }: UnitBannerProps) {
  return (
    <div
      className="w-full rounded-2xl px-5 py-4 my-2"
      style={{ backgroundColor: cor + '22', border: `1px solid ${cor}44` }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: cor }}>
        Unidade {numero}
      </p>
      <h2 className="text-white font-black text-base leading-tight">{unidade.titulo}</h2>
      <p className="text-[#7A9BA8] text-xs mt-0.5">{unidade.descricao}</p>
    </div>
  )
}
