'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, CircleUserRound, GraduationCap, ShoppingBag, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { href: '/trilhas', icon: GraduationCap },
  { href: '/loja', icon: ShoppingBag },
  { href: '/eventos', icon: CalendarDays },
  { href: '/ranking', icon: Trophy },
  { href: '/perfil', icon: CircleUserRound },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-[430px] mx-auto z-30 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)]">
      <div className="bg-[#050505] border border-[#171717] rounded-xl h-[72px] px-4 flex items-center justify-between shadow-[0_-10px_35px_rgba(0,0,0,0.45)]">
        {NAV_ITEMS.map(({ href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="w-12 h-12 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: active ? 1.06 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  active ? 'bg-[#EE6A29]' : 'bg-transparent'
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={2.2}
                  className={active ? 'text-white' : 'text-white/90'}
                />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
