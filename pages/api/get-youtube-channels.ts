import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash"

type ResponseData = {
  message: string
}

type Line = {
  channel_id: string,
  channel_name: string,
  channel_platform: string,
  thumbnails: string,
  video_id: string,
  is_live: boolean,
}

const endpoint = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true"
const video_endpoint = "https://www.googleapis.com/youtube/v3/search?eventType=live&type=video"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const token = req.headers.authorization
  let data = []
  const bearer = _.replace(token, "OAuth", "Bearer")
  const channels = await (await fetch(endpoint, {
    headers: {
      "Authorization": bearer
    }
    
  })).json()
  
  
  const getData = () => {

    const response = Promise.all(
      channels.items.map(async (i) => 
      await (await fetch(video_endpoint+"&channelId="+i.snippet.resourceId.channelId, {
        headers: {
          "Authorization": bearer
        }
      })).json()
      .then((r) => {
          let value
          if(r.items.length === 0) {
            value = {
              channel_id: i.snippet.resourceId.channelId,
              channel_name: i.snippet.title,
              channel_platform: "youtube",
              thumbnails: i.snippet.thumbnails.medium.url,
              video_id: "",
              is_live: false,
            }
          }
            else {
              value = {
                channel_id: i.snippet.resourceId.channelId,
                channel_name: i.snippet.title,
                channel_platform: "youtube",
                thumbnails: i.snippet.thumbnails.medium.url,
                video_id: r.items[0].id.videoId,
                is_live: true,
            }
          }
          return value
        })
      )
    )
    return response
  }
  
  getData()
  .then(data => {
    res.status(200).json({message: { data: data}, platform: "youtube"})
  })
}