"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Login } from './Login'
import { SearchBox } from './SearchBox'
import { StreamConfig } from './StreamConfig'
import { useSelector } from 'react-redux'
import { StreamBox } from './StreamBox'
import { StreamScreen } from './StreamScreen'
import { TwitchTopStreams } from './TwitchTopStreams'
import { YoutubeTopStreams } from './YoutubeTopStreams'
import { ChannelCard } from './ChannelCard'
import type { RootState } from '../modules/store'

export const Hero = () => {


  const selectName = useSelector((state: RootState) => state.counter.name)
  const selectId = useSelector((state: RootState) => state.counter.chnId)
  const selectPlt = useSelector((state: RootState) => state.counter.platform)
  const searchResult = useSelector((state: RootState) => state.counter.search)
  const screen = useSelector((state: RootState) => state.counter.screen)
  const view = useSelector((state: RootState) => state.counter.view)
  const [inputValue, setInputValue] = useState("")


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center'>
        <div className='flex justify-center w-[80%]'>
          <SearchBox />
          <StreamConfig />
        </div>
        <div className='flex justify-end w-[20%]'><Login/></div>
      </div>

      <div className='h-full px-4 m-6 lg:px-8'>
        <Tabs defaultValue='Stream' className='h-full space-y-6'>
          <div className='space-between flex items-center'>
            <TabsList>
              <TabsTrigger value="Stream" className='relative'>Stream</TabsTrigger>
            <TabsTrigger value="MultiView">MultiView</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='Stream'
          className="border-none p-0 outline-none">
            <div className='flex flex-col pb-4 items-center'>
              {/* search result */}
              { Object.keys(searchResult).length !== 0 && (
                searchResult.message.data.map((value: any) => (
                  <ChannelCard key={value.channel_id} iconUrl={value.thumbnail_url} channel_name={value.channel_name} channel_id={value.channel_id} platform={searchResult.platform} title={value.title} game_name={value.game_name} is_live={value.is_live} />
                ))
              )}

              {/* stream box */}

              <div className='flex justify-center w-full m-2'>
                { selectId === "" && 
                  <></>
                }
                { selectId !== "" && 
                  <div className='w-full max-w-5xl'>
                    <StreamBox streamId={selectId} platform={selectPlt} chat={true}  />
                  </div>
                }

              </div>
            </div>

            <div className='flex flex-col mt-2 space-x-1'>
              <div className='w-full ml-0 m-4'>
                <h2 className='text-2xl font-semibold tracking-tight'>
                  Top Twitch Streaming
                </h2>
              </div>
                  <TwitchTopStreams />
            </div>

            <div className='flex flex-col mt-2 space-x-1'>
              <div className='w-full ml-0 m-4'>
                <h2 className='text-2xl font-semibold tracking-tight'>
                  Top Youtube Streaming
                  <YoutubeTopStreams />
                </h2>
              </div>
            </div>

          </TabsContent>

          <TabsContent value='MultiView'
          className="border-none p-0 outline-none">
             <div className='flex flex-col pb-4 items-center'>
               {/* search result */}
               { Object.keys(searchResult).length !== 0 && (
                searchResult.message.data.map((value: any) => (
                  <ChannelCard key={value.channel_id} iconUrl={value.thumbnail_url} channel_name={value.channel_name} channel_id={value.channel_id} platform={searchResult.platform} title={value.title} game_name={value.game_name} is_live={value.is_live} />
                ))
              )}
            </div>
            <StreamScreen />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
