import {Page} from "puppeteer";
import {scrollToPageBottom} from "./scrollToPageBottom";
import {seeMoreButtons} from "./seeMoreButtons";

export const prepareForScraping = async (page: Page, waitTime: number) => {
    console.log('scrolling page to the bottom')
    await scrollToPageBottom(page)

    if (waitTime) {
        console.log(`applying 1st delay`)
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, waitTime / 2)
        })
    }

    await seeMoreButtons(page)

    if (waitTime) {
        console.log(`applying 2nd (and last) delay`)
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, waitTime / 2)
        })
    }
}