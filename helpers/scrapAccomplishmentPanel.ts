import {scrapSection} from "./scrapSection";
import {template} from "./profileTemplate";

export const scrapAccomplishmentPanel = async (page: any, section: any) => {
    const queryString = `.pv-accomplishments-block.${section} button`

    const openingButton = await page.$(queryString);

    if (openingButton) {
        await page.evaluate((q: any) => {
            document.querySelector(q).click();
        }, queryString);

        //@ts-ignore
        return scrapSection(page, template[section]);
    }
};