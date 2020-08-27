export const recentActivityTemplate = {
    recentActivity: {
        selector: '.feed-shared-update-v2',
        fields: {
            activity: '.feed-shared-text-view',
            post_author: '.feed-shared-actor__name',
            post_author_description: '.feed-shared-actor__description',
            post_text: '.feed-shared-update-v2__commentary',
            reaction_count: '.social-details-social-counts__reactions',
            comments_count: '.social-details-social-counts__comments'
        }
    }
}

// profile: {
//     selector: '.pv-top-card',
//         fields: {
//         name: `.pv-top-card--list:first-child li:first-child`,
//             headline: `h2`,
//             location: `.pv-top-card--list:last-child li:first-child`,
//             connections: `.pv-top-card--list:last-child li:nth-child(2)`,
//             imageurl: {
//             selector: `img.pv-top-card__photo`,
//                 attribute: 'src'
//         }
//     }
// },
