import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";

export async function load() {

    let groups = await db.query.menuGroups.findMany({
        with: {
            menus: {
                with: {
                    items: true
                }
            }
        }
    });

    return {
        groups
    };
}