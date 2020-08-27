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

    it('Profile details', async () => {
        const {profile} = await scrapeProfile({browser, url: `file://${__dirname}/files/profile.html`}, defaultConfig);
        expect(profile).toEqual({
            "connections": "500+ kontaktów",
            "headline": "Właściciel w Precise Lab - Software House | Wykładowca w Coders Lab | Back-end Senior Developer",
            "location": "Warszawa, Woj. Mazowieckie, Polska",
            "name": "Daniel Gustaw",
            "profile_url": `file://${__dirname}/files/profile.html`,
            "summary": "Programowanie to moja pasja, którą rozwijam od ponad 10 lat. Razem z przyjaciółmi prowadzę dom programistyczny, w którym tworzymy nowoczesne rozwiązania dla biznesu, optymalizujące czas pracy i maksymalizujące zyski w przedsiębiorstwach."
        });
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