import * as dotenv from "dotenv"

dotenv.config()

export const getUrl = () => {
  return `${process.env.URL_API}`
}