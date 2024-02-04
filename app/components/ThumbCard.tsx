import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selected } from '../modules/slice'
import type { RootState } from '../modules/store'
import Image from 'next/image'

type Props = {
  name: string,
  viewCount: string,
  thumbUrl: string,
  title: string,
  game: string,
  platform: string,
  chnId: string,
}

export const ThumbCard = ({name, viewCount, thumbUrl, title, game, platform, chnId}: Props) => {

  // const select = useSelector((state) => state.name)
  const dispatch = useDispatch()
  const chnInfo = {
    name: name,
    id: chnId,
    platform: platform,
  }


  return (
    <button className='w-full' onClick={() => dispatch(selected(chnInfo))}>
      <div className='flex flex-col xl:hover:scale-105 transition-transform duration-200'>
        <div className='relative'>
          <Image src={thumbUrl} alt="thumb" width={320} height={180} />
          <div className='absolute top-2 left-2 px-1 rounded bg-gray-900/70'>
            <p className='text-white text-sm font-bold'>{viewCount} viewers</p>
          </div>
        </div>
        <div>
          <div className='top-10 left-2 px-1 py-1'>
            <p className='text-left text-white text-sm font-bold truncate'>{title}</p>
          </div>
          <div className='top-10 left-2 px-1 py-1 text-sm'>
            <p className='text-left text-gray-400 text-xs font-bold '>{name}</p>
          </div> <div className='top-10 left-2 px-1 py-1 text-sm'>
            <p className='text-left text-gray-400 text-xs font-bold '>{game}</p>
          </div>
        </div>
      </div>
    </button>
  )
}
