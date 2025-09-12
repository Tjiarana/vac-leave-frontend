import type { ThemeDefinition } from 'vuetify'

// String that represents the name of the light theme
export const LIGHT_THEME = 'lightTheme'

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#F5F5F5",
		surface: "#FFFFFF",
		primary: "#00BCD4",
		secondary: "#26C6DA",
        accent: "#FFCA28",
		error: "#ef4444",
		info: "#3b82f6",
		success: "#22c55e",
		warning: "#f59e0b",
        "main-text": "#212121",
        "sub-text": "#5F5F5F"
    },
}

// String that represents the name of the dark theme
export const DARK_THEME = 'darkTheme'

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#0C111B",
        surface: "#1f2937",
        primary: "#00BCD4",
        secondary: "#26C6DA",
        accent: "#FFCA28",
        error: "#ef4444",
        info: "#3b82f6",
        success: "#22c55e",
        warning: "#f59e0b",
    }, 
}