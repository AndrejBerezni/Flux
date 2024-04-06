'use client'
import { motion } from 'framer-motion'
export default function AnimationZoomIn({
  children,
  additionalStyles,
}: {
  children: React.ReactNode
  additionalStyles: string
}) {
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 1.5,
        type: 'spring',
      }}
      exit={{
        scale: 0,
      }}
      className={additionalStyles}
    >
      {children}
    </motion.div>
  )
}
