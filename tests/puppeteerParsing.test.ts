// Original link: 'https://www.linkedin.com/in/danielgustaw/';

import {scrapeProfile} from "../helpers/profile/scrapeProfile";
import {Browser} from "puppeteer";
import {scrapeRecentActivity} from "../helpers/recentActivity/scrapeRecentActivity";
import {openPage} from "../helpers/openPage";
import {scrapeProfileSection} from "../helpers/scrapeProfileSection";
import {getRecentActivityFields} from "../helpers/recentActivity/getRecentActivityFields";
import {recentActivityTemplate} from "../helpers/templates/recentActivityTemplate";

const puppeteer = require('puppeteer');

describe('Puppeteer parsing works.', () => {
    let browser: Browser;

    const defaultConfig = {
        getContact: false,
        timeout: 0,
        waitTime: 0
    };

    beforeAll(async () => {
        const args = {headless: true, args: ['--no-sandbox']};
        browser = await puppeteer.launch(args);
    })

    afterAll(async () => {
        await browser.close();

    })

    it('Puppeteer selectors works', async () => {

        const page = await openPage({browser, url: `file://${__dirname}/files/page.html`})

        const target = await page.$('.target');

        expect(target).not.toBeNull();

        if (target) {
            const text = await (await target.getProperty('textContent')).jsonValue();
            expect(text).toEqual('TARGET');

        }
    });

    it('Scrape mock section', async () => {

        const page = await openPage({browser, url: `file://${__dirname}/files/page.html`})

        const config = {
            main: {
                selector: '.main',
                fields: {
                    prop: '.target'
                }
            }
        };

        const res = await scrapeProfileSection(page, config.main);

        expect(res).toStrictEqual([{prop: 'TARGET'}])
    })

    it('For profile', async () => {
        const {profile} = await scrapeProfile({browser, url: `file://${__dirname}/files/profile.html`}, defaultConfig);
        expect(profile.name).toEqual('Daniel Gustaw');
    });

    it('For recentActivity', async () => {
        const res = await scrapeRecentActivity({
            browser,
            url: `file://${__dirname}/files/activity.html`
        }, defaultConfig);

        expect(Array.isArray(res)).toBeTruthy();

        expect(res.some((e:any) => e.activity.match(/Daniel Gustaw/))).toBeTruthy();
    });

    it('Activity from scratch', async () => {

        const page = await openPage({browser, url: `file://${__dirname}/files/activity.html`})

        let s = recentActivityTemplate.selector;

        const target = await page.$$(s);

        const fields = await Promise.all(target.map(el => el.$(recentActivityTemplate.fields.activity)))

        expect(fields.length).toBeGreaterThan(0);

        if (fields.length) {

            const field: any = fields[0];
            expect(Boolean(field)).toBeTruthy();

            const text = await (await field.getProperty('textContent')).jsonValue();
            expect(text).toStrictEqual('Daniel Gustaw skomentował(a) to');

        }
    });
});