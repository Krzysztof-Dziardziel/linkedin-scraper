import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {openPage} from "../openPage";
import {prepareForScraping} from "../prepareForScraping";
import {recentActivityTemplate} from "../templates/recentActivityTemplate";
import {scrapeProfileSection} from "../profile/scrapeProfileSection";

//https://www.linkedin.com/in/some-random-person-123/detail/recent-activity/
//https://www.linkedin.com/in/agata-jakobczak-akademia-face/detail/recent-activity/

export const scrapeRecentActivity = async ({browser, url, cookies}: ScrapeProfileObject): Promise<ProfileObject> => {
    console.warn('EXPERIMENTAL!')
    console.log(`starting scraping recentActivity url: ${url}`)

    let waitTime = 50;

    const page = await openPage({browser, cookies, url})
    const profilePageIndicatorSelector = '.feed-shared-update-v2'
    await page.waitFor(profilePageIndicatorSelector, {timeout: 5000})
        .catch(() => {
            console.error('recentActivity selector was not found')
        })

    await prepareForScraping(page, waitTime);

    const recentActivity = await scrapeProfileSection(page, recentActivityTemplate.recentActivity)

    await page.close()
    console.log(`finished scraping url: ${url}`)


    const rawRecentActivity = {
        recentActivity
    }
//@ts-ignore
//     const cleanedProfile = cleanProfileData(rawProfile)
    return recentActivity

}