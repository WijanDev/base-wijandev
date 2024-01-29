<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	let formData = {
		email: '',
		password: ''
	};

	let displaySuccessSignup = false;

	const handleSubmit = async () => {
		const response = await data.supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password
		});

		if (!response.error) {
			let next = $page.url.searchParams.get('next') ?? '/app/dashboard';
			goto(next);
		}
	};
</script>

<svelte:head>
	<title>WijanDev | Login</title>
</svelte:head>
<h4 class="text-lg text-center">Login</h4>
<form class="w-full mt-10" on:submit|preventDefault={handleSubmit}>
	<label class="form-control w-full mt-6">
		<input
			name="email"
			type="email"
			autocomplete="email"
			bind:value={formData.email}
			placeholder="your@email.com"
			class="input input-bordered w-full"
		/>
	</label>
	<label class="form-control w-full mt-6">
		<input
			name="password"
			type="password"
			autocomplete="new-password"
			bind:value={formData.password}
			placeholder="Password"
			class="input input-bordered w-full"
		/>
	</label>
	<button class="group/login btn mt-6 btn-primary w-full">
		<svg
			class="h-6 w-6 text-white fill-accent group-hover/login:fill-black"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
			/>
			<path
				d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
			/>
		</svg>
		Login
	</button>
</form>
