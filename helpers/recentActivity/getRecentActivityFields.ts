import {Page} from "puppeteer";
import {recentActivityTemplate} from "../templates/recentActivityTemplate";
import {fieldToText} from "./fieldToText";

export const getRecentActivityFields = async (page: Page) => {
    const selector = recentActivityTemplate.selector;
    const target = await page.$$(selector);
    let fields = await Promise.all(target.map(async(el) => {
        return {
            activity: await fieldToText(await el.$(recentActivityTemplate.fields.activity)),
            post_author: await fieldToText(await el.$(recentActivityTemplate.fields.post_author)),
            post_author_description: await fieldToText(await el.$(recentActivityTemplate.fields.post_author_description)),
            post_date: await fieldToText(await el.$(recentActivityTemplate.fields.post_date)),
            post_text: await fieldToText(await el.$(recentActivityTemplate.fields.post_text)),
            // @ts-ignore
            reaction_count: parseInt(await fieldToText(await el.$(recentActivityTemplate.fields.reaction_count))),
            // @ts-ignore
            comments_count: parseInt((await fieldToText(await el.$(recentActivityTemplate.fields.comments_count)))?.replace(/\D/g, '')),
            highlighted_comment: {
                comment_author: await fieldToText(await el.$(recentActivityTemplate.fields.highlighted_comment.comment_author)),
                comment_author_description: await fieldToText(await el.$(recentActivityTemplate.fields.highlighted_comment.comment_author_description)),
                comment_text: await fieldToText(await el.$(recentActivityTemplate.fields.highlighted_comment.comment_text)),
                // @ts-ignore
                likes: parseInt(await fieldToText(await el.$(recentActivityTemplate.fields.highlighted_comment.likes))) || 0,
            }
        }
    }));

    if(fields) {return fields}
}