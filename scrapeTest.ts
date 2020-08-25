import {scrapeLinkedIn} from "./helpers/scrapeLinkedIn";
require('dotenv').config();

(async () => {
    const profileScraper = await scrapeLinkedIn({
        email: process.env.LINKEDIN_EMAIL,
        password: process.env.LINKEDIN_PASSWORD
    });
    let data = await profileScraper(process.env.LINKEDIN_EXAMPLE_PROFILE);
})()