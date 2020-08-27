import {scrapeLinkedIn} from "./helpers/scrapeLinkedIn";
import {sendDataToDB} from "./helpers/database/sendDataToDB"
const debug = require('debug')('linkedin')
require('dotenv').config();

(async () => {
    const mongoDBSync = false;
    const profileScraper = await scrapeLinkedIn({
        email: process.env.LINKEDIN_EMAIL,
        password: process.env.LINKEDIN_PASSWORD
    });
    const data = await profileScraper(`https://www.linkedin.com/in/williamhgates/detail/recent-activity/`);
    debug(data)
    if (mongoDBSync) await sendDataToDB(data);
    return;
})()