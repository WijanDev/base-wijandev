import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";
import { and, eq } from "drizzle-orm";

export async function load({ locals, params }) {
    const slug = params.slug;
    const languageId = 'n6v9ayiq5a1cr8eoxlovktyp';

    const info = await db.query.translations.findFirst({
        where: (translations) => and(eq(translations.languageId, languageId), eq(translations.translated, slug)),
        with: {
            translationKey: {
                with: {
                    fromSlugPage: {
                        with: {
                            nameTranslationKey: {
                                with: {
                                    translations: {
                                        where: translation => eq(translation.languageId, languageId)
                                    }
                                }
                            },
                            contentTranslationKey: {
                                with: {
                                    translations: {
                                        where: translation => eq(translation.languageId, languageId)
                                    }
                                }
                            },
                            metaTranslationKey: {
                                with: {
                                    translations: {
                                        where: translation => eq(translation.languageId, languageId)
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
    });

    return {
        info
    };
}