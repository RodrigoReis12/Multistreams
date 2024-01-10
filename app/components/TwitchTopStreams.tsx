"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbCard } from './ThumbCard'
export const TwitchTopStreams = () => {


  const [result, setResult] = useState({message: {data:[{user_login:"", thumbnail_url:""}]}})
  const [isLoading , setIsLoading] = useState(true)
  const session = useSelector((state) => state.counter.twitchSession)

  useEffect(() => {
    if(session) {
      fetch("/api/get-twitch-top-streams", {
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
      { result.message.data.map((link) => (
        <div key={link.thumbnail_url} className='p-1'>
            <ThumbCard name={link.user_name} viewCount={link.viewer_count} thumbUrl={link.thumbnail_url} title={link.title} game={link.game_name} platform={result.message.platform} chnId={link.user_login} />
        </div>
      ))}
    </div>
    )
  )
}

