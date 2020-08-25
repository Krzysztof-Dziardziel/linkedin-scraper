import {openPage} from "../openPage";
import {scrollToPageBottom} from "./scrollToPageBottom";

export const scrapeProfile = async (browser:any, cookies:any, url:string) => {
    console.log(`starting scraping url: ${url}`)
    let waitTime = 50

    const page = await openPage({ browser, cookies, url})
    const profilePageIndicatorSelector = '.pv-profile-section'
    await page.waitFor(profilePageIndicatorSelector, { timeout: 5000 })
        .catch(() => {
            console.error('profile selector was not found')
        })

    console.log('scrolling page to the bottom')
    await scrollToPageBottom(page)

    if(waitTime) {
        console.log(`applying 1st delay`)
        await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTime / 2)})
    }

    await seeMoreButtons.clickAll(page)

    if(waitTime) {
        console.log(`applying 2nd (and last) delay`)
        await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTime / 2)})
    }

    const [profile] = await scrapSection(page, template.profile)
    const [about] = await scrapSection(page, template.about)
    const positions = await scrapSection(page, template.positions)
    const educations = await scrapSection(page, template.educations)
    const [recommendationsCount] = await scrapSection(page, template.recommendationsCount)
    const recommendationsReceived = await scrapSection(page, template.recommendationsReceived)
    const recommendationsGiven = await scrapSection(page, template.recommendationsGiven)
    const skills = await scrapSection(page, template.skills)
    const accomplishments = await scrapSection(page, template.accomplishments)
    const courses = await scrapAccomplishmentPanel(page, 'courses')
    const languages = await scrapAccomplishmentPanel(page, 'languages')
    const projects = await scrapAccomplishmentPanel(page, 'projects')
    const volunteerExperience = await scrapSection(page, template.volunteerExperience)
    const peopleAlsoViewed = await scrapSection(page, template.peopleAlsoViewed)
    const contact = hasToGetContactInfo ? await contactInfo(page) : []

    await page.close()
    console.log(`finished scraping url: ${url}`)

    const rawProfile = {
        profile,
        about,
        positions,
        educations,
        skills,
        recommendations: {
            givenCount: recommendationsCount ? recommendationsCount.given : "0",
            receivedCount: recommendationsCount ? recommendationsCount.received : "0",
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

    const cleanedProfile = cleanProfileData(rawProfile)
    return cleanedProfile
}
