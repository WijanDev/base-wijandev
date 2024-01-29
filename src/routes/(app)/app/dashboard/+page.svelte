<script lang="ts">
    import { t } from '$lib/shared/application/translations/translations';
    export let data;
    const username = data.userData.user_metadata.full_name;
</script>
<h2>{$t('app.dashboard.content', { username: username })}</h2>