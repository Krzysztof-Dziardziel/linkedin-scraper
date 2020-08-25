export interface ProfileObject {
    profile: Profile,
    about: About,
    positions: Position[],
    educations: Education[],
    skills: Skill[],
    recommendations: Recommendations,
    courses?: any
    accomplishments: Accomplishment[],
    languages: Language[],
    projects: Project[],
    peopleAlsoViewed: PeopleAlsoViewedObject[],
    volunteerExperience: any,
    contact: ContactObject[]
}

interface Profile {
    name: string,
    headline: string,
    location: string,
    connections: string,
    imageurl: string,
    summary: string
}

interface About {
    text: string
}

interface Position {
    title: string,
    link: string,
    url: string,
    companyName: string,
    location: string,
    description: string,
    date1: string,
    date2: string
}

interface Education {
    title: string,
    degree: string,
    url: string,
    fieldOfStudy: string,
    date1: string,
    date2: string
}

interface Skill {
    title: string,
    count: string
}

interface Recommendations {
    givenCount: string,
    receivedCount: string,
    given: Recommendation[],
    received: Recommendation[],
}

interface Recommendation {
    user: string,
    text: string,
    profileImage: string,
    name: string,
    userDescription: string
}

interface Accomplishment {
    count: string,
    title: string,
    items: string[]
}

interface Language {
    name: string
}

interface Project {
    name: string,
    date: string,
    description: string,
    link: string
}

interface PeopleAlsoViewedObject {
    user: string,
    text: string,
    profileImage: string,
    name: string
}

interface ContactObject {
    type: string,
    values: string[],
    links: string[]
}