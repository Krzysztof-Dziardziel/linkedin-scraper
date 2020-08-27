import {scrapeLinkedIn} from "./helpers/scrapeLinkedIn";
const debug = require('debug')('linkedin')
require('dotenv').config();

(async () => {
    const mongoDBSync = true;
    const profileScraper = await scrapeLinkedIn({
        email: process.env.LINKEDIN_EMAIL,
        password: process.env.LINKEDIN_PASSWORD
    });
    const data = await profileScraper(process.env.LINKEDIN_EXAMPLE_PROFILE);
    debug(data)
    // if (mongoDBSync) await sendDataToDB(data);
})()