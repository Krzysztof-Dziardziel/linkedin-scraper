export const recentActivityTemplate = {
    selector: '.feed-shared-update-v2',
    fields: {
        activity: '.feed-shared-text-view',
        post_author: '.feed-shared-actor__name',
        post_author_description: '.feed-shared-actor__description',
        post_date: '.feed-shared-actor__sub-description > div > .visually-hidden',
        post_date_alt: '.feed-shared-actor__sub-description > span > .visually-hidden',
        post_text: '.feed-shared-update-v2__commentary',
        //post_link: ''
        reaction_count: '.social-details-social-counts__reactions',
        comments_count: '.social-details-social-counts__comments',
        highlighted_comment: {
            comment_author: '.comments-post-meta__name',
            comment_author_description: '.comments-post-meta__headline',
            comment_date: '.comments-comment-item__timestamp',
            comment_text: '.feed-shared-main-content--highlighted-comment',
            likes: '.comments-comment-social-bar__likes-count'
        }
    }
}
