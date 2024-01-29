<script lang="ts">
	import type { TranslationGroup } from '$lib/modules/translation-groups/infrastructure/db/drizzle/translation-groups.schema.drizzle';
	import TranslationGroupComponent from './TranslationGroupComponent.svelte';

	export let groups: TranslationGroup[];
</script>

<ul class="menu rounded-lg max-w-xs w-full">
    {#each groups as group}
        <TranslationGroupComponent group={group}/>
    {/each}
</ul>
