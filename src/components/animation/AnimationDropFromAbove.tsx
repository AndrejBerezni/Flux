'use client'
import { motion } from 'framer-motion'
export default function AnimationDropFromAbove({
  children,
  additionalStyles,
}: {
  children: React.ReactNode
  additionalStyles?: string
}) {
  return (
    <motion.div
      initial={{
        scaleY: 0,
        opacity: 0.5,
        translateY: '-50%',
      }}
      animate={{
        scaleY: 1,
        opacity: 1,
        translateY: '0%',
      }}
      transition={{
        duration: 1.5,
        type: 'spring',
      }}
      className={additionalStyles}
    >
      {children}
    </motion.div>
  )
}
