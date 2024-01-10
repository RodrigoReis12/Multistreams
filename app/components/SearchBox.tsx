"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import React, { useState } from 'react'
import { BsTwitch, BsYoutube } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { saveSearchResult, selectPlatform } from '../modules/slice';
export const SearchBox = () => {

  const [inputValue, setInputValue] = useState("");
  const platform = useSelector((state) => state.counter.selectPlt) 
  const twitchSession = useSelector((state) => state.counter.twitchSession)
  const youtubeSession = useSelector((state) => state.counter.youtubeSession)
  const dispatch = useDispatch();
  
  const searchStream = async () => {
    if(platform === "twitch") {
      const res = await fetch("/api/search-twitch?keyword=" + inputValue, {
        headers: {
          "Authorization": "OAuth " + twitchSession?.accessToken
        }
      }).then((res) => res.json())
      .then((data) => {
        dispatch(saveSearchResult(data))
      })
    } else {
      const res = await fetch("/api/search-youtube?keyword=" + inputValue, {
        headers: {
          "Authorization": "OAuth " + youtubeSession?.accessToken
        }
      }).then((res) => res.json())
      .then((data) => {
        dispatch(saveSearchResult(data))
      })
    }
  }


  return (
    <div className='flex w-[50%] space-x-2'>
      <Input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <Button type='submit' onClick={searchStream} >Search</Button>
      <Select defaultValue='twitch' onValueChange={(value) => dispatch(selectPlatform(value))}>
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='Select Platfrom' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="twitch" className='text-xl'><BsTwitch /></SelectItem>
            <SelectItem value="youtube" className='text-xl'><BsYoutube /></SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}