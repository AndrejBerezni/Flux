'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function LoaderAnimation({
  size,
  color,
}: {
  size: 'small' | 'big'
  color: 'white' | 'brand'
}) {
  const lines = Array.from({ length: 5 }, (_, i) => i + 1)
  return (
    <motion.div className="flex items-center justify-center gap-[3px] bg-transparent">
      {lines.map((line, index) => (
        <motion.div
          key={`loader-line-${line}`}
          className={clsx('', {
            'h-[40px] w-[12px]': size === 'big',
            'h-[20px] w-[4px]': size === 'small',
          })}
          initial={{
            scaleY: 1,
            backgroundColor: color === 'brand' ? '#ff5f00' : '#ffffff',
          }}
          animate={{
            scaleY: 2,
            backgroundColor: color === 'brand' ? '#FFFBAA' : '#c9c9cf',
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        ></motion.div>
      ))}
    </motion.div>
  )
}
