import { pgTable, text, timestamp, unique, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { menuItems, type MenuItem } from '../../../../../modules/menu-items/infrastructure/db/drizzle/menu-items.schema.drizzle';

export const menuGroups = pgTable('menu_groups', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    created: timestamp('created', { withTimezone: true }).notNull().defaultNow(),
    updated: timestamp('updated', { withTimezone: true }),
    deleted: timestamp('deleted', { withTimezone: true }),
    name: text('name').notNull(),
    parentId: text('parent_id').references((): AnyPgColumn => menuGroups.id)
}, 
    (t) => ({
        unqKey: unique('unq_name_parent').on(t.name, t.parentId)
    })
);

export const pagesRelations = relations(menuGroups, ({ many }) => ({
    items: many(menuItems)
}));

export type MenuGroup = InferSelectModel<typeof menuItems> & {
    items: MenuItem[]
}