'use client'
import { motion } from 'framer-motion'
export default function AnimationContentFadeIn({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.5,
        type: 'spring',
      }}
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  )
}
