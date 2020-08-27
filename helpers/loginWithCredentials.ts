import {openPage} from "./openPage";
import {LoginObject} from "./interfaces/interfaces";
const debug = require('debug')('linkedin')

export const loginWithCredentials = async ({browser, email, password}: LoginObject): Promise<void> => {
    const url = 'https://www.linkedin.com/login'
    const page = await openPage({browser, url})
    debug(`logging at: ${url}`)

    await page.goto(url)
    await page.waitFor('#username')

    await page.$('#username')
        .then((emailElement: any) => emailElement.type(email))
    await page.$('#password')
        .then((passwordElement: any) => passwordElement.type(password))

    await page.$x("//button[contains(text(), 'Sign in')]")
        .then((button: any) => button[0].click())

    return page.waitFor('input[role=combobox]', {
        timeout: 15000
    })
        .then(async () => {
            debug('logged feed page selector found')
            await page.close()
        })
        .catch(async () => {
            console.error('successful login element was not found')
            const emailError = await page.evaluate(() => {
                const e = document.querySelector('div[error-for=username]')
                if (!e) {
                    return false
                }
                const style = window.getComputedStyle(e)
                return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
            })

            const passwordError = await page.evaluate(() => {
                const e = document.querySelector('div[error-for=password]')
                if (!e) {
                    return false
                }
                const style = window.getComputedStyle(e)
                return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
            })

            const manualChallengeRequested = await page.evaluate(() => {
                const e = document.querySelector('.flow-challenge-content')
                if (!e) {
                    return false
                }
                const style = window.getComputedStyle(e)
                return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
            })

            if (emailError) {
                debug('wrong username element found')
                return Promise.reject(new Error(`linkedin: invalid username: ${email}`))
            }

            if (passwordError) {
                debug('wrong password element found')
                return Promise.reject(new Error('linkedin: invalid password'))
            }

            if (manualChallengeRequested) {
                console.error('manual check was required')
                return Promise.reject(new Error(`linkedin: manual check was required, verify if your login is properly working manually.`))
            }
        });
}