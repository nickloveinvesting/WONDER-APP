"use client"

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'white' | 'black'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  clickable?: boolean
}

export default function Logo({
  variant = 'white',
  size = 'md',
  clickable = true
}: LogoProps) {
  const sizes = {
    xs: { width: 50, height: 10 },  // Compact header size
    sm: { width: 100, height: 20 }, // Standard size
    md: { width: 140, height: 28 }, // Medium size
    lg: { width: 180, height: 36 }  // Large size for auth pages
  }

  const logoSrc = '/logo-black.png'
  const { width, height } = sizes[size]

  const logoImage = (
    <Image
      src={logoSrc}
      alt="WONDER - Explore Ideas Together"
      width={width}
      height={height}
      priority
      className={`hover:opacity-80 transition-opacity cursor-pointer ${
        variant === 'white' ? 'brightness-0 invert' : ''
      }`}
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
