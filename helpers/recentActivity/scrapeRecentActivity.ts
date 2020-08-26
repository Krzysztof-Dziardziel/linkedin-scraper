import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {openPage} from "../openPage";
import {template} from "../templates/profileTemplate";
import {scrapAccomplishmentPanel} from "../profile/scrapAccomplishmentPanel";
import {getContactInfo} from "../profile/getContactInfo";
import {cleanProfileData} from "../profile/cleanProfileData";
import {prepareForScraping} from "../prepareForScraping";


export const scrapeRecentActivity = async ({browser, url, cookies}: ScrapeProfileObject): Promise<ProfileObject> => {
    console.warn('EXPERIMENTAL!')
    console.log(`starting scraping recentActivity url: ${url}`)

    let waitTime = 50;

    const page = await openPage({browser, cookies, url})
    const profilePageIndicatorSelector = '.feed-shared-update-v2'
    await page.waitFor(profilePageIndicatorSelector, {timeout: 5000})
        .catch(() => {
            console.error('recentActivity selector was not found')
        })

    await prepareForScraping(page, waitTime);

    const [profile] = await scrapeRecentActivitySection(page, template.profile)
    const [about] = await scrapeRecentActivitySection(page, template.about)
    const positions = await scrapeRecentActivitySection(page, template.positions)
    const educations = await scrapeRecentActivitySection(page, template.educations)
    const [recommendationsCount] = await scrapeRecentActivitySection(page, template.recommendationsCount)
    const recommendationsReceived = await scrapeRecentActivitySection(page, template.recommendationsReceived)
    const recommendationsGiven = await scrapeRecentActivitySection(page, template.recommendationsGiven)
    const skills = await scrapeRecentActivitySection(page, template.skills)
    const accomplishments = await scrapeRecentActivitySection(page, template.accomplishments)
    const courses = await scrapAccomplishmentPanel(page, 'courses')
    const languages = await scrapAccomplishmentPanel(page, 'languages')
    const projects = await scrapAccomplishmentPanel(page, 'projects')
    const volunteerExperience = await scrapeRecentActivitySection(page, template.volunteerExperience)
    const peopleAlsoViewed = await scrapeRecentActivitySection(page, template.peopleAlsoViewed)
    const contact = await getContactInfo(page)

    await page.close()
    console.log(`finished scraping url: ${url}`)


    const rawProfile = {
        profile,
        about,
        positions,
        educations,
        skills,
        recommendations: {
            //@ts-ignore
            givenCount: recommendationsCount.given || "0",
            //@ts-ignore
            receivedCount: recommendationsCount.received || "0",
            given: recommendationsReceived,
            received: recommendationsGiven
        },
        accomplishments,
        courses,
        languages,
        projects,
        peopleAlsoViewed,
        volunteerExperience,
        contact
    }
//@ts-ignore
    const cleanedProfile = cleanProfileData(rawProfile)
    return cleanedProfile

}