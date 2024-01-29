import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { translations } from '../../../../../modules/translations/infrastructure/db/drizzle/translations.schema.drizzle';

export const languages = pgTable('languages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
  updated: timestamp('updated', { withTimezone: true }),
  deleted: timestamp('deleted', { withTimezone: true }),
  iso3: varchar('iso3', { length: 3 }).notNull(),
  flagUrl: text('flag_url'),
  name: text('name').notNull(),
  locale: text('locale').notNull()
});

export const languagesRelations = relations(languages, ({ many, one }) => ({
  translations: many(translations)
}));

export type Language = InferSelectModel<typeof languages>;