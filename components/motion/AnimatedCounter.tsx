'use client'

import { animate, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  value: number
  className?: string
}

export default function AnimatedCounter({ value, className }: Props) {
  const [display, setDisplay] = useState(value)
  const motionValue = useMotionValue(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    const controls = animate(motionValue, value, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return controls.stop
  }, [motionValue, reduceMotion, value])

  return <span className={className}>{(reduceMotion ? value : display).toLocaleString()}</span>
}
