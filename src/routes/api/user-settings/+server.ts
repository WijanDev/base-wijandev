import { userSettings, type UserSettings } from '$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle.js'
import { db } from '$lib/shared/infrastructure/db/drizzle/client.drizzle.js'

export async function POST(event) {
    try {
        const data = await event.request.json() as UserSettings;
        const result = await db.insert(userSettings)
            .values(data)
            .onConflictDoUpdate({
                target: userSettings.id,
                set: data
            });

        // return success
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        })
    }
    catch(exception) {  
        return new Response(JSON.stringify({success: false}), {
            status: 500
        })
    }
}