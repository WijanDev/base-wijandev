<script lang="ts">
	export let data;
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import Image from '../../components/images/Image.svelte';
</script>

{#key data.url}
	<div class="min-h-screen bg-emerald-100 flex flex-col">
		<header>
			<nav class="bg-primary navbar">
				<div class="navbar bg-primary text-slate">
					<div class="flex-1">
						<a
							class="hover:scale-125 hover:bg-primary hover:border-0 btn btn-primary p-0 mx-4 normal-case text-xl"
							href="/"
						>
							<Image
								alt="Site logo"
								height={1}
								width={1}
								classes="w-auto h-full"
								src="https://ik.imagekit.io/wijan/development/images/d14b04cd-01d3-4f92-921f-75b8f7aa0ca4.png"
							/>
						</a>
					</div>
					<div class="flex-none">
						<label for="public-drawer" class="btn btn-circle btn-primary lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 9h16.5m-16.5 6.75h16.5"
								/>
							</svg>
						</label>
						<ul class="menu menu-horizontal px-1">
							<li>
								<a
									href="/auth/login"
									class:underline={$page.url.pathname == '/auth/login'}
									class="hidden lg:block decoration-secondary decoration-2 underline-offset-2 hover:underline"
									>Login</a
								>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
		<main
			class="flex-1 p-6 md:p-10"
			in:fly={{ x: -200, duration: 300, delay: 300 }}
			out:fly={{ x: 200, duration: 300 }}
		>
			<slot />
		</main>
		<footer class="footer p-10 bg-neutral text-neutral-content hidden md:grid">
			<nav>
				<header class="footer-title">Services</header>
				<a class="link link-hover">Branding</a>
				<a class="link link-hover">Design</a>
				<a class="link link-hover">Marketing</a>
				<a class="link link-hover">Advertisement</a>
			</nav>
			<nav>
				<header class="footer-title">Company</header>
				<a class="link link-hover">About us</a>
				<a class="link link-hover">Contact</a>
				<a class="link link-hover">Jobs</a>
				<a class="link link-hover">Press kit</a>
			</nav>
			<nav>
				<header class="footer-title">Legal</header>
				<a class="link link-hover" href="/legal">Terms of use</a>
				<a class="link link-hover">Privacy policy</a>
				<a class="link link-hover">Cookie policy</a>
			</nav>
		</footer>
		<footer class="footer px-10 py-4 border-t bg-neutral text-neutral-content border-base-300">
			<aside class="justify-center items-center w-full md:w-auto grid-flow-col">
				<img
					alt="footer logo"
					class="w-10 h-10"
					src="https://povwvzylgrpxcsqnowbl.supabase.co/storage/v1/object/public/public-images/logo_wijan_dev.png"
				/>
			</aside>
			<nav class="md:place-self-center md:justify-self-end w-full md:w-auto">
				<div class="grid grid-flow-col gap-16 justify-center w-full md:w-auto">
					<a href="https://twitter.com/WijanDev" target="_blank"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="fill-current"
							><path
								d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
							></path></svg
						></a
					>
					<a href="https://github.com/WijanDev" target="_blank"
						><svg
							class="h-6 w-6 fill-current"
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><title>GitHub</title><path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
							/></svg
						></a
					>
				</div>
			</nav>
		</footer>
	</div>
{/key}
