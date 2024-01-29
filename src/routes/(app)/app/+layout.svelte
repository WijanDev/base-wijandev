<script lang="ts">
	import { writable } from 'svelte/store';
	import AppNavbar from './_components/AppNavbar.svelte';
	import AppSidebar from './_components/AppSidebar.svelte';
	import { setContext } from 'svelte';
	import { loadTranslations } from '$lib/shared/application/translations/translations';

	export let data;

    const userSettings = writable(data.userSettings);
    setContext('userSettings', userSettings);

    $: loadTranslations(data.languages.find(language => language.id == $userSettings.languageId)?.iso3 ?? 'eng')
</script>

<div class="h-screen flex flex-col">
    <AppNavbar/>
    <main class="h-full w-full flex flex-row">
        <AppSidebar/>
        <div class="p-6 block w-full overflow-auto ">
            <slot /> 
        </div>
    </main>
</div>
