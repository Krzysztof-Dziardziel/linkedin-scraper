import {template} from "../templates/profileTemplate";
import {Page} from "puppeteer";
import {scrapeProfileSection} from "../scrapeProfileSection";

export const scrapAccomplishmentPanel = async (page: Page, section: string) => {
    const queryString = `.pv-accomplishments-block.${section} button`

    const openingButton = await page.$(queryString);

    if (openingButton) {
        await page.evaluate((q: any) => {
            document.querySelector(q).click();
        }, queryString);

        //@ts-ignore
        return scrapeProfileSection(page, template[section]);
    }
};