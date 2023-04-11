/**
 * Light and dark theme color palettes
 */

import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
    palette: {
        primary: {
            light: '#f4f8f8',
            main: '#083D77',
        },
        secondary: {
            main: '#00BBF9',
            dark: '#000'
        },
        info: {
            light: '#ffffff',
            main: '#9094a3'
        },
        success: {
            main: '#66bb6a',
            light: '#ffffff'
        },
        error: {
            main: '#f44336',
            light: '#ffffff'
        },
        warning: {
            main:  'rgba(255, 255, 255, 0.5)'
        }
    }
});

export const border = {
    borderRadius: "10px"
}