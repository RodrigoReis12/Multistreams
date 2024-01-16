import type { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'

type ResponseData = {
  message: any
}

const endpoint = "https://id.twitch.tv/oauth2/validate"
const streams_endpoint = "https://api.twitch.tv/helix/streams?type=live&first=10"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const token: any = req.headers.authorization
  const response = await fetch(endpoint, {
    headers: {
      "Authorization": token
    }
  }).then((res) => res.json())
  .then((data) => {
    const bearer = _.replace(token, "OAuth", "Bearer")
    fetch(streams_endpoint, {
      headers: {
        "Authorization": bearer,
        "Client-id": data.client_id,
      }
    }).then((tmp) => tmp.json())
    .then((result) => {
      var old = JSON.stringify(result)
      old = _.replace(old, new RegExp("{width}", "g"), "320")
      old = _.replace(old, new RegExp("{height}", "g"), "180")
      var output = JSON.parse(old)
      res.status(200).json({message: { data: output.data, platform: "twitch"}}) 
    })
  })
}