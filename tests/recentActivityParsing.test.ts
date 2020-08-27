import {Browser} from "puppeteer";
import {getRecentActivityFields} from "../helpers/recentActivity/getRecentActivityFields";
import {openPage} from "../helpers/openPage";
const puppeteer = require('puppeteer')

describe('Parsing using getRecentActivityFields works.', () => {
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

    it('Activity using getRecentActivityFields', async () => {
        const page = await openPage({browser, url: `file://${__dirname}/files/activity.html`})
        const fields = await getRecentActivityFields(page);
        // @ts-ignore
        expect(fields[0].activity).toStrictEqual('Daniel Gustaw skomentował(a) to');
    });

    it('Post with commentsusing getRecentActivityFields', async  () => {
        const page = await openPage({browser, url: `file://${__dirname}/files/activity.html`})
        const posts = await getRecentActivityFields(page);

        // @ts-ignore
        console.log(posts[0]);

        // @ts-ignore
        expect(posts[0]).toStrictEqual({
            "activity": "Daniel Gustaw skomentował(a) to",
            "post_author": "Robert Strzelecki",
            "post_author_description": "CEO and Co-founder of the TenderHut Group. Entrepreneur, investor, and business developer. Let’s talk about growth.",
            "post_date": "2 miesiące temu",
            "post_text": "💡Stało się. Wypuszczam Holo4Labs spod moich skrzydeł. Zapowiadana zbiórka crowdfundingowa startuje 8 czerwca. To już w ten poniedziałek.🥽Holo4Labs to jeden z moich ulubionych corpupów, to „Raport Mniejszości” w wersji laboratoryjnej. Produkt, który wprowadza Mixed Reality do laboratoriów i sprawia, że przyszłość dzieje się teraz. Laboranci pracujący w goglach na głowie, głosowo wprowadzający dane do systemu i przesuwający hologramy na niekończącej się przestrzeni 3D przed oczami. To cyfrowa transformacja #LabTech!✨Ja już zainwestowałem, a teraz zapraszam Was, abyście do mnie, a właściwie do nas, dołączyli. 😊Cel minimalny zbiórki to 0,8 mln zł, ale przy większym zainteresowaniu inwestorów podniesiemy wartość oferty maksymalnie do 1,2 mln zł.💡 Zapraszam do przeczytania wywiadu z CEO Holo4Labs Przemyslaw Budnicki w Puls Biznesu:➡️ https://lnkd.in/dK5VnenTo pierwsza nasza crowdfundingowa przygoda. W kolejce czekają: Zonifero, Holo4Traige, Noacon.Trzymajcie za nas kciuki i dołączajcie do cyfrowej rewolucji. 👍",
            "reaction_count": 69,
            "comments_count": 11,
            "highlighted_comment": {
                "comment_author": "Daniel GustawTy",
                "comment_author_description": "Właściciel w Precise Lab - Software House | Wykładowca w Coders Lab | Back-end Senior Developer",
                "comment_date": "2 mies.",
                "comment_text": "Trzymam kciuki!",
                "likes": 0,
            },
        })
    })
});