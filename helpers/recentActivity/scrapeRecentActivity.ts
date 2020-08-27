import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {openPage} from "../openPage";
import {prepareForScraping} from "../prepareForScraping";
import {recentActivityTemplate} from "../templates/recentActivityTemplate";
import {ScrapeConfig} from "../profile/scrapeProfile";
import {scrapeProfileSection} from "../scrapeProfileSection";
import {getRecentActivityFields} from "./getRecentActivityFields";

//https://www.linkedin.com/in/some-random-person-123/detail/recent-activity/
//https://www.linkedin.com/in/agata-jakobczak-akademia-face/detail/recent-activity/

export const scrapeRecentActivity = async (
    {browser, url, cookies}: ScrapeProfileObject,
    {waitTime, timeout}: ScrapeConfig = {getContact: true, waitTime: 50, timeout: 5000}
): Promise<any> => {
    const page = await openPage({browser, cookies, url})

    if(timeout) {
        const profilePageIndicatorSelector = '.feed-shared-update-v2'
        await page.waitFor(profilePageIndicatorSelector, {timeout: 5000})
            .catch(() => {
                console.error('recentActivity selector was not found')
            })

        await prepareForScraping(page, waitTime);
    }
    const recentActivity = await getRecentActivityFields(page)
    await page.close()
    return recentActivity
}
