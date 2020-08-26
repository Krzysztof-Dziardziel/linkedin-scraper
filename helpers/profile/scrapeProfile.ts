import {openPage} from "../openPage";
import {profileTemplate} from "../templates/profileTemplate";
import {scrapAccomplishmentPanel} from "./scrapAccomplishmentPanel";
import {getContactInfo} from "./getContactInfo";
import {cleanProfileData} from "./cleanProfileData";
import {ScrapeProfileObject} from "../interfaces/interfaces";
import {ProfileObject} from "../interfaces/profileObjectInterface";
import {prepareForScraping} from "../prepareForScraping";
import {scrapeSection} from "../scrapeSection";

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
