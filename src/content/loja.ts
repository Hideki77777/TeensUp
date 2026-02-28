import { type LucideIcon, Gamepad2, Gift, Palette, Sparkles, Timer } from 'lucide-react'

export interface ItemLoja {
  id: string
  categoria: string
  nome: string
  custo: number
  icone: LucideIcon
}

export const ITENS_LOJA: ItemLoja[] = [
  { id: 'l1', categoria: 'Customizacao do Robocoop', nome: 'Olhos Neon', custo: 180, icone: Palette },
  { id: 'l2', categoria: 'Customizacao do Robocoop', nome: 'Skin Galaxia', custo: 260, icone: Sparkles },
  { id: 'l3', categoria: 'Brindes Sicoob', nome: 'Camiseta Sicoob', custo: 350, icone: Gift },
  { id: 'l4', categoria: 'Brindes PA Teens', nome: 'Copo termico PA Teens', custo: 300, icone: Gift },
  { id: 'l5', categoria: 'Experiencias', nome: '1h de PS5 no PA Teens', custo: 240, icone: Gamepad2 },
  { id: 'l6', categoria: 'Experiencias', nome: '1h de Meta Quest 3', custo: 320, icone: Timer },
]
