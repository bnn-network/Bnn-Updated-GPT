'use client'

import Image from 'next/image'


function IconLogo({ className }: { className: string }) {
  return <Image className={className} src={'/images/bnnlogo.png'} alt="" width={20} height={20} />
}

export { IconLogo }
