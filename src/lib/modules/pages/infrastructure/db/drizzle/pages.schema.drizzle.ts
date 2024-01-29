import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { translationKeys } from '../../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle';
import { createId } from '@paralleldrive/cuid2';

export const pages = pgTable('pages', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('updated', { withTimezone: true }),
    name: text('name').notNull().unique(),
    slugTranslationKeyId: text('slug_translation_key_id').references(() => translationKeys.id, { onDelete: 'set null' }),
    nameTranslationKeyId: text('nameTranslationKeyId').references(() => translationKeys.id, { onDelete: 'set null' }),
    metaTranslationKeyId: text('metaTranslationKeyId').references(() => translationKeys.id, { onDelete: 'set null' }),
    contentTranslationKeyId: text('contentTranslationKeyId').references(() => translationKeys.id, { onDelete: 'set null' })
});

export const pagesRelations = relations(pages, ({ one }) => ({
    slugTranslationKey: one(translationKeys, {
        fields: [pages.slugTranslationKeyId],
        references: [translationKeys.id],
        relationName: 'page_slug_translation_key'
    }),
    nameTranslationKey: one(translationKeys, {
        fields: [pages.nameTranslationKeyId],
        references: [translationKeys.id],
        relationName: 'page_name_translation_key'
    }),
    metaTranslationKey: one(translationKeys, {
        fields: [pages.metaTranslationKeyId],
        references: [translationKeys.id],
        relationName: 'page_meta_translation_key'
    }),
    contentTranslationKey: one(translationKeys, {
        fields: [pages.contentTranslationKeyId],
        references: [translationKeys.id],
        relationName: 'page_content_translation_key'
    }),
}));