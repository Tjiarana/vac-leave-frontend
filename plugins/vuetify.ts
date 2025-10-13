import { createVuetify } from "vuetify"
import { VDateInput } from 'vuetify/labs/VDateInput'
import { th } from 'vuetify/locale'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"

import { LIGHT_THEME, lightTheme, darkTheme } from "@/helpers/themes"

import { defaults } from "@/helpers/defaults"

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        defaults,
        theme: {
            defaultTheme: LIGHT_THEME,
            themes: {
                lightTheme,
                darkTheme,
            },
            variations: {
                colors: ["primary", "secondary"],
                lighten: 3,
                darken: 3,
            }
        },
        icons: {
            defaultSet: "mdi",
            aliases,
            sets: {
                mdi,
            },
        },
        components: {
            VDateInput,
        },
        locale: {
            locale: 'th',
            messages: { th },
        }
    })

    nuxtApp.vueApp.use(vuetify)
})