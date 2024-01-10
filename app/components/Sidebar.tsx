"use client"

import React from 'react'
import { cn } from '@/app/lib/utlis'
import { Playlist } from "../data/playlists"
import { BsTwitch, BsYoutube } from "react-icons/bs"
import { Button } from '@/components/ui/button'
import { SidebarCard } from './SidebarCard'
import { useSelector } from 'react-redux'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

export const Sidebar = ({ className, playlists }: SidebarProps) => {

  const tchannels: any = useSelector((state) => state.counter.tchannels)
  const ychannels: any = useSelector((state) => state.counter.ychannels)

  return (
    <div className={cn("pb-12", className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='flex mb-2 px-4 text-lg font-semibold tracking-tight'>
            <span>Twitch</span>
            <span className='text-purple-500 ml-2'><BsTwitch /></span>
          </h2>
          <div className='space-y-1'>
            {tchannels.data !== undefined && (

              tchannels.data.map((link) => (
                <SidebarCard key={link.channel_id} name={link.display_name}
                  chnId={link.login} chnPlt={tchannels.platform} iconUrl={link.profile_image_url}
                />
              ))
            )}
          </div>
        </div>


        <div className='px-3 py-2'>
          <h2 className='flex mb-2 px-4 text-lg font-semibold tracking-tight'>
            <span>Youtube</span>
            <span className='text-red-500 ml-2'><BsYoutube /></span>
          </h2>
          <div className='space-y-1'>
            {ychannels.data !== undefined && (
              ychannels.data.map((link) => (
                <SidebarCard key={link.channel_id} 
                  name={link.channel_name}
                  chnId={link.video_id} chnPlt={ychannels.platform} iconUrl={link.thumbnails}
                />
              ))
            )}
          </div>
        </div>


      </div>
    </div>
  )
}
