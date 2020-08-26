import {recentURLToProfile} from "../helpers/profile/recentURLToProfile";

it('RecentURL should be converted to ProfileURL', async () => {
    const url = 'https://www.linkedin.com/in/some-random-person-123/detail/recent-activity/';
    expect(recentURLToProfile(url)).toEqual('https://www.linkedin.com/in/some-random-person-123/');
})
