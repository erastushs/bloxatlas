'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealElement = 'div' | 'section' | 'article'

type Props = HTMLMotionProps<'div'> & {
  children: ReactNode
  as?: RevealElement
  delay?: number
}

export default function Reveal({ children, as, delay = 0, ...props }: Props) {
  const Component = as === 'section' ? motion.section : as === 'article' ? motion.article : motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
