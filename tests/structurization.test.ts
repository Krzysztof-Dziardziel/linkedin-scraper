// Original link: 'https://www.linkedin.com/in/danielgustaw/';

import {scrapeProfile} from "../helpers/profile/scrapeProfile";
import {Browser} from "puppeteer";
import {scrapeRecentActivity} from "../helpers/recentActivity/scrapeRecentActivity";
import {openPage} from "../helpers/openPage";
import {scrapeSection} from "../helpers/scrapeSection";

const puppeteer = require('puppeteer');

describe('Parsing works great', () => {
    let browser: Browser;

    const defaultConfig = {
        getContact: false,
        timeout: 0,
        waitTime: 0
    };


    // it('Scrape Section', async () => {
    //
    //     const page = await openPage({browser, url: `file://${__dirname}/files/page.html`})
    //
    //     const config = {
    //         main: {
    //             selector: '.main',
    //             fields: {
    //                 prop: '.target'
    //             }
    //         }
    //     };
    //
    //     const res = await scrapeSection(page, config.main);
    //
    //     expect(res).toEqual([{main: {prop: 'TARGET'}}])
    //
    //     console.log(res);
    //
    //     expect(1).toBeGreaterThan(0);
    // })

    it('For profile', async () => {
        const args = {headless: true, args: ['--no-sandbox']};
        browser = await puppeteer.launch(args);
        const {profile} = await scrapeProfile({browser, url: `file://${__dirname}/files/profile.html`}, defaultConfig);
        expect(profile.name).toEqual('Daniel Gustaw');
        await browser.close();
    });

    it('For recentActivity', async () => {
        const args = {headless: true, args: ['--no-sandbox']};
        browser = await puppeteer.launch(args);
        const res = await scrapeRecentActivity({
            browser,
            url: `file://${__dirname}/files/activity.html`
        }, defaultConfig);

        expect(1).toEqual(1);
        await browser.close();
    });

});

