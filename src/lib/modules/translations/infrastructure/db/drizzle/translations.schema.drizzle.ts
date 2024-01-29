import { relations, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { translationKeys } from '../../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle';
import { languages } from '../../../../../modules/languages/infrastructure/db/drizzle/languages.schema.drizzle';
import { createId } from '@paralleldrive/cuid2';

export const translations = pgTable('translations', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('updated', { withTimezone: true }),
    translationKeyId: text('translation_key_id').references(() => translationKeys.id, { onDelete: 'cascade' }).notNull(),
    languageId: text('language_id').references(() => languages.id, { onDelete: 'cascade' }).notNull(),
    translated: text('translated')
}, (t) => ({
    unqKey: unique('unq_translation').on(t.translationKeyId, t.languageId)
}));

export const translationsRelations = relations(translations, ({ one }) => ({
    translationKey: one(translationKeys, {
        fields: [translations.translationKeyId],
        references: [translationKeys.id]
    }),
    language: one(languages, {
        fields: [translations.languageId],
        references: [languages.id]
    })
}));

export type Translation = InferSelectModel<typeof translations>;