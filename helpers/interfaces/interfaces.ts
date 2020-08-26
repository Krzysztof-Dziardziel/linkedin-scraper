import {Browser, Cookie} from "puppeteer";

export interface LoginObject {
    browser: Browser,
    email?: string,
    password?: string,
    cookies?: any,
    url?: string
}

export interface OpenPageObject {
    browser: any,
    url: string,
    cookies?: any
}

export interface ScrapeLinkedInObject {
    email?: string,
    password?: string,
    cookies?: any
}

export interface ScrapeProfileObject {
    browser: any,
    url: string,
    cookies?: any
}

export interface CookieLogin {
    cookies: Cookie,
    url: string
}

export interface ScrapePageObject {
    browser: any,
    url: string,
    cookies?: any
}