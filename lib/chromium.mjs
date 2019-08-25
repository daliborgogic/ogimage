import puppeteer from 'puppeteer'
const executablePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

let _page

async function getPage() {
    if (_page) {
        return _page;
    }

    let options = {
      // ignoreDefaultArgs: ['--disable-extensions'],
      // defaultViewport: null,
      // args: [],
      // headless: true,
      // executablePath: 'node_modules/.local-chromium/'
        executablePath: process.env.CHROMIUM_PATH,
        args: ['--no-sandbox'], // This was important. Can't remember why
    }
    const browser = await puppeteer.launch(options)
    _page = await browser.newPage()
    return _page;
}

export async function getScreenshot(url, type) {
    const page = await getPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.goto(url);
    const file = await page.screenshot({ type })
    return file
}
