"use client"

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'white' | 'black'
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
}

export default function Logo({
  variant = 'white',
  size = 'md',
  clickable = true
}: LogoProps) {
  const sizes = {
    sm: { width: 80, height: 26 },
    md: { width: 110, height: 35 },
    lg: { width: 140, height: 45 }
  }

  const logoSrc = variant === 'white' ? '/logo-white.png' : '/logo-black.png'
  const { width, height } = sizes[size]

  const logoImage = (
    <Image
      src={logoSrc}
      alt="PhiloDuel - Where Philosophy Comes Alive"
      width={width}
      height={height}
      priority
      className="hover:opacity-80 transition-opacity cursor-pointer"
    />
  )

  if (clickable) {
    return (
      <Link href="/" className="flex items-center">
        {logoImage}
      </Link>
    )
  }

  return <div className="flex items-center">{logoImage}</div>
}
