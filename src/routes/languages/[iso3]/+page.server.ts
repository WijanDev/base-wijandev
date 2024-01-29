import { languages } from "$lib/modules/languages/infrastructure/db/drizzle/languages.schema.drizzle.js";
import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ params }) {
    const date1 = new Date();
    const iso3 = params.iso3;
    const language = await db.query.languages.findFirst({
        where: eq(languages.iso3, iso3)
    })
    const date2 = new Date();

    const timeElapsed = date2.getTime() - date1.getTime();
    if(!language) {
        redirect(303, '/languages')
    }
    return {
        language
    };
}