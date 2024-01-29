import { relations, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { translationGroups } from '../../../../../modules/translation-groups/infrastructure/db/drizzle/translation-groups.schema.drizzle';
import { translations, type Translation } from '../../../../../modules/translations/infrastructure/db/drizzle/translations.schema.drizzle';
import { createId } from '@paralleldrive/cuid2';
import { pages } from '../../../../../modules/pages/infrastructure/db/drizzle/pages.schema.drizzle';

export const translationKeys = pgTable('translation_keys', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('updated', { withTimezone: true }),
    translationGroupId: text('translation_group_id').references(() => translationGroups.id, { onDelete: 'cascade' }).notNull(),
    key: text('key').notNull()
}, (t) => ({
    unqKey: unique('unq_translation_key').on(t.translationGroupId, t.key)
}));

export const translationKeysRelations = relations(translationKeys, ({ one, many }) => ({
    translationGroup: one(translationGroups, {
        fields: [translationKeys.translationGroupId],
        references: [translationGroups.id]
    }),
    translations: many(translations),
    fromSlugPage: many(pages, {
        relationName: 'page_slug_translation_key'
    }),
    fromNamePage: many(pages, {
        relationName: 'page_name_translation_key'
    }),
    fromContentPage: many(pages, {
        relationName: 'page_content_translation_key'
    }),
    fromMetaPage: many(pages, {
        relationName: 'page_meta_translation_key'
    })
}));

export type TranslationKey = InferSelectModel<typeof translationKeys> & {
    translations: Translation[]
}