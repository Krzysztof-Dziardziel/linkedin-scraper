import * as puppeteer from 'puppeteer'

export const scrapeLinkedIn = async ({email, password, cookies}) => {

  const args = Object.assign({ headless: isHeadless, args: ['--no-sandbox'] }, puppeteerArgs)
  let browser = await puppeteer.launch(args)

    try {
      await login(browser, email, password, logger)
    } catch (e) {
      if (!endpoint) {
        await browser.close()
      }
      throw e
    }

  return (url, waitMs) => url.includes('/school/') || url.includes('/company/') ? company(browser, cookies, url, waitMs, hasToGetContactInfo, puppeteerAuthenticate)
    : profile(browser, cookies, url, waitMs, hasToGetContactInfo, puppeteerAuthenticate)
}
