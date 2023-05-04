import React from 'react'
import { SectionsWrap } from '../../theme/styled-components'
import { Divider, Stack, Typography } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'

const OrderInfo = ({ orderData }) => {
    const isMobile = useResponsive(['sm', 'down'])
    return (
        <SectionsWrap>
            <Typography variant='h2'>Thông tin đơn hàng</Typography>
            <Stack mt={isMobile ? 1 : 4}>
                <Typography variant='title1'>Người nhận</Typography>
                <Stack my={isMobile ? 1 : 2} gap={0.5}>
                    <Typography variant='body1'>{orderData.receiverContactName}</Typography>
                    <Typography variant='body1'>{orderData.receiverContactPhone}</Typography>
                    <Typography variant='body1'>{orderData.receiverContactAddress}</Typography>
                </Stack>
            </Stack>
            <Divider />
            <Stack mt={isMobile ? 1 : 4}>
                <Typography variant='title1'>Người nhận</Typography>
                <Stack my={isMobile ? 1 : 2} gap={0.5}>
                    <Typography variant='body1'>{orderData.senderName}</Typography>
                    <Typography variant='body1'>{orderData.senderPhone}</Typography>
                    <Typography variant='body1'>{orderData.senderAddress}</Typography>
                </Stack>
            </Stack>
            <Divider />
            <Stack mt={isMobile ? 1 : 4}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='body1'>Đơn vị vận chuyển </Typography>
                    <Typography variant='body1'>Giao hàng nhanh </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='body1'>Phương thức thanh toán </Typography>
                    <Typography variant='body1'>{orderData.paymentMethod} </Typography>
                </Stack>
            </Stack>
        </SectionsWrap>
    )
}

export default OrderInfo