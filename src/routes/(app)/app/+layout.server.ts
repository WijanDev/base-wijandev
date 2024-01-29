import { userSettings, type UserSettings } from "$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle.js";
import { loadTranslations } from "$lib/shared/application/translations/translations";
import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";
import { createId } from "@paralleldrive/cuid2";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ parent, locals, url }) => {
    const userResponse = await locals.supabase.auth.getUser();
    if (userResponse.error) {
        throw error(401, userResponse.error.message)
    }
    let settings = await db.query.userSettings.findFirst({
        where: eq(userSettings.userId, userResponse.data.user.id)
    })

    if (!settings) {
        const newSettings: UserSettings = {
            id: createId(),
            created: new Date().toUTCString(),
            updated: null,
            deleted: null,
            userId: userResponse.data.user.id,
            languageId: null,
            sidebarClosed: false
        }

        await db.insert(userSettings).values(newSettings);
        settings = newSettings;
    }

    const parentData = await parent();

    const initLocale = parentData.languages.find(language => language.id == settings!.languageId)?.iso3 ?? 'en'; // get from cookie, user session, ...
    console.log(initLocale)
    await loadTranslations(initLocale); // keep this just before the `return`
    return {
        userSettings: settings,
        userData: userResponse.data.user,
        languages: parentData.languages
    }
}