'use client'

import { useRef, useEffect, useState, useCallback, ReactNode } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

// ─── Fade In on Scroll (spring-based) ───
interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 40,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReduced = useReducedMotion()

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: directionMap[direction].x,
        y: directionMap[direction].y,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : {
              opacity: 0,
              x: directionMap[direction].x,
              y: directionMap[direction].y,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger Children (spring-based) ───
interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

// ─── Text Reveal (word by word) ───
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  once = true,
  as: Tag = 'p',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReduced = useReducedMotion()
  const words = text.split(' ')

  if (prefersReduced) {
    return <Tag ref={ref as any} className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={
              isInView
                ? { y: 0, opacity: 1 }
                : { y: '100%', opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

// ─── Line Reveal (text slides up from behind a mask) ───
interface LineRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function LineReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : { y: '110%' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── Parallax Section (reduced intensity on mobile) ───
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  offset?: number
}

export function Parallax({
  children,
  className = '',
  speed = 0.5,
  offset = 100,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Reduce intensity on mobile
  const mobileOffset = typeof window !== 'undefined' && window.innerWidth < 768 ? offset * 0.4 : offset

  const y = useTransform(scrollYProgress, [0, 1], [mobileOffset, -mobileOffset * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  if (prefersReduced) {
    return <div ref={ref} className={`relative ${className}`}>{children}</div>
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  )
}

// ─── Scale on Scroll ───
interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
  scaleStart?: number
  scaleEnd?: number
}

export function ScaleOnScroll({
  children,
  className = '',
  scaleStart = 0.92,
  scaleEnd = 1,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleStart, scaleEnd])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])

  return (
    <motion.div ref={ref} className={className} style={{ scale, opacity }}>
      {children}
    </motion.div>
  )
}

// ─── Magnetic Button (follows cursor) ───
interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({
  children,
  className = '',
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 300, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [prefersReduced, strength, x, y])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  )
}

// ─── Reveal on Hover (card tilt) ───
interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltAmount?: number
}

export function TiltCard({
  children,
  className = '',
  tiltAmount = 5,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set(((e.clientY - centerY) / (rect.height / 2)) * -tiltAmount)
    rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * tiltAmount)
  }, [prefersReduced, tiltAmount, rotateX, rotateY])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

// ─── Horizontal Scroll Progress ───
interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({
  className = '',
  color = 'bg-earth-600',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className={`fixed left-0 right-0 top-0 z-[100] h-0.5 origin-left ${color} ${className}`}
      style={{ scaleX }}
    />
  )
}

// ─── Counter with Spring Physics ───
interface SpringCounterProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function SpringCounter({
  value,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
}: SpringCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplay(latest.toFixed(decimals))
    })
    return unsubscribe
  }, [springValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ─── Text Scramble Counter (cinematic digit scramble) ───
interface TextScrambleProps {
  value: string
  className?: string
  scrambleDuration?: number
}

export function TextScramble({
  value,
  className = '',
  scrambleDuration = 1200,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const chars = '0123456789.+k'

  useEffect(() => {
    if (!isInView || prefersReduced) {
      setDisplay(value)
      return
    }

    const steps = 12
    const stepDuration = scrambleDuration / steps
    let step = 0

    const interval = setInterval(() => {
      step++
      if (step >= steps) {
        setDisplay(value)
        clearInterval(interval)
        return
      }

      // Progressively reveal correct characters from left to right
      const revealIndex = Math.floor((step / steps) * value.length)
      let result = ''
      for (let i = 0; i < value.length; i++) {
        if (i < revealIndex) {
          result += value[i]
        } else if (value[i] === '.' || value[i] === '+' || value[i] === 'k') {
          result += value[i]
        } else {
          result += chars[Math.floor(Math.random() * 10)]
        }
      }
      setDisplay(result)
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isInView, value, scrambleDuration, prefersReduced])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  )
}

// ─── Gradient Glow (animated background) ───
interface GradientGlowProps {
  className?: string
  colors?: string[]
}

export function GradientGlow({
  className = '',
  colors = ['#0d9488', '#14b8a6', '#2dd4bf'],
}: GradientGlowProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div
        className={`absolute rounded-full blur-3xl ${className}`}
        style={{
          opacity: 0.3,
          background: `radial-gradient(circle, ${colors.join(', ')})`,
        }}
      />
    )
  }

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: `radial-gradient(circle, ${colors.join(', ')})`,
      }}
    />
  )
}

// ─── Smooth Section Divider ───
export function SectionDivider({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div ref={ref} className={`relative py-1 ${className}`}>
      <motion.div
        className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-brand-200 to-transparent"
        style={{ scaleX }}
      />
    </div>
  )
}

// ─── Spotlight Card (CSS custom properties — zero React re-renders) ───
interface SpotlightCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(13,148,136,0.12)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`)
  }, [prefersReduced])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`group/spotlight relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ─── Clip Reveal (image/section wipe on scroll) ───
interface ClipRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'center' | 'diagonal' | 'iris'
}

export function ClipReveal({
  children,
  className = '',
  direction = 'up',
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const clipPaths: Record<string, [string, string]> = {
    up: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    left: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    center: ['circle(0% at 50% 50%)', 'circle(75% at 50% 50%)'],
    diagonal: ['polygon(0 0, 0 0, 0 0)', 'polygon(0 0, 200% 0, 0 200%)'],
    iris: ['circle(0% at 50% 50%)', 'circle(100% at 50% 50%)'],
  }

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    clipPaths[direction] || clipPaths.up
  )

  return (
    <motion.div ref={ref} className={className} style={{ clipPath }}>
      {children}
    </motion.div>
  )
}

// ─── Kinetic Headline (CSS transitions — no per-letter Framer Motion) ───
interface KineticHeadlineProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function KineticHeadline({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
}: KineticHeadlineProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()
  const letters = text.split('')

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className} aria-label={text}>
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            transform: isInView ? 'translateY(0) rotateX(0)' : 'translateY(60px) rotateX(-80deg)',
            opacity: isInView ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay + i * staggerDelay}s, opacity 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay + i * staggerDelay}s`,
            transformOrigin: 'bottom',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  )
}
