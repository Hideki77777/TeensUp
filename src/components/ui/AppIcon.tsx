import type { ComponentType } from 'react'
import {
  Coins,
  Crown,
  Dumbbell,
  Flame,
  Handshake,
  Landmark,
  Map,
  Sparkles,
  Sprout,
  Star,
  Target,
  Trophy,
  Wallet,
} from 'lucide-react'

interface AppIconProps {
  size?: number
  className?: string
}

const TRILHA_ICONES: Record<string, ComponentType<AppIconProps>> = {
  'educacao-financeira': Wallet,
  cooperativismo: Handshake,
  'sicoob-credisul': Landmark,
  'produtos-jovem': Target,
}

const CONQUISTA_ICONES: Record<string, ComponentType<AppIconProps>> = {
  primeira_licao: Sprout,
  cinco_licoes: Star,
  streak_3: Flame,
  streak_7: Sparkles,
  sem_erros: Dumbbell,
  cem_xp: Trophy,
  explorador: Map,
  mestre: Crown,
  cooperador: Handshake,
  investidor_iniciante: Coins,
}

export function TrilhaIcon({ slug, size = 20, className = '' }: { slug: string } & AppIconProps) {
  const Icon = TRILHA_ICONES[slug] ?? Wallet
  return <Icon size={size} className={className} />
}

export function ConquistaIcon({ id, size = 20, className = '' }: { id: string } & AppIconProps) {
  const Icon = CONQUISTA_ICONES[id] ?? Star
  return <Icon size={size} className={className} />
}

