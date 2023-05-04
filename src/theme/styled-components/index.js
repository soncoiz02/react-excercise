import { Box, Button, styled } from "@mui/material"

export const MainButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
  }
}))

export const SectionsWrap = styled(Box)(({ theme }) => ({
  padding: '28px 32px',
  background: '#fff',
  borderRadius: '16px',
  border: ' 1px solid #DBDBF2',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px'
  }
}))