import { parseRequest } from './lib/parser.mjs'
import { getScreenshot } from './lib/chromium.mjs'
import { getHtml } from './lib/template.mjs'
import { writeTempFile, pathToFileURL } from './lib/file.mjs'

const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'
import express from 'express'
const app = express()

async function handler(req, res) {
  try {
    const parsedReq = parseRequest(req)
    const html = getHtml(parsedReq)
    if (isHtmlDebug) {
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
        return
    }
    const { text, fileType } = parsedReq
    const filePath = await writeTempFile(text, html);
    const fileUrl = pathToFileURL(filePath);
    const file = await getScreenshot(fileUrl, fileType)
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
    res.end(file)
  } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html')
      res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
      console.error(error)
  }
}

app.get('*', async(req, res) => {
  const x = await handler(req, res)
  res.status(200).send(x)
})

app.listen(3000)

export default app
