import {loginWithCookies} from "./helpers/loginWithCookies";
import {loginWithCredentials} from "./helpers/loginWithCredentials";
import {scrapeProfile} from "./helpers/scrapeProfile";
import {scrapeCompany} from "./helpers/scrapeCompany";
import {scrapeRecentActivity} from "./helpers/scrapeRecentActivity";
import {recentURLToProfile} from "./helpers/recentURLToProfile";

export const login = async ({browser, email, password, cookies, url}:any) => {

    if (cookies) {
        console.log('using cookies, login will be bypassed')
        await loginWithCookies(cookies);
    } else if (email && password) {
        console.log('email and password was provided, we\'re going to login...')
      await loginWithCredentials(browser, email, password)
    }

    switch(url) {
        case url.includes('/in'):
            await scrapeProfile(browser, url, cookies);
            await scrapeRecentActivity(browser, url, cookies);
            break;
        case url.includes('/company'):
            await scrapeCompany(browser, cookies, url);
            break;
        case url.includes('/recent-activity'):
            await scrapeRecentActivity(browser, url, cookies);
            await scrapeProfile(browser, recentURLToProfile(url), cookies);
            break;
        default:
            break;
    }
}
