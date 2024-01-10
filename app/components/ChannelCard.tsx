import React from 'react'
import { useDispatch } from 'react-redux'
import { saveSearchResult, selected } from '../modules/slice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MdOutlineLiveTv } from 'react-icons/md' 

type Props = {
  iconUrl: string,
  channel_name: string,
  channel_id: string,
  platform: string,
  title: string,
  game_name: string,
  is_live: boolean,
}

export const ChannelCard = ({ iconUrl, channel_name, channel_id, platform, title, game_name, is_live }: Props) => {

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(selected(chnInfo))
    dispatch(saveSearchResult({}))
  }

  const chnInfo = {
    name: channel_name,
    id: channel_id,
    platform: platform
  }

  return (
    <div className='flex flex-row w-1/2 mt-8 space-x-16'>
      <div>
        <Button variant="ghost" size="icon" className="w-full h-full" onClick={() => handleClick()}>
          <Avatar className='w-[120px] h-[120px]'>
            <AvatarImage src={iconUrl} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Button>
      </div>

      <div className='space-y-2'>
        <button className='p-0' onClick={() => handleClick()} >
          {is_live ? 
            <div className='flex'>
                <p className='text-xl font-bold'>{channel_name}</p>
                <span className='ml-8 text-xl text-red-500 '><MdOutlineLiveTv /></span>
            </div>
            :
              <div className='flex'>
                <p className='text-xl font-bold'>{channel_name}</p>
              </div>
          }
        </button>
      </div>

    </div>
  )
}
