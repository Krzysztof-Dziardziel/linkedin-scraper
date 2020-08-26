import {login} from "./login";
import {scrapePage} from "./scrapePage";
import {ScrapeLinkedInObject} from "./interfaces/interfaces";

const puppeteer = require('puppeteer');

export const scrapeLinkedIn = async ({email, password, cookies}: ScrapeLinkedInObject): Promise<any> => {

    const args = {headless: false, args: ['--no-sandbox']};
    let browser = await puppeteer.launch(args);

    try {
        await login({browser, email, password, cookies});
    } catch (e) {
        throw e;
    }

    return (url: string) => scrapePage({browser, url});
}
