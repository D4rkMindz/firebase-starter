// https://nuxt.com/docs/api/configuration/nuxt-config
import {ReCaptchaV3Provider} from "@firebase/app-check";

export default defineNuxtConfig({
    devtools: {
        enabled: process.env.PRODUCTION ? false : true,

        timeline: {
            enabled: true
        }
    },
    runtimeConfig: {
        google: {
            apiKey: '',
            authDomain: '',
            appCheckDebug: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: '',
            reCaptchaSecret: '',
            reCaptchaSiteKey: '',
        },
        public: {
            spotifyURL: "https://api.spotify.com/v1",
        }
    },
    imports: {
        autoImport: true,
        dirs: [
            'composables/**'
        ]
    },
    modules: [
        '@nuxtjs/tailwindcss',
        // disabled color mode since it will cause the theme "garden" to be always default... (what a WTF bug)
        // '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
        'nuxt-vuefire',
    ],
    build: {
        transpile: ['@heroicons/vue']
    },
    i18n: {
        // vueI18n: '/i18n.config.ts',
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'de',
                name: 'Deutsch',
                file: 'de.json',
            },
        ],
        // lazy: true,
        langDir: './locales/',
        defaultLocale: 'en',
    },
    vuefire: {
        config: {
            apiKey: process.env.NUXT_GOOGLE_API_KEY,
            authDomain: process.env.NUXT_GOOGLE_AUTH_DOMAIN,
            projectId: process.env.NUXT_GOOGLE_PROJECT_ID,
            appId: process.env.NUXT_GOOGLE_APP_ID,
        },
        auth: {
            enabled: true,
            persistence: ['indexedDBLocal']
        },
        appCheck: {
            // Allows you to use a debug token in development
            debug: process.env.NODE_ENV !== 'production' ? process.env.NUXT_GOOGLE_APP_CHECK_DEBUG : false,
            isTokenAutoRefreshEnabled: true,
            // provider: new ReCaptchaV3Provider(""),
            provider: 'ReCaptchaV3',
            // Find the instructions in the Firebase documentation, link above
            key: process.env.NUXT_GOOGLE_RE_CAPTCHA_SECRET || '',
        },
    }
})