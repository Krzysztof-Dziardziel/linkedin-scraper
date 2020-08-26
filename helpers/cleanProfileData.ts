import {Language, ProfileObject, Project} from "./interfaces/profileObjectInterface";

export const cleanProfileData = (profile: ProfileObject):ProfileObject => {
    if (!profile.profile.name) {
        const messageError = `LinkedIn website changed and I can't read basic data.`;
        console.error(messageError, '');
        throw new Error(messageError);
    }

    profile.profile.summary = profile.about.text;

    profile.positions.forEach((position: any) => {
        if (position.title) {
            position.title = position.title.replace('Company Name\n', '');
        }
        if (position.description) {
            position.description = position.description.replace('See more', '');
            position.description = position.description.replace('see more', '');
            position.description = position.description.replace('See less', '');
        }
        if (position.roles) {
            position.roles.forEach((role: any) => {
                if (role.title) {
                    role.title = role.title.replace('Title\n', '');
                }
                if (role.description) {
                    role.description = role.description.replace('See more', '');
                    role.description = role.description.replace('see more', '');
                }
            })
        }
    })

    if (profile.recommendations.receivedCount) {
        profile.recommendations.receivedCount = profile.recommendations.receivedCount.replace(/[^\d]/g, '');
    }

    if (profile.recommendations.givenCount) {
        profile.recommendations.givenCount = profile.recommendations.givenCount.replace(/[^\d]/g, '');
    }

    if (profile.recommendations.received) {
        profile.recommendations.received.forEach((recommendation: any) => {
            if (recommendation.summary) {
                recommendation.summary = recommendation.summary.replace('See more', '');
                recommendation.summary = recommendation.summary.replace('See less', '');
            }
        })
    }

    if (profile.recommendations.given) {
        profile.recommendations.given.forEach((recommendation: any) => {
            if (recommendation.summary) {
                recommendation.summary = recommendation.summary.replace('See more', '');
                recommendation.summary = recommendation.summary.replace('See less', '');
            }
        })
    }

    if (profile.courses) {
        profile.courses = profile.courses.map(({name, year}: any) => {
                let coursesObj = {}
                if (name) {
                    // @ts-ignore
                    coursesObj.name = name.replace('Course name\n', '');
                }
                if (year) {
                    // @ts-ignore
                    coursesObj.year = year.replace('Course number\n', '');
                }
                return coursesObj
            }
        )
    }

    if (profile.languages) {
        // @ts-ignore
        profile.languages = profile.languages.map(({name, proficiency}: Language) => ({
            name: name ? name.replace('Language name\n', '') : undefined,
            proficiency,
        }));
    }

    if (profile.projects) {
        // @ts-ignore
        profile.projects = profile.projects.map(
            ({name, date, description, link}: Project) => ({
                name: name ? name.replace('Project name\n', '') : undefined,
                date,
                description: description ? description.replace('Project description\n', '') : undefined,
                link,
            }),
        );
    }

    return profile;
}
