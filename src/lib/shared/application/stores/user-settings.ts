import { storable } from "./storable";
import type { UserSettings } from "$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle";

const defaultUserSettings: UserSettings = {
    id: '',
    created: new Date().toISOString(),
    updated: null,
    deleted: null,
    languageId: null,
    sidebarClosed: false,
    userId: ''
}

export const UserSettingsStore = storable<UserSettings>(defaultUserSettings);