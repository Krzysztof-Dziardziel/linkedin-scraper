
export const scrollToPageBottom = async (page:any) => {
  const MAX_TIMES_TO_SCROLL = 25
  const TIMEOUT_BETWEEN_SCROLLS = 500
  const PAGE_BOTTOM_SELECTOR_STRING = '#expanded-footer'

  for (let i = 0; i < MAX_TIMES_TO_SCROLL; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))

    const hasReachedEnd = await page.waitForSelector(PAGE_BOTTOM_SELECTOR_STRING, {
      visible: true,
      timeout: TIMEOUT_BETWEEN_SCROLLS
    }).catch(() => {
      console.log(`scrolling to page bottom (${i + 1})`)
    })

    if (hasReachedEnd) {
      return
    }
  }

  console.error('page bottom not found')
}
