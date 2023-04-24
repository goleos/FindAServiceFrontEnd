/**
 * Light and dark theme color palettes
 */

import { createTheme } from "@mui/material/styles"
import PoppinsFont from "../fonts/Poppins/Poppins-Regular.ttf"

export const theme = createTheme({
    typography: {
        fontFamily: [
            PoppinsFont,
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            light: '#f4f8f8',
            main: '#083D77',
        },
        secondary: {
            main: '#0077CC',
            dark: '#000'
        },
        info: {
            light: '#ffffff',
            main: '#6f747d'
        },
        success: {
            main: '#26A96C',
            light: '#ffffff'
        },
        error: {
            main: '#C5283D',
            light: '#ffffff'
        },
        warning: {
            main:  '#fb8303'
        }
    }
});

export const border = {
    borderRadius: "10px"
}