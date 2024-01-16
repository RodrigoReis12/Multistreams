import type { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'

type ResponseData = {
  message: any
  platform: string
}

const endpoint = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResult=10&q="
const video_endpoint = "https://www.googleapis.com/youtube/v3/search?eventType=live&type=video"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const token: any = req.headers.authorization
  const bearer = _.replace(token, "OAuth", "Bearer")
  const { method, query } = req
  const keyword = query.keyword

  const channels = await (await fetch(endpoint + keyword, {
    headers: {
      "Authorization": bearer
    }
  })).json()

  const getData = () => {
    const data = Promise.all(
      channels.items.map(async (i: any) => 
        await (await fetch(video_endpoint + "&channelId=" + i.snippet.channelId, {
          headers: {
            "Authorization": bearer
          }
        })).json()
        .then((x) => {
          let val
          if (x.items.length === 0) {
            val = {
              channel_id: i.snippet.channelId,
              channel_name: i.snippet.title,
              thumbnail_url: i.snippet.thumbnails.medium.url,
              video_id: "",
              is_live: true,
            }
          } else {
            val = {
              channel_id: i.snippet.channelId,
              channel_name: i.snippet.title,
              thumbnail_url: i.snippet.thumbnails.medium.url,
              video_id: x.items[0].id.videoId,
              is_live: true,
            }
          }
          return val
        })
      )
    )
    return data
  }
  getData().
  then(data => {
    res.status(200).json({message: {data: data}, platform: "youtube"})
  })
  
}