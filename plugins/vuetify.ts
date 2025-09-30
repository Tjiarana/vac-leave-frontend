import { createVuetify } from "vuetify"

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import "@mdi/font/css/materialdesignicons.css"

import { LIGHT_THEME, lightTheme, darkTheme } from "@/helpers/themes"

import { defaults } from "@/helpers/defaults"
import { VCalendar } from "vuetify/labs/VCalendar"

export default defineNuxtPlugin((nuxtApp ) => {
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
            VCalendar,
        }
    })

    nuxtApp.vueApp.use(vuetify)
})