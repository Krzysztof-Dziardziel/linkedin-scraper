export interface LoginObject {
    browser?: any,
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

export interface scrapeProfileObject {
    browser: any,
    url: string,
    cookies?: any
}
