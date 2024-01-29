<script lang="ts" context="module">
	export interface MenuItem {
		icons: string[];
		text: string;
		link: string | null;
		childs: MenuItem[];
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/shared/application/translations/translations';
	export let item: MenuItem;
</script>

{#if item.link}
	<li>
		<a href={item.link} class:active={$page.url.pathname.startsWith(item.link)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				{#each item.icons as icon}
					<path stroke-linecap="round" stroke-linejoin="round" d={icon} />
				{/each}
			</svg>
			{$t(item.text)}
		</a>
	</li>
{:else}
	<li>
		<details>
			<summary>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					{#each item.icons as icon}
						<path stroke-linecap="round" stroke-linejoin="round" d={icon} />
					{/each}
				</svg>
				{$t(item.text)}
			</summary>
			<ul>
				{#each item.childs as child}
					<svelte:self item={child} />
				{/each}
			</ul>
		</details>
	</li>
{/if}
