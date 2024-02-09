import { pgTable, text, timestamp, unique, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { menuItems, type MenuItem } from '../../../../../modules/menu-items/infrastructure/db/drizzle/menu-items.schema.drizzle';
import { menuGroups, type MenuGroup } from '../../../../../modules/menu-groups/infrastructure/db/drizzle/menu-groups.schema.drizzle';

export const menus = pgTable('menus', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('deleted', { withTimezone: true }),
    name: text('name').notNull(),
    groupId: text('group_id').references(() => menuGroups.id)
}, 
    (t) => ({
        unqKey: unique('unq_name_parent').on(t.name, t.groupId)
    })
);

export const menusRelations = relations(menus, ({ many, one }) => ({
    group: one(menuGroups, {
        fields: [menus.groupId],
        references: [menuGroups.id]
    }),
    items: many(menuItems)
}));

export type Menu = InferSelectModel<typeof menus> & {
    group: MenuGroup|null,
    items: MenuItem[]
}