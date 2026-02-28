'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

const variants = {
  primary:   'bg-[#EE6A29] hover:bg-[#D55A1F] active:bg-[#D55A1F] text-white border-b-4 border-[#953406]',
  secondary: 'bg-[#1A2B33] hover:bg-[#1E3038] text-white border-b-4 border-[#131F24]',
  success:   'bg-[#7DB61C] hover:bg-[#6FA018] text-white border-b-4 border-[#4B6C13]',
  danger:    'bg-[#FF4B4B] hover:bg-[#E03E3E] text-white border-b-4 border-[#B33030]',
  ghost:     'bg-transparent hover:bg-[#1A2B33] text-[#7A9BA8] border border-[#243540]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, loading, children, className = '', disabled, onClick, type, id, name, form, formAction, formMethod, 'aria-label': ariaLabel, 'aria-disabled': ariaDisabled }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || loading ? 1 : 0.97, y: disabled || loading ? 0 : 2 }}
        transition={{ duration: 0.1 }}
        className={`
          font-bold tracking-wide select-none transition-colors duration-150
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        id={id}
        name={name}
        form={form}
        aria-label={ariaLabel}
        aria-disabled={ariaDisabled}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Carregando...
          </span>
        ) : children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
