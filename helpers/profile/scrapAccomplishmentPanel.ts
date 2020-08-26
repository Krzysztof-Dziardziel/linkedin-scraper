import {Page} from "puppeteer";
import {scrapeProfileSection} from "./scrapeProfileSection";
import {profileTemplate} from "../templates/profileTemplate";

export const scrapAccomplishmentPanel = async (page: Page, section: string) => {
    const queryString = `.pv-accomplishments-block.${section} button`

    const openingButton = await page.$(queryString);

    if (openingButton) {
        await page.evaluate((q: any) => {
            document.querySelector(q).click();
        }, queryString);

        //@ts-ignore
        return scrapeProfileSection(page, profileTemplate[section]);
    }
};