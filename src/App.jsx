import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Breadcrumbs, Container, Grid, IconButton, Stack, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import logo from './assets/logo.png';
import OrderStep from './sections/order-step';
import { useState, useEffect } from 'react';
import OrderInfo from './sections/order-info';
import OrderDetail from './sections/order-detail';
import { SectionsWrap } from './theme/styled-components';
import qrCode from './assets/qr.png'
import ggPlay from './assets/ggplay.png'
import appStore from './assets/appstore.png'
import useResponsive from './hooks/useResponsive';

function App() {
  const [orderData, setOrderData] = useState()

  const theme = useTheme()
  const isMobile = useResponsive(['sm', 'down'])

  const breadcrumbs = [
    <Typography key="1" color="grey">
      Trang chủ
    </Typography>,
    <Typography key="2" color="grey">
      Tra cứu hành trình đơn hàng
    </Typography>,
    <Typography key="3" color="primary" fontWeight='bold'>
      Thông tin chi tiết đơn hàng
    </Typography>
  ]

  const handleGetOrderInfo = async () => {
    try {
      const res = await fetch('https://mocki.io/v1/e32d215a-360a-45e6-8155-ecae0af80225')
      const { data } = await res.json()
      setOrderData(data.order.getByCodeAndPhone);
    } catch (error) {
      throw error.message
    }
  }

  useEffect(() => {
    handleGetOrderInfo()
  }, [])

  return (
    <div>
      {/* Header */}

      <Container maxWidth='xl' sx={{ position: isMobile ? 'relative' : 'fixed', zIndex: 9999, width: '100%' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          py={1}
          px={3}
          sx={{ background: isMobile ? 'none' : 'white', borderRadius: '16px' }}
        >
          <Logo src={logo} alt="" />
          <Stack direction='row' gap={2} alignItems='center'>
            <ContactButton >
              <Typography variant='title1'>
                Liên hệ
              </Typography>
            </ContactButton>
            <IconButton sx={{ display: isMobile ? 'none' : 'flex' }}>
              <SearchIcon color='#000' />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Container maxWidth='xl'>
        <Stack gap={2} pt={isMobile ? 2 : 14}>

          {/* Breadcrumbs */}

          <Box
            sx={{ pl: isMobile ? '16px' : '70px', py: '8px', background: isMobile ? '#fff' : '#DBDBF2', borderRadius: '8px' }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>

          {
            orderData &&
            <>
              {/* Order step */}

              <OrderStep orderData={orderData} />

              {/* Order Info */}

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <OrderInfo orderData={orderData} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <OrderDetail orderData={orderData} />
                </Grid>
              </Grid>
            </>
          }
        </Stack>

        {/* Footer */}
        <SectionsWrap sx={{ mt: isMobile ? 1 : 16, mb: 2, ...(isMobile && { background: 'none', border: 'none' }) }}>
          <Grid container alignItems='center' spacing={2} >
            <Grid item xs={12} md={4}>
              <Stack direction='row' gap={2}>
                <Avatar src={qrCode} variant='square' sx={{ width: '108px', height: '108px' }} />
                <Stack gap={1}>
                  <img src={ggPlay} alt="" />
                  <img src={appStore} alt="" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack gap={isMobile ? 10 : 18} direction='row'>
                <Stack gap={2.5}>
                  <Typography variant='body1' color='text.gray'>Giới thiệu</Typography>
                  <Typography variant='body1' color='text.gray'>Sản phẩm</Typography>
                  <Typography variant='body1' color='text.gray'>Chính sách</Typography>
                </Stack>
                <Stack gap={2.5}>
                  <Typography variant='body1' color='text.gray'>Tin tức</Typography>
                  <Typography variant='body1' color='text.gray'>Câu hỏi thường gặp</Typography>
                </Stack>
              </Stack>
            </Grid>
            {
              !isMobile &&
              <Grid item xs={12} md={4}>
                <Avatar src={qrCode} variant='square' sx={{ width: '190px', height: '190px' }} />
              </Grid>
            }
          </Grid>
        </SectionsWrap>
      </Container>
    </div>
  )
}

const ContactButton = styled('button')(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '18px',
  background: ' #005EFF',
  border: 'none',
  outline: 'none',
  color: 'white',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '50px',
    background: 'linear-gradient(135deg, #0934C5 0%, #4E64E3 100%);',
    padding: '10px 32px'
  }
}))

const Logo = styled('img')(({ theme }) => (
  {
    [theme.breakpoints.down('sm')]: {
      height: '40px'
    }
  }
))

export default App
