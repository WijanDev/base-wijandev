import { pgTable, text, timestamp, unique, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { menus, type Menu } from '../../../../../modules/menus/infrastructure/db/drizzle/menus.schema.drizzle';

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

export const menuGroupsRelations = relations(menuGroups, ({ many, one }) => ({
    parent: one(menuGroups, {
        fields: [menuGroups.parentId],
        references: [menuGroups.id],
        relationName: 'menu_group_parent_child'
    }),
    childs: many(menuGroups, { relationName: 'menu_group_parent_child' }),
    menus: many(menus)
}));

export type MenuGroup = InferSelectModel<typeof menuGroups> & {
    menus: Menu[],
    parent: MenuGroup|null,
    childs: MenuGroup[]
}