import i18n, { type Config } from 'sveltekit-i18n';

interface TranslationParams {
    username: string;
}

const config: Config<TranslationParams> = ({
    loaders: [
        {
            locale: 'spa',
            key: 'app',
            loader: async () => (
                await import('./app/spa.json')
            ).default,
        },
        {
            locale: 'eng',
            key: 'app',
            loader: async () => (
                await import('./app/eng.json')
            ).default,
        },
        {
            locale: 'cat',
            key: 'app',
            loader: async () => (
                await import('./app/cat.json')
            ).default,
        },
    ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);