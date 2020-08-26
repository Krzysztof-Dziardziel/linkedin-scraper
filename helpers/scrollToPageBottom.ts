export const scrollToPageBottom = async (page: any) => {
    const maxNumberOfScrolls = 25;
    const timeBetweenScrolls = 500;
    const pageBottomSelector = '#expanded-footer'

    for (let i = 0; i < maxNumberOfScrolls; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight))

        const hasReachedEnd = await page.waitForSelector(pageBottomSelector, {
            visible: true,
            timeout: timeBetweenScrolls
        }).catch(() => {
            console.log(`scrolling to page bottom (${i + 1})`)
        })

        if (hasReachedEnd) {
            return
        }
    }
    console.error('page bottom not found')
}
