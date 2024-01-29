import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { PUBLIC_SUPABASE_CONNECTION_STRING } from '$env/static/public'
import * as languages from '../../../../modules/languages/infrastructure/db/drizzle/languages.schema.drizzle'
import * as menuItems from '../../../../modules/menu-items/infrastructure/db/drizzle/menu-items.schema.drizzle'
import * as menuGroups from '../../../../modules/menu-groups/infrastructure/db/drizzle/menu-groups.schema.drizzle'
import * as pages from '../../../../modules/pages/infrastructure/db/drizzle/pages.schema.drizzle'
import * as translationGroups from '../../../../modules/translation-groups/infrastructure/db/drizzle/translation-groups.schema.drizzle'
import * as translationKeys from '../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle'
import * as translations from '../../../../modules/translations/infrastructure/db/drizzle/translations.schema.drizzle'
import * as userSettings from '../../../../modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle'


// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(PUBLIC_SUPABASE_CONNECTION_STRING, { prepare: false })
export const db = drizzle(client, {
    schema: {
        ...languages,
        ...menuItems,
        ...menuGroups,
        ...pages,
        ...translationGroups,
        ...translationKeys,
        ...translations,
        ...userSettings
    }
});