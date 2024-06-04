'use client'

import Image from 'next/image'

export default function FadeInImage({
  src,
  alt,
  width,
  height,
  additionalStyles,
}: Readonly<{
  src: string
  alt: string
  width: number
  height: number
  additionalStyles?: string
}>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`opacity-0 transition-opacity duration-1000 ${additionalStyles}`}
      onLoadingComplete={(image) => image.classList.remove('opacity-0')}
    />
  )
}
