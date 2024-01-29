<script lang="ts">
	import { t } from '$lib/shared/application/translations/translations';
	export let data;
</script>

<h1 class="text-xl">
	{$t('app.languages.title')}
</h1>

<div class="overflow-x-auto w-full">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th>Language</th>
				<th>Locale</th>
				<th>Created</th>
				<th>Updated</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each data.languages as language}
				<tr class="hover">
					<td>
						<div class="flex items-center gap-3">
							<div class="avatar">
								<div class="mask mask-circle w-12 h-12">
									<img src={language.flagUrl} alt="Avatar Tailwind CSS Component" />
								</div>
							</div>
							<div>
								<div class="font-bold">{language.iso3}</div>
								<div class="text-sm opacity-50">{language.name}</div>
							</div>
						</div>
					</td>
					<td>
						{language.locale}
					</td>
					<td>
						{language.created.toISOString()}
					</td>
					<td>
						{language.updated ? language.updated.toISOString() : ''}
					</td>
					<th>
						<a class="btn btn-info btn-xs" href="/app/languages/{language.iso3}">Details</a>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
