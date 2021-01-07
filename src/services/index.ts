import URLMap from '../database/schema/URLMap'
import { v4 as uuidv4 } from 'uuid'

export async function findUrlCode(code: string) {
  return URLMap.findOne({ code })
}

export async function createNewUrl(url: string) {
  let code = uuidv4().split("-").shift()
  let urlDB = await URLMap.findOne({ code })
  while (urlDB) {
    code = uuidv4().split("-").shift()
    urlDB = await URLMap.findOne({ code })
  }
  const newUrl = new URLMap({ url, code })
  return newUrl.save()
}