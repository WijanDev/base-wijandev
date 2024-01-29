<script lang="ts">
    export let data;
    interface Language {
        id: string;
        created: Date;
        updated: Date|null;
        deleted: Date|null;
        iso3: string;
    }
    
    const channelLanguages = data.supabase.channel('languages_sub')
        .on('postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'languages'
            },
            (payload) => {
                if(payload.eventType == "INSERT") {
                    let newLanguage = payload.new as Language;
                    data.languages = [...data.languages, newLanguage];
                }

                if(payload.eventType == "UPDATE") {
                    let updatedIndex = data.languages.findIndex(element => element.id == payload.new.id);
                    let newLanguage = payload.new as Language;
                    data.languages[updatedIndex] = newLanguage;
                }

                if(payload.eventType == "DELETE") {
                    data.languages = data.languages.filter(element => element.id != payload.old.id);
                }
            }
        ).subscribe();
</script>
<div>
    <ul>
        {#each data.languages as language}
            <li><a href="/languages/{language.iso3}">{language.iso3}</a></li>
        {/each}
    </ul>
</div>