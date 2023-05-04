import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'
import palette from './palette'
import typography from './typography'
import { viVN } from '@mui/material/locale'

const MuiThemeProvider = ({ children }) => {
    const muiTheme = createTheme(
        {
            typography,
            palette,
        },
        viVN,
    )

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default MuiThemeProvider
