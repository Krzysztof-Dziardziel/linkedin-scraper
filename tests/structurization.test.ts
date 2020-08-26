// Original link: 'https://www.linkedin.com/in/danielgustaw/';

import {scrapeProfile} from "../helpers/profile/scrapeProfile";
import {Browser} from "puppeteer";
import {scrapeRecentActivity} from "../helpers/recentActivity/scrapeRecentActivity";
import {scrapeSection} from "../helpers/profile/scrapeSection";
import {openPage} from "../helpers/openPage";

const puppeteer = require('puppeteer');

describe('Parsing works great', () => {
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

    it('Scrape Section', async () => {

        const page = await openPage({browser, url: `file://${__dirname}/files/page.html`})

        const config = {
            main: {
                selector: '.main',
                fields: {
                    prop: '.target'
                }
            }
        };

        const res = await scrapeSection(page, config.main);

        expect(res).toEqual([{main: {prop: 'TARGET'}}])

        console.log(res);

        expect(1).toBeGreaterThan(0);
    })

    xit('For profile', async () => {
        const {profile} = await scrapeProfile({browser, url: `file://${__dirname}/files/profile.html`}, defaultConfig);
        expect(profile.name).toEqual('Daniel Gustaw');
    });

    xit('For profile', async () => {
        const res = await scrapeRecentActivity({
            browser,
            url: `file://${__dirname}/files/activity.html`
        }, defaultConfig);

        console.log(res);

        expect(1).toEqual(1);
    });

});

