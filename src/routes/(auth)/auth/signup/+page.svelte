<script lang="ts">
	export let data;
	let formData = {
		email: '',
		password: ''
	};

	let displaySuccessSignup = false;

	const handleSubmit = async () => {
		const response = await data.supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
			options: {
				emailRedirectTo: 'http://localhost:5173/app/welcome'
			}
		});
		if (!response.error) {
			displaySuccessSignup = true;
			setTimeout(() => {
				displaySuccessSignup = false;
			}, 3000);
		}
	};
</script>

<svelte:head>
	<title>WijanDev | Login</title>
</svelte:head>
<h4 class="text-lg text-center">Signup</h4>
<form class="bg-red w-full mt-10" on:submit|preventDefault={handleSubmit}>
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
		<path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd" />
		</svg>
		Signup
	</button>
</form>
<div class="toast toast-end">
	{#if displaySuccessSignup}
		<div class="alert alert-success text-white">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="white" viewBox="0 -960 960 960"
				><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg
			>
			Check your email to confirm your account
		</div>
	{/if}
</div>
  