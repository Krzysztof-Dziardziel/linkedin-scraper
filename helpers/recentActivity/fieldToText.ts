export const fieldToText = async (field:any):Promise<string|undefined> => {
    if (field) {
        const text = await (await field.getProperty('textContent')).jsonValue();
        return text.replace(/\\n|^\s|\s{2,}|\s$/g, '');
    }
    return undefined;
}

