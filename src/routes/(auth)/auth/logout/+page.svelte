<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	
	export let data;

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

	const logOut = async () => {
        const timestamp = new Date();
		const response = await data.supabase.auth.signOut();
        const responseTimestamp = new Date();
        const delayTime = 1500 - (responseTimestamp.getTime() - timestamp.getTime());
        await delay(delayTime);
		if (response.error) {
			throw new Error(response.error.message);
		}

		setTimeout(async () => {
			goto('/');
		}, 5000);
	};

	let loggingOut: Promise<void>|null = null;

	if(browser) {
		loggingOut = logOut();
	}

</script>

{#await loggingOut}
	Logging out...
    {:then}
    Successfully logged out, see you soon 👋
    {:catch error}
    {error}
{/await}
