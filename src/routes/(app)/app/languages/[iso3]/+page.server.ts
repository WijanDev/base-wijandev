import { languages } from "$lib/modules/languages/infrastructure/db/drizzle/languages.schema.drizzle.js";
import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({params}) {
    const iso3 = params.iso3;
    const language = await db.query.languages.findFirst({
        where: eq(languages.iso3, iso3)
    });
    if(!language) {
        throw error(404, 'Language not found')
    }
    return {
        language
    };
}