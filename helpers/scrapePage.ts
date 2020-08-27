import {scrapeProfile} from "./profile/scrapeProfile";
import {scrapeRecentActivity} from "./recentActivity/scrapeRecentActivity";
import {scrapeCompany} from "./notreadyyet/scrapeCompany";
import {recentURLToProfile} from "./profile/recentURLToProfile";
import {ScrapePageObject} from "./interfaces/interfaces";
import {ProfileObject} from "./interfaces/profileObjectInterface";

export const scrapePage = async ({browser, url, cookies}: ScrapePageObject) => {
    let profile, recentActivity, company;

    if (url?.includes('/company')) {
        company = await scrapeCompany(browser, cookies, url);
        return {company};
    } else if (url?.includes('/recent-activity')) {
        recentActivity = await scrapeRecentActivity({browser, url, cookies});
        profile = await scrapeProfile({browser, url: recentURLToProfile(url), cookies});
        return {profile, recentActivity};
    } else {
        profile = await scrapeProfile({browser, url, cookies});
        return {profile};
    }

}