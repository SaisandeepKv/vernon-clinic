'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
  scale?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
    ...(scale && { scale: 0.95 }),
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, ...(scale && { scale: 1 }) }
          : initial
      }
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Staggered reveal container — children animate in sequence */
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  baseDelay = 0,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  baseDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: baseDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Individual stagger item — must be inside StaggerReveal */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
