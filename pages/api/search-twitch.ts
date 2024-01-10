import type { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'

type ResponseData = {
  message: string
}

   const endpoint = "https://id.twitch.tv/oauth2/validate"
   const search_endpoint = "https://api.twitch.tv/helix/search/channels?first=10&query="

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const token = req.headers.authorization
  const bearer = _.replace(token, "OAuth", "Bearer")
  const { method, query } = req
  const keyword = query.keyword

  const channels = await (await fetch(endpoint, {
    headers: {
      "Authorization": token
    }
  })).json()

  const response = await (await fetch(search_endpoint + keyword, {
    headers: {
      "Authorization": bearer,
      "Client-id": channels.client_id
    }
  })).json()

  const result = () => {
    let tmp = []
    if(response.data.length !== 0) {
      response.data.map((value) => {
        let record = {
          channel_id: value.broadcaster_login,
          channel_name: value.display_name,
          title: value.title,
          thumbnail_url: value.thumbnail_url,
          game_name: value.game_name,
          is_live: value.is_live,
        }
        tmp.push(record)
      })
    }
    return tmp
  }
  res.status(200).json({message: {data: result(), platform: "twitch"}})

}

