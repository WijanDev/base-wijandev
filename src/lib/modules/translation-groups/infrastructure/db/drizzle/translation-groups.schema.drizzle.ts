import { createId } from '@paralleldrive/cuid2';
import { translationKeys, type TranslationKey } from '../../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, type AnyPgColumn } from 'drizzle-orm/pg-core';

export const translationGroups = pgTable('translation_groups', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
  updated: timestamp('updated', { withTimezone: true }),
  deleted: timestamp('updated', { withTimezone: true }),
  name: text('name').notNull().unique(),
  parentId: text('parent_id').references((): AnyPgColumn => translationGroups.id, { onDelete: 'cascade' })
});

export const translationGroupsRelations = relations(translationGroups, ({ many, one }) => ({
  translationKeys: many(translationKeys),
  parent: one(translationGroups, {
    fields: [translationGroups.parentId],
    references: [translationGroups.id]
  }),
  childs: many(translationGroups)
}));

export type TranslationGroup = InferSelectModel<typeof translationGroups> & {
  childs: TranslationGroup[],
  translationKeys: TranslationKey[]
};