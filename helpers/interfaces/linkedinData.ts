import {ProfileObject} from "./profileObjectInterface";


export interface LinkedInDataObject {
    profile: ProfileObject,
    recentActivity: LinkedInRecentActivity
}

export interface LinkedInRecentActivity {
    activity: string,
    post_author: string,
    post_author_description: string,
    post_date: string,
    post_text: string,
    reaction_count: number,
    comments_count: number,
    highlighted_comment: LinkedInComment
}

export interface LinkedInComment {
    comment_author: string,
    comment_author_description: string,
    comment_text: string,
    likes: number
}