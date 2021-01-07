import { Request, Response } from 'express'
import { createNewUrl, findUrlCode } from '../services'

export async function handleRedirect(req: Request, res: Response) {
  const { code } = req.params
  // query the datatbase and find one by thhe code
  // if found redirect, if not, return a 404
  const url = await findUrlCode(code)
  return url ? res.redirect(url.url) : res.sendStatus(404)

}

export async function addUrl(req: Request, res: Response) {
  const { url } = req.body
  const newUrl = await createNewUrl(url)
  const domain = "localhost:3001"
  res.render("url.ejs", { url: `http://${domain}/${newUrl.code}` })
}

