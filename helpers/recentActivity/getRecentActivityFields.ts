import {Page} from "puppeteer";
import {recentActivityTemplate} from "../templates/recentActivityTemplate";
import {fieldToText} from "./fieldToText";

export const getRecentActivityFields = async (page: Page) => {
    const selector = recentActivityTemplate.recentActivity.selector;
    const target = await page.$$(selector);
    let fields = await Promise.all(target.map(async(el) => {
        return {
            activity: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.activity)),
            post_author: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.post_author)),
            post_author_description: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.post_author_description)),
            post_text: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.post_text)),
            reaction_count: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.reaction_count)),
            comments_count: await fieldToText(await el.$(recentActivityTemplate.recentActivity.fields.comments_count)),
        }
    }));

    if(fields) {return fields}
}