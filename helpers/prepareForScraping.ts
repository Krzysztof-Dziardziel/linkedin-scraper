import {Page} from "puppeteer";
import {scrollToPageBottom} from "./scrollToPageBottom";
import {seeMoreButtons} from "./seeMoreButtons";
const debug = require('debug')('linkedin')

export const prepareForScraping = async (page: Page, waitTime: number) => {
    debug('scrolling page to the bottom')
    await scrollToPageBottom(page)

    if (waitTime) {
        debug(`applying 1st delay`)
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, waitTime / 2)
        })
    }

    await seeMoreButtons(page)

    if (waitTime) {
        debug(`applying 2nd (and last) delay`)
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, waitTime / 2)
        })
    }
}