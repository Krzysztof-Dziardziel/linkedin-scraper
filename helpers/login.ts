import {loginWithCookies} from "./notreadyyet/loginWithCookies";
import {loginWithCredentials} from "./loginWithCredentials";
import {LoginObject} from "./interfaces/interfaces";

export const login = async ({browser, email, password, cookies, url}: LoginObject) => {
    if (cookies && url) {
        console.log('using cookies, login will be bypassed')
        await loginWithCookies({cookies, url});
    } else if (email && password) {
        console.log('email and password was provided, we\'re going to login...')
        await loginWithCredentials({browser, email, password})
    }
}
