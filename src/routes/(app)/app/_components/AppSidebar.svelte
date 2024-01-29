<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { type UserSettings } from '$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle';
	import MenuGroup from '../../../../components/menus/MenuGroup.svelte';
    import { sideBarMenu } from './menus';
	const userSettings = getContext('userSettings') as Writable<UserSettings>;
	
</script>

<nav
	class:w-0={$userSettings.sidebarClosed}
    class:w-96={!$userSettings.sidebarClosed}
    class:md:w-72={!$userSettings.sidebarClosed}
	class="block transition-all ease-in-out overflow-auto"
>
	<ul class="block overflow-auto menu bg-base-200 collapse rounded-none h-full" class:p-0={$userSettings.sidebarClosed}>
		<MenuGroup items={sideBarMenu} />
	</ul>
</nav>
