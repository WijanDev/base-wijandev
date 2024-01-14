<script lang="ts">
    import { version } from '$app/environment'
    import { PUBLIC_PROJECT_NAME } from '$env/static/public'
    console.log('Current version', version);
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{PUBLIC_PROJECT_NAME}</h1>
			<p class="py-6">Coming soon 3</p>
			<!-- <button class="btn btn-primary">Stay tuned</button> -->
		</div>
	</div>
</div>
