"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbCard } from './ThumbCard'
import type { RootState } from '../modules/store'


export const YoutubeTopStreams = () => {

  const [result, setResult] = useState({ message: { data: [{ user_login: "", thumbnail_url: "" }] , platform: ""}})
  const [isLoading, setIsLoading] = useState(true)
  const session = useSelector((state: RootState) => state.counter.youtubeSession)


  useEffect(() => {
    if (session) {
      fetch("/api/get-youtube-top-streams", {
        next: {
          revalidate: 5,
        },
        headers: {
          "Authorization": "OAuth " + session?.accessToken
        }
      }).then((tmp) => tmp.json())
        .then((value) => {
          setResult(value)
          setIsLoading(false)
        })
    }
  }, [session])

  return (
      ( isLoading ? <> <Skeleton className='h-12 w-36' /> </>
      :
      <div className='xl:pl-32 xl:pr-32 sm:pl-16 sm:pr-16 select-none sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'>
        {result.message.data.map((link: any) => (
          <div key={link.thumbnail_url} className='p-1'>
            <ThumbCard name={link.channel_name} viewCount={link.viewer_count} thumbUrl={link.thumbnail_url} title={link.channel_title} game={link.game_name} platform={result.message.platform} chnId={link.video_id} />
          </div>
        ))}
      </div>
      )
  )
}
