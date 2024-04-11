'use client'
import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import { RiArrowUpDoubleLine } from 'react-icons/ri'

import { robotoCondensed } from '@/app/fonts'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="fixed bottom-4 right-4 z-20 flex"
        >
          <button
            className="group peer rounded-full bg-primary p-2 text-2xl text-tertiary opacity-75 duration-300 hover:text-white hover:opacity-100 md:text-4xl"
            onClick={scrollToTop}
          >
            <RiArrowUpDoubleLine className="duration-200 group-hover:scale-110" />
          </button>
          <p
            className={`${robotoCondensed.className} absolute right-[calc(100%+10px)] top-[calc(50%-20px)] hidden h-[40px] w-auto text-nowrap rounded-md bg-primary p-2 text-center text-white peer-hover:flex`}
          >
            Back to top
          </p>
        </motion.div>
      )}
    </>
  )
}
