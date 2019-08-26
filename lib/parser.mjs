import { parse } from 'url'

export function parseRequest(req) {
    console.log('HTTP ' + req.url)
    const { pathname = '/', query = {} } = parse(req.url || '', true)
    const { fontSize, images, widths, heights, theme, slice = 1, md } = query

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize')
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme')
    }

    const arr = pathname.slice(parseInt(slice)).split('.')
    let extension = ''
    let text = ''
    if (arr.length === 0) {
      text = ''
    } else if (arr.length === 1) {
      text = arr[0]
    } else {
      extension = arr.pop()
      text = arr.join('.')
    }

    const parsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    }
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme)
    return parsedRequest
}

function getArray(stringOrArray) {
  return Array.isArray(stringOrArray)
    ? stringOrArray
    : [stringOrArray]
}

function getDefaultImages(images, theme) {
  console.log('Images: ', images)
  if (images.length > 0 && images[0] && images[0].startsWith('https://daliborgogic.com/')) {
    return images
  }
  return theme === 'light'
    ? ['https://daliborgogic.com/ogimage/dlbr-black.svg']
    : ['https://daliborgogic.com/ogimage/dlbr-white.svg']
}
