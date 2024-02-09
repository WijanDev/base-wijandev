import { loadTranslations } from "$lib/shared/application/translations/translations";

export const load = async ({ data }) => {

    const initLocale = data.languages.find(language => language.id == data.userSettings!.languageId)?.iso3 ?? 'eng'; // get from cookie, user session, ...
    
    await loadTranslations(initLocale); // keep this just before the `return`
    return {
        ...data
    }
}