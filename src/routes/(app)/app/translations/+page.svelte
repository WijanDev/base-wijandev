<script lang="ts">
	import type { TranslationGroup } from '$lib/modules/translation-groups/infrastructure/db/drizzle/translation-groups.schema.drizzle.js';
	import type { TranslationKey } from '$lib/modules/translation-keys/infrastructure/db/drizzle/translation-keys.schema.drizzle.js';
	import type { Translation } from '$lib/modules/translations/infrastructure/db/drizzle/translations.schema.drizzle.js';
	import { type UserSettings } from '$lib/modules/user-settings/infrastructure/db/drizzle/user-settings.schema.drizzle';
	import { getContext } from 'svelte';
	import TranslationsTreeComponent from './components/TranslationsTreeComponent.svelte';
	import type { Writable } from 'svelte/store';
	const userSettings = getContext('userSettings') as Writable<UserSettings>;

	export let data;

	let translationsTree: TranslationGroup[] = data.translationsTree.map(translationTreeGroup => {
		let translationGroup: TranslationGroup = {
			id: translationTreeGroup.id,
			created: translationTreeGroup.created,
			updated: translationTreeGroup.updated,
			deleted: translationTreeGroup.deleted,
			name: translationTreeGroup.name,
			parentId: translationTreeGroup.parentId,
			childs: [],
			translationKeys: translationTreeGroup.translationKeys.map(translationKeyTree => {
				let translationKey: TranslationKey = {
					id: translationKeyTree.id,
					created: translationKeyTree.created,
					updated: translationKeyTree.updated,
					deleted: translationKeyTree.deleted,
                    key: translationKeyTree.key,
                    translationGroupId: translationKeyTree.translationGroupId,
                    translations: translationKeyTree.translations.map(translationTree => {
                        let translation: Translation = {
                            id: translationTree.id,
                            created: translationTree.created,
                            updated: translationTree.updated,
                            deleted: translationTree.deleted,
                            languageId: translationTree.languageId,
                            translated: translationTree.translated,
                            translationKeyId: translationTree.translationKeyId
                        }
                        return translation
                    })
				};
                return translationKey;
			})
		};
		return translationGroup;
	});

	translationsTree.forEach((translationGroup) => {
		translationGroup.childs = translationsTree.filter(
			(possibleChild) => possibleChild.parentId == translationGroup.id
		);
	});

	translationsTree = translationsTree.filter((translationGroup) => !translationGroup.parentId);

	interface Foo {
		[key: string]: string|Foo;
	}

	interface KeyValue<T> {
		key: string;
		value: T;
	}

	const translationTreeToJson = (translationTree: TranslationGroup[]): Foo => {
		let jsonValue: Foo = {};
		translationTree.map(translationGroup => translationGroupToJson(translationGroup))
			.forEach(keyValueFoo => {
				if(keyValueFoo.value) {
					jsonValue[keyValueFoo.key] = keyValueFoo.value
				}
			})
		return jsonValue;
	}

	const translationKeyHasTranslations = (translationKey: TranslationKey): boolean => {
		return translationKey.translations.some(translation => translation.languageId == $userSettings.languageId);
	}

	const translationGroupHasTranslations = (translationGroup: TranslationGroup): boolean => {
		if (translationGroup.translationKeys.some(translationKey => translationKeyHasTranslations(translationKey))) {
			return true;
		}

		return translationGroup.childs.some(child => translationGroupHasTranslations(child));
	}

	const translationGroupToJson = (translationGroup: TranslationGroup): KeyValue<Foo|null> => {
		let value: Foo = {};
		if(!translationGroupHasTranslations(translationGroup)) {
			return {
				key: translationGroup.name,
				value: null
			}
		}
		let childs = translationGroup.childs.map(child => translationGroupToJson(child));
		childs.forEach(child => {
			if (child.value) {
				value[child.key] = child.value;
			}
		})

		translationGroup.translationKeys.forEach(translationKey => {
			let translated = translationKey.translations.find(translation => translation.languageId == $userSettings.languageId)?.translated;
			if(translationKey.key && translated) {
				value[translationKey.key] = translated; 
			}
		})
		
		return {
			key: translationGroup.name,
			value
		};
	}

	const translations = translationTreeToJson(translationsTree);

</script>

<h1 class="text-xl">Translations</h1>

<TranslationsTreeComponent groups={translationsTree} />
