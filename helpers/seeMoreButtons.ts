const buttons = [
    {
        id: 'SHOW_MORE_ABOUT',
        selector: '#line-clamp-show-more-button'
    }, {
        id: 'SHOW_MORE_EXPERIENCES',
        selector: '#experience-section .pv-profile-section__see-more-inline'
    }, {
        id: 'SEE_MORE_EXPERIENCES',
        selector: '#experience-section .inline-show-more-text__button'
    }, {
        id: 'SHOW_MORE_CERTIFICATIONS',
        selector: '#certifications-section .pv-profile-section__see-more-inline'
    }, {
        id: 'SHOW_MORE_SKILLS',
        selector: '.pv-skills-section__additional-skills'
    }, {
        id: 'SEE_MORE_RECOMMENDATIONS',
        selector: '.recommendations-inlining #line-clamp-show-more-button'
    }
]


export const seeMoreButtons = async (page: any) => {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        const elems = await page.$$(button.selector)

        for (let j = 0; j < elems.length; j++) {
            const elem = elems[j]
            if (elem) {
                await elem.click()
                    .catch((e: any) => console.error(`couldn't click on ${button.selector}, it's probably invisible`))
            }
        }
    }
}
