import { Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import { SectionsWrap } from '../../theme/styled-components'
import useResponsive from '../../hooks/useResponsive'

const OrderDetail = ({ orderData }) => {
    const isMobile = useResponsive(['sm', 'down'])

    return (
        <SectionsWrap>
            <Stack gap={isMobile ? 1 : 3}>
                <Typography variant='h2'>Chi tiết đơn hàng</Typography>
                {
                    isMobile ? null
                        :
                        <CustomTable border='1'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Hình ảnh</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên Sản phẩm</th>
                                    <th>Phân loại</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderData.items.map((item, index) =>
                                        <tr key={item.productID}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <ProductImg src={item.product.imageURL} alt="" />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>{item.productCode}</td>
                                            <td>{item.product.variantAttributeValues}</td>
                                            <td>{`${item.quantity} ${item.product.uom.name}`}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </CustomTable>
                }
                <Stack direction='row' alignItems='center' width='100%' justifyContent={isMobile ? 'space-between' : 'flex-start'} gap={4} alignSelf={isMobile ? 'flex-start' : 'flex-end'}>
                    <Typography variant='body1'>Tổng thanh toán đơn hàng</Typography>
                    <Typography variant='h2' color='primary'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderData.total)}</Typography>
                </Stack>
                {
                    isMobile &&
                    orderData.items.map((item, index) => (
                        <Stack
                            key={item.productID}
                            direction='row'
                            justifyContent='space-between'
                            p={1}
                            sx={{
                                background: '#E9EEF5',
                                borderRadius: '8px'
                            }}
                            gap={1}
                        >
                            <Stack>
                                <Typography variant='h2'>{`${index + 1}/ ${item.productName}`}</Typography>
                                <Typography variant='title3' fontStyle='italic'>{item.productCode}</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant='title2' color='primary'>x {`${item.quantity} ${item.product.uom.name}`}</Typography>
                                <ProductImg src={item.product.imageURL} />
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </SectionsWrap>
    )
}

const ProductImg = styled('img')`
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center
`

const CustomTable = styled('table')(({ theme }) => `
    border-spacing: 0;
    border-collapse: separate;
    border-radius: 20px;
    border: 1px solid #A1A1B2;
    
    th {
        padding: 28px;
        background: #DBDBF2;
        border-bottom: 1px solid #F5F5FA;
        font-size: 18px;
        font-weight: 500;
        color: #434657;
        &:first-child {
            border-radius: 20px 0 0 0;
        }
        &:last-child {
            border-radius: 0 20px 0 0;
        }
    }

    td {
        text-align: center;
        border-bottom: 1px solid #F5F5FA;
    }

    tr:hover {
        color: ${theme.palette.primary.main};
    }
`,)

export default OrderDetail