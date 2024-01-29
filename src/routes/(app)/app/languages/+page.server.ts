import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";

export async function load() {
    const languages = await db.query.languages.findMany();
    return {
        languages
    };
}