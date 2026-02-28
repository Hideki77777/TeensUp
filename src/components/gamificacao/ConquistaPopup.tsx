'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CONQUISTAS } from '@/content/conquistas'
import { ConquistaIcon } from '@/components/ui/AppIcon'

interface ConquistaPopupProps {
  conquistaId: string | null
  onClose: () => void
}

export default function ConquistaPopup({ conquistaId, onClose }: ConquistaPopupProps) {
  const conquista = conquistaId ? CONQUISTAS.find((c) => c.id === conquistaId) : null

  return (
    <AnimatePresence>
      {conquista && (
        <motion.div
          className="fixed top-4 inset-x-4 max-w-[430px] mx-auto z-50"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onClose}
        >
          <div className="bg-[#FFD700] rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <ConquistaIcon id={conquista.id} size={30} className="text-[#131F24]" />
            <div>
              <p className="text-[#131F24] text-xs font-black uppercase tracking-wide">
                Conquista desbloqueada!
              </p>
              <p className="text-[#131F24] font-bold text-sm">{conquista.titulo}</p>
              <p className="text-[#131F24]/70 text-xs">{conquista.descricao}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
