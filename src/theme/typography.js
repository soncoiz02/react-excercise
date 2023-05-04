const responsiveFontSizes = ({ sm, md, lg }) => ({
    '@media (min-width: 0)': {
        fontSize: sm,
    },
    '@media (min-width: 768px)': {
        fontSize: md,
    },
    '@media (min-width: 1200px)': {
        fontSize: lg,
    },
})

const FONT_EXTRABOLD = 800
const FONT_BOLD = 700
const FONT_SEMIBOLD = 600
const FONT_MEDIUM = 500
const FONT_REGULAR = 400

const typography = {
    fontFamily: "'Inter', sans-serif",
    h2: {
        fontWeight: FONT_SEMIBOLD,
        ...responsiveFontSizes({ sm: 14, md: 20, lg: 24 }),
    },
    title1: {
        fontWeight: FONT_SEMIBOLD,
        ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 }),
    },
    title2: {
        fontWeight: FONT_MEDIUM,
        ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 }),
    },
    title3: {
        fontWeight: FONT_MEDIUM,
        ...responsiveFontSizes({ sm: 12, md: 12, lg: 15 }),
    },
    body1: {
        fontWeight: FONT_REGULAR,
        letterSpacing: '-0.01em',
        lineHeight: '20px',
        ...responsiveFontSizes({ sm: 12, md: 14, lg: 14 }),
    },
    body2: {
        fontWeight: FONT_REGULAR,
        letterSpacing: '-0.01em',
        lineHeight: '20px',
        ...responsiveFontSizes({ sm: 12, md: 13, lg: 13 }),
    }
}

export default typography
