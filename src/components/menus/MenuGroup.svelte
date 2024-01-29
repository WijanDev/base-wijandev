<script lang="ts">
	import Menu, { type MenuItem } from "./Menu.svelte";

    export let items: MenuItem[];
</script>

{#each items as item}
    <Menu item={item}/>
{/each}