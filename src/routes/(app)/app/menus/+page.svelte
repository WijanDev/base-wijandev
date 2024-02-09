<script lang="ts">
	import type { MenuGroup } from '$lib/modules/menu-groups/infrastructure/db/drizzle/menu-groups.schema.drizzle';
	import type { MenuItem } from '$lib/modules/menu-items/infrastructure/db/drizzle/menu-items.schema.drizzle';
	import type { Menu } from '$lib/modules/menus/infrastructure/db/drizzle/menus.schema.drizzle';
	import type { TranslationKey } from '$lib/modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle.js';
	import MenuGroupComponent from './_components/MenuGroupComponent.svelte';

	export let data;
	let menuGroups: MenuGroup[] = data.groups.map((group) => {
		const menus: Menu[] = group.menus.map((menu) => {
			const items: MenuItem[] = menu.items.map((menuItem) => {
				let linkTranslation: TranslationKey | null = menuItem.linkTranslation
					? {
							id: menuItem.linkTranslation.id,
							created: menuItem.linkTranslation.created,
							deleted: menuItem.linkTranslation.deleted,
							updated: menuItem.linkTranslation.updated,
							key: menuItem.linkTranslation.key,
							translations: menuItem.linkTranslation.translations,
							translationGroupId: menuItem.linkTranslation.translationGroupId
						}
					: null;

				let textTranslation: TranslationKey | null = menuItem.textTranslation
					? {
							id: menuItem.textTranslation.id,
							created: menuItem.textTranslation.created,
							deleted: menuItem.textTranslation.deleted,
							updated: menuItem.textTranslation.updated,
							key: menuItem.textTranslation.key,
							translations: menuItem.textTranslation.translations,
							translationGroupId: menuItem.textTranslation.translationGroupId
						}
					: null;
				return {
					id: menuItem.id,
					created: menuItem.created,
					deleted: menuItem.deleted,
					updated: menuItem.updated,
					icons: menuItem.icons,
					name: menuItem.name,
					menuId: menuItem.menuId,
					linkTranslationKeyId: menuItem.linkTranslationKeyId,
					textTranslationKeyId: menuItem.textTranslationKeyId,
					parentId: menuItem.parentId,
					menu: null,
					childs: [],
					parent: null,
					linkTranslation: linkTranslation,
					textTranslation: textTranslation
				};
			});
			return {
				id: menu.id,
				created: menu.created,
				deleted: menu.deleted,
				updated: menu.updated,
				name: menu.name,
				groupId: menu.groupId,
				group: null,
				items: items
			};
		});
		return {
			id: group.id,
			created: group.created,
			deleted: group.deleted,
			updated: group.updated,
			parentId: group.parentId,
			name: group.name,
			childs: [],
			menus: menus,
			parent: null
		};
	});

	menuGroups.forEach((group) => {
		group.childs = menuGroups.filter((child) => child.parentId == group.id);
		group.menus.forEach((menu) => {
			menu.items.forEach((menuItem) => {
				menuItem.childs = menu.items.filter((child) => child.parentId == menuItem.id);
			});
			menu.items = menu.items.filter((menuItem) => menuItem.parentId == null);
		});
	});
	let groups = menuGroups.filter((group) => group.parentId == null);
</script>

<h1 class="text-xl">Menus</h1>
<div class="grid grid-cols-1 md:grid-cols-2">
    <ul class="menu rounded-lg">
        {#each groups as group}
            <MenuGroupComponent menuGroup={group} />
        {/each}
    </ul>
    <div>

    </div>

</div>