'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface HeartBreakProps {
  show: boolean
}

export default function HeartBreak({ show }: HeartBreakProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-16 right-4 z-50 pointer-events-none"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -30 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Heart size={28} className="text-[#FF4B4B]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
