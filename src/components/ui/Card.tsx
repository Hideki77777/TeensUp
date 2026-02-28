'use client'

import type { HTMLAttributes } from 'react'

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx('rounded-xl border border-[#243540] bg-[#1A2B33] text-white shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex flex-col gap-1.5 p-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx('text-sm font-bold leading-none tracking-tight', className)} {...props} />
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-xs text-[#7A9BA8]', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('p-4 pt-0', className)} {...props} />
}
