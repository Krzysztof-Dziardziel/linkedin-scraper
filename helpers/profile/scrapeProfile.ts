import {openPage} from "../openPage";
import {profileTemplate} from "../templates/profileTemplate";
import {scrapAccomplishmentPanel} from "./scrapAccomplishmentPanel";
import {getContactInfo} from "./getContactInfo";
import {cleanProfileData} from "./cleanProfileData";
import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {prepareForScraping} from "../prepareForScraping";
import {scrapeSection} from "./scrapeSection";

export interface ScrapeConfig {
    getContact: boolean,
    waitTime: number,
    timeout: number
}

export const scrapeProfile = async (
    {browser, url, cookies}: ScrapeProfileObject,
    {getContact, waitTime, timeout}: ScrapeConfig = {getContact: true, waitTime: 50, timeout: 5000}
): Promise<ProfileObject> => {
    // console.log(`starting scraping url: ${url}`)

    const page = await openPage({browser, cookies, url})

    if (timeout) {

        const profilePageIndicatorSelector = '.pv-profile-section'
        await page.waitFor(profilePageIndicatorSelector, {timeout})
            .catch(() => {
                console.error('profile selector was not found')
            })

        await prepareForScraping(page, waitTime);

    }

    const [profile] = await scrapeSection(page, profileTemplate.profile)
    const [about] = await scrapeSection(page, profileTemplate.about)
    const positions = await scrapeSection(page, profileTemplate.positions)
    const educations = await scrapeSection(page, profileTemplate.educations)
    const [recommendationsCount] = await scrapeSection(page, profileTemplate.recommendationsCount)
    const recommendationsReceived = await scrapeSection(page, profileTemplate.recommendationsReceived)
    const recommendationsGiven = await scrapeSection(page, profileTemplate.recommendationsGiven)
    const skills = await scrapeSection(page, profileTemplate.skills)
    const accomplishments = await scrapeSection(page, profileTemplate.accomplishments)
    const courses = await scrapAccomplishmentPanel(page, 'courses')
    const languages = await scrapAccomplishmentPanel(page, 'languages')
    const projects = await scrapAccomplishmentPanel(page, 'projects')
    const volunteerExperience = await scrapeSection(page, profileTemplate.volunteerExperience)
    const peopleAlsoViewed = await scrapeSection(page, profileTemplate.peopleAlsoViewed)
    const contact = getContact ? await getContactInfo(page) : undefined;

    await page.close()
    // console.log(`finished scraping url: ${url}`)


    const rawProfile: ProfileObject = {
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

    return cleanProfileData(rawProfile)
}
