import { languages } from "../../../../../modules/languages/infrastructure/db/drizzle/languages.schema.drizzle";
import { relations, type InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const userSettings = pgTable("user_settings", {
	id: text("id").primaryKey().notNull(),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated: timestamp("updated", { withTimezone: true, mode: 'string' }),
	deleted: timestamp("deleted", { withTimezone: true, mode: 'string' }),
	userId: uuid("user_id").notNull(),
	languageId: text("language_id").references(() => languages.id, { onDelete: "set null" }),
	sidebarClosed: boolean("sidebar_closed").default(false).notNull(),
},
	(table) => {
		return {
			userSettingsUserIdKey: unique("user_settings_user_id_key").on(table.userId),
		}
	});

export const userSettingsRelations = relations(userSettings, ({ many, one }) => ({
	language: one(languages, {
		fields: [userSettings.languageId],
		references: [languages.id]
	})
}));

export type UserSettings = InferSelectModel<typeof userSettings>;