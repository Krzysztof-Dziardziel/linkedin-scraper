import {scrapeProfile} from "./scrapeProfile";
import {scrapeRecentActivity} from "./scrapeRecentActivity";
import {scrapeCompany} from "./notreadyyet/scrapeCompany";
import {recentURLToProfile} from "./recentURLToProfile";

interface scrapePageObject {
    browser: any,
    url: string,
    cookies?: any
}

export const scrapePage = async ({browser, url, cookies}: scrapePageObject) => {
    let profile, recentActivity, company;
    if (url?.includes('/in')) {
        profile = await scrapeProfile({browser, url, cookies});
        recentActivity = await scrapeRecentActivity(browser, url, cookies);
        return {profile, recentActivity};
    }

    if (url?.includes('/company')) {
        await scrapeCompany(browser, cookies, url);
    }

    if (url?.includes('/recent-activity')) {
        await scrapeRecentActivity(browser, url, cookies);
        await scrapeProfile({browser, url: recentURLToProfile(url), cookies});
    }

}