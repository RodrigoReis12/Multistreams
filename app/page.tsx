import Image from 'next/image'
import { Logo } from './components/Logo'
import { Sidebar } from './components/Sidebar'
import { playlists } from './data/playlists'
import { Hero } from './components/Hero'

export default function Home() {
  return (
    <>
      <div className='m-2'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-8'>

            <div className='flex flex-col col-span-1'>
              <div className='m-2'>
                <Logo/>
              </div>
    
              <div className=''>
                <Sidebar playlists={playlists} className='hidden lg:block'/>
              </div>
            </div>

            <div className='col-span-7 lg:col-span-7 lg:border-l'>
              <Hero/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
