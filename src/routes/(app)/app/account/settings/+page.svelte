<script lang="ts">
	import type { UserSettings } from '$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { t } from '$lib/shared/application/translations/translations';

	export let data;
	const userSettings = getContext('userSettings') as Writable<UserSettings>;

	const handleSaveChanges = async () => {
		const newValue: UserSettings = {
			id: $userSettings.id,
			created: $userSettings.created,
			updated: new Date().toUTCString(),
			deleted: null,
			languageId: $userSettings.languageId,
			sidebarClosed: $userSettings.sidebarClosed,
			userId: $userSettings.userId
		};
		const jsonValue = JSON.stringify(newValue);
		const response = await fetch('/api/user-settings', {
			method: 'POST',
			body: jsonValue,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
	};
</script>

<h1 class="text-xl">{$t('app.account.settings.title')}</h1>
<form>
	<label class="form-control w-full mt-6">
		<div class="label">
			<span class="label-text">{$t('app.account.settings.select_language')}</span>
		</div>
		<select class="select select-primary w-full max-w-xs" bind:value={$userSettings.languageId}>
			<option value={null}>Default</option>
			{#each data.languages as language}
				<option value={language.id}>{language.iso3}</option>
			{/each}
		</select>
	</label>
	<div class="form-control">
		<label class="cursor-pointer label">
			<span class="label-text">{$t('app.account.settings.sidebar_closed')}</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={$userSettings.sidebarClosed}
			/>
		</label>
	</div>
	<button class="btn btn-primary" on:click|preventDefault={handleSaveChanges}
		>{$t('app._forms.save_changes')}</button
	>
</form>
