<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { type UserSettings } from '$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle';
	import { t } from '$lib/shared/application/translations/translations';

	const userSettings = getContext('userSettings') as Writable<UserSettings>;
</script>

<header>
	<nav class="bg-primary navbar text-slate">
		<div class="navbar-start">
			<label class="btn btn-circle btn-secondary swap swap-rotate">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" name="toggleSidebar" bind:checked={$userSettings.sidebarClosed} />

				<!-- hamburger icon -->
				<svg
					class="swap-on fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 512 512"
					><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg
				>

				<!-- close icon -->
				<svg
					class="swap-off fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 512 512"
					><polygon
						points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
					/></svg
				>
			</label>
		</div>
		<div class="navbar-end">
			<div class="tooltip tooltip-bottom tooltip-left" data-tip={$t('app._auth.logout')}>
				<a class="btn btn-circle btn-secondary" href="/auth/logout">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</div>
		</div>
	</nav>
</header>
