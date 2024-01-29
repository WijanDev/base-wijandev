<script lang="ts">
    export let data;
</script>
<div>
    <h3>{data.language?.iso3}</h3>
    <ul>
        <li>Id: {data.language?.id}</li>
        <li>Created: {data.language?.created}</li>
    </ul>
</div>