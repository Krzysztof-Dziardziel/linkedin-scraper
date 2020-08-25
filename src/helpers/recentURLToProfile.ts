export const recentURLToProfile = (url:string):string => {
    return url.split('/').slice(0, 5).join('/');
}