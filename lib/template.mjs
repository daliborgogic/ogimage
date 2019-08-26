import { readFileSync } from 'fs'
import marked from 'marked'
import { sanitizeHtml } from './sanitizer.mjs'
import twemoji from'twemoji'
import path from 'path'
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = text => twemoji.parse(text, twOptions)
const __dirname = path.resolve()

const rglr = readFileSync(`${__dirname}/fonts/Inter-Regular.woff2`).toString('base64')
const bold = readFileSync(`${__dirname}/fonts/Inter-Bold.woff2`).toString('base64')
const mono = readFileSync(`${__dirname}/fonts/Vera-Mono.woff2`).toString('base64')

function getCss(theme, fontSize) {
  let background = 'white'
  let foreground = 'black'
  let radial = 'rgba(0,0,0,0.12)'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
    radial = 'rgba(255,255,255,0.12)'
  }
  return `
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: bold;
    src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
  }
  @font-face {
    font-family: 'Vera';
    font-style: normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
  }
  body {
    background: ${background};
    background-image: radial-gradient(${radial} 10%, transparent 0);
    background-size: 32px 32px;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  code {
    color: #D400FF;
    font-family: 'Vera';
    white-space: pre-wrap;
    letter-spacing: -5px;
  }
  code:before, code:after {
    content: '\`';
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    align-content: center;
    margin: 0 150px;
  }
  .logo {
    margin-right: 36px;
  }
  .plus {
    color: #BBB;
    font-family: Times New Roman, Verdana;
    font-size: 100px;
    margin-right: 36px;
  }
  .spacer {
    margin: 75px 150px;
  }
  .emoji {
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
  }

  .heading {
    font-family: 'Inter', sans-serif;
    font-size: ${sanitizeHtml(fontSize)};
    font-style: normal;
    color: ${foreground};
    line-height: 1.8;
  }`;
}

export function getHtml(parsedReq) {
  const { text, theme, md, fontSize, images, widths, heights } = parsedReq
  return `<!DOCTYPE html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${getCss(theme, fontSize)}
  </style>
  <div>
    <div class="spacer">
    <div class="logo-wrapper">
      ${images.map((img, i) =>
        getPlusSign(i) + getImage(img, widths[i], heights[i])
      ).join('')}
    </div>
    <div class="spacer">
    <div class="heading">
      ${emojify(md ? marked(text) : sanitizeHtml(text))}
    </div>
  </div>
  `
}

function getImage(src, width ='auto', height = '256') {
  return `<img
      class="logo"
      alt="Generated Image"
      src="${sanitizeHtml(src)}"
      width="${sanitizeHtml(width)}"
      height="${sanitizeHtml(height)}"
  />`
}

function getPlusSign(i) {
  return i === 0 ? '' : '<div class="plus">+</div>'
}
