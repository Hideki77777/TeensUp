'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  title?: string
  closable?: boolean
}

export default function Modal({ open, onClose, children, title, closable = true }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closable ? onClose : undefined}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-w-[430px] mx-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bg-[#1A2B33] rounded-t-3xl p-6 pb-8">
              {(title || closable) && (
                <div className="flex items-center justify-between mb-4">
                  {title && <h2 className="text-lg font-bold text-white">{title}</h2>}
                  {closable && onClose && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-[#243540] text-[#7A9BA8]"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
