import {openPage} from "../openPage";
import {template} from "../templates/profileTemplate";
import {scrapAccomplishmentPanel} from "./scrapAccomplishmentPanel";
import {getContactInfo} from "./getContactInfo";
import {cleanProfileData} from "./cleanProfileData";
import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {prepareForScraping} from "../prepareForScraping";
import {scrapeProfileSection} from "../scrapeProfileSection";

export const scrapeProfile = async ({browser, url, cookies}: ScrapeProfileObject): Promise<ProfileObject> => {
    console.log(`starting scraping url: ${url}`)
    let waitTime = 50

    const page = await openPage({browser, cookies, url})
    const profilePageIndicatorSelector = '.pv-profile-section'
    await page.waitFor(profilePageIndicatorSelector, {timeout: 5000})
        .catch(() => {
            console.error('profile selector was not found')
        })

    await prepareForScraping(page, waitTime);

    const [profile] = await scrapeProfileSection(page, template.profile)
    const [about] = await scrapeProfileSection(page, template.about)
    const positions = await scrapeProfileSection(page, template.positions)
    const educations = await scrapeProfileSection(page, template.educations)
    const [recommendationsCount] = await scrapeProfileSection(page, template.recommendationsCount)
    const recommendationsReceived = await scrapeProfileSection(page, template.recommendationsReceived)
    const recommendationsGiven = await scrapeProfileSection(page, template.recommendationsGiven)
    const skills = await scrapeProfileSection(page, template.skills)
    const accomplishments = await scrapeProfileSection(page, template.accomplishments)
    const courses = await scrapAccomplishmentPanel(page, 'courses')
    const languages = await scrapAccomplishmentPanel(page, 'languages')
    const projects = await scrapAccomplishmentPanel(page, 'projects')
    const volunteerExperience = await scrapeProfileSection(page, template.volunteerExperience)
    const peopleAlsoViewed = await scrapeProfileSection(page, template.peopleAlsoViewed)
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
