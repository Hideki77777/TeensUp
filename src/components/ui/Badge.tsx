'use client'

import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[#243540] text-white',
  secondary: 'bg-[#243540] text-[#7A9BA8]',
  success: 'bg-[#0f2c1d] text-[#8fe8b2]',
  warning: 'bg-[#332612] text-[#FFD700]',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cx('inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold', variants[variant], className)}
      {...props}
    />
  )
}
