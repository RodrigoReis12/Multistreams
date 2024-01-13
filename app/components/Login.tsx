"use client"
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { PiPlugsConnectedBold } from "react-icons/pi"
import { TbPlugConnected } from "react-icons/tb"
import { useTheme } from 'next-themes'
import { signIn, signOut, useSession } from "next-auth/react"
import { persistStore } from "redux-persist"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import type { RootState } from '../modules/store'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import { DropdownMenuPortal, DropdownMenuSub } from '@radix-ui/react-dropdown-menu'
import { saveLoginSession, saveTwitchSession, saveYoutubeSession, twitchChannels, youtubeChannels } from '../modules/slice'
import { persistor } from '../modules/store'
export const Login = () => {

  const { setTheme } = useTheme();
  const { data: session, status } = useSession();
  const loginSession = useSelector((state: RootState) => state.counter.loginSession);
  const twitchSession = useSelector((state: RootState) => state.counter.twitchSession);
  const youtubeSession = useSelector((state: RootState) => state.counter.youtubeSession);
  const tchannels = useSelector((state: RootState) => state.counter.tchannels);
  const ychannels = useSelector((state: RootState) => state.counter.ychannels);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    await signIn();
    await dispatch(saveLoginSession(session));
  }
  const getTwitch = async () => {
    const res = await fetch('/api/get-twitch-channels', {
      headers: {
        "Authorization": "OAuth " + session?.accessToken
      }
    }).then((res) => res.json())
    .then((res) => {
      dispatch(twitchChannels(res.message))
    })
  }

  const getYoutube = async () => {
    const res = await fetch('/api/get-youtube-channels', {
      headers: {
        "Authorization": "OAuth " + session?.accessToken
      }
    }).then((res) => res.json())
    .then((res) => {
      dispatch(youtubeChannels(res.message))
    })
  }

  const validateSession = async () => {
    if(loginSession?.provider !== undefined) {
      if(loginSession?.provider === "twitch") {
        const res = await fetch("/api/validate-session?platform=twitch", {
          headers: {
            "Authorization": "OAuth " + loginSession?.accessToken
          }
        })
        if(!res.ok) {
          console.log("invalid token", loginSession?.accessToken);
          signOut();
          persistor.purge();
        }
      }

      if(loginSession?.provider === "youtube") {
        const res = await fetch("/api/validate-session?platform=youtube", {
          headers: {
            "Authorization": "OAuth " + loginSession?.accessToken 
          }
        })
        if(!res.ok) {
          console.log("invalid token", loginSession?.accessToken);
          signOut();
          persistor.purge();
        }
      }
    } else {
      console.log("no login session");
    }
  }

  useEffect(() => {
    if (loginSession?.user?.name === undefined) {
      dispatch(saveLoginSession(session))
    }
    if(session?.provider === "twitch") {
      dispatch(saveTwitchSession(session))
      getTwitch()

    }
    if(session?.provider === "google") {
      dispatch(saveYoutubeSession(session))
      // getYoutube()

    }
  }, [session])

  useEffect(() => {
    validateSession();
  }, [])


  if (loginSession) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src={loginSession?.user?.image} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account: {session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => {persistor.purge(); signOut()}}>
              <span>Sign-out</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signIn("twitch")}>
              {twitchSession?.accessToken !== undefined ?
                <>
                  <span>Connect Twitch</span><span className='ml-2 text-green-500'><PiPlugsConnectedBold /></span>
                </>
                :
                <>
                  <span>Connect Twitch</span><span className='ml-2'><TbPlugConnected /></span>
                </>
              }
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signIn("google")}>
              {youtubeSession?.accessToken !== undefined ?
                <>
                  <span>Connect Youtube</span><span className='ml-2 text-green-500'><PiPlugsConnectedBold /></span>
                </>
                :
                <>
                  <span>Connect Youtube</span><span className='ml-2'><TbPlugConnected /></span>
                </>
              }
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Moon className='mr-2 h-4 w-4' />
                <span>Design</span>
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className='mr-2 h-4 w-4' />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className='mr-2 h-4 w-4' />
                    <span>Light Mode</span>
                  </DropdownMenuItem>

                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    )

  }
  else {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src={loginSession?.user?.image} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account: {loginSession?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleSignIn()}>
              <span>Sign-in</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Moon className='mr-2 h-4 w-4' />
                <span>Design</span>
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className='mr-2 h-4 w-4' />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className='mr-2 h-4 w-4' />
                    <span>Light Mode</span>
                  </DropdownMenuItem>

                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    )
  }
}

