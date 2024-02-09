import { pgTable, text, timestamp, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { menus, type Menu } from '../../../../../modules/menus/infrastructure/db/drizzle/menus.schema.drizzle';
import { translationKeys, type TranslationKey } from '../../../../../modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle';
import { relations, type InferSelectModel } from 'drizzle-orm';

export const menuItems = pgTable('menu_items', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('deleted', { withTimezone: true }),
    name: text('name'),
    icons: text('icons').array(),
    menuId: text('menu_id').references(() => menus.id, { onDelete: 'set null' }),
    parentId: text('parent_id').references((): AnyPgColumn => menuItems.id, { onDelete: 'set null' }),
    textTranslationKeyId: text('text_translation_key_id').references(() => translationKeys.id, { onDelete: 'set null' }),
    linkTranslationKeyId: text('link_translation_key_id').references(() => translationKeys.id, { onDelete: 'set null' })
});

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
    menu: one(menus, {
        fields: [menuItems.menuId],
        references: [menus.id]
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
    menu: Menu|null,
    childs: MenuItem[],
    parent: MenuItem|null,
    linkTranslation: TranslationKey|null,
    textTranslation: TranslationKey|null
}