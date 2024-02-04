import Link from 'next/link'
import React from 'react'
import Logomulti from '../Logo-multi.svg'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className='hidden lg:flex'>
      <Image src={Logomulti} alt="logo" width={25} height={25} />
      <span className='ml-2 font-bold'>multistreams</span>
    </div>
  )
}
