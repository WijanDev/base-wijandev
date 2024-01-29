import { pgTable, text, timestamp, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { menuGroups, type MenuGroup } from '../../../../../modules/menu-groups/infrastructure/db/drizzle/menu-groups.schema.drizzle';
import { translationKeys, type TranslationKey } from '../../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle';
import { relations, type InferSelectModel } from 'drizzle-orm';

export const menuItems = pgTable('menu_items', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('deleted', { withTimezone: true }),
    menuGroupId: text('menu_group_id').notNull().references(() => menuGroups.id, { onDelete: 'cascade' }),
    parentId: text('parent_id').references((): AnyPgColumn => menuItems.id, { onDelete: 'set null' }),
    icons: text('icons').array(),
    textTranslationKeyId: text('text_translation_key_id').references(() => translationKeys.id, { onDelete: 'set null' }),
    linkTranslationKeyId: text('link_translation_key_id').references(() => translationKeys.id, { onDelete: 'set null' })
});

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
    group: one(menuGroups, {
        fields: [menuItems.menuGroupId],
        references: [menuGroups.id]
    }),

    childs: many(menuItems),
    parent: one(menuItems, {
        fields: [menuItems.parentId],
        references: [menuItems.id]
    }),

    textTranslation: one(translationKeys, {
        fields: [menuItems.textTranslationKeyId],
        references: [translationKeys.id]
    }),

    linkTranslation: one(translationKeys, {
        fields: [menuItems.linkTranslationKeyId],
        references: [translationKeys.id]
    })
}));

export type MenuItem = InferSelectModel<typeof menuItems> & {
    group: MenuGroup,
    childs: MenuItem[],
    parent: MenuItem,
    linkTranslation: TranslationKey,
    textTranslation: TranslationKey
}