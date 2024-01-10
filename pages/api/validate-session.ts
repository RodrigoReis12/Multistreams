import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}

const twitch_endpoint = "https://id.twitch.tv/oauth2/validate"
const youtube_endpoint = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const token = req.headers.authorization;
  const { method, query } = req;
  const platform = query.platform;


  const validate = async () => {
    switch (platform) {
      case "twitch": {
        const response = await fetch(twitch_endpoint, {
          headers: {
            "Authorization": token,
          }
        })
        console.log(response.json())
        if(!response.ok) {
          res.status(401).json({message: "No valid token"})
        } else {
          res.status(200).json({message: "Valid token"})
        }
        break;
      }
      case "youtube": {
        const response = await fetch(youtube_endpoint, {
          headers: {
            "Authorization": token,
          }
        })
        console.log(response.json())
        if(!response.ok) {
          res.status(401).json({message: "No valid token"})
        } else {
          res.status(200).json({message: "Valid token"})
        }
        break;
      }
    }
  }
  validate();
}