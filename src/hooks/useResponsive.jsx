import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const useResponsive = ([key, type]) => {
    const theme = useTheme()
    return useMediaQuery(theme.breakpoints[type](key))
}

export default useResponsive