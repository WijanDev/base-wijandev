import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";
import { eq } from "drizzle-orm";

export async function load({ parent }) {
    let parentData = await parent();
    let languages = parentData.languages;
    let languageId = parentData.userSettings.languageId ?? languages.find(language => language.iso3 == "eng")!.id;

    let groups = await db.query.menus.findFirst({
        with: {
            items: {
                with: {
                    linkTranslation: {
                        with: {
                            translations: {
                                where: translation => eq(translation.languageId, languageId)
                            }
                        }
                    },
                    textTranslation: {
                        with: {
                            translations: {
                                where: translation => eq(translation.languageId, languageId)
                            }
                        }
                    }
                }
            }
        }
    });

    return {
        groups
    };
}