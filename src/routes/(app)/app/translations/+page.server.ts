import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";

export async function load() {
    const languages = await db.query.languages.findMany();
    const translationsTree = await db.query.translationGroups.findMany({
        with: {
            translationKeys: {
                with: {
                    translations: true
                }
            }
        }
    })
    return {
        languages,
        translationsTree
    };
}