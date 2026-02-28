'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number    // 0–100
  color?: string
  height?: number
  animated?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  color = '#EE6A29',
  height = 12,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={`w-full rounded-full overflow-hidden bg-[#243540] ${className}`}
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={animated ? { duration: 0.5, ease: 'easeOut' } : { duration: 0 }}
      />
    </div>
  )
}
