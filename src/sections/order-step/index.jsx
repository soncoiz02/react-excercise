import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, IconButton, Stack, Step, StepConnector, StepLabel, Stepper, Typography, stepConnectorClasses, styled } from '@mui/material';
import { format } from 'date-fns';
import React, { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { MainButton, SectionsWrap } from '../../theme/styled-components';

const OrderStep = ({ orderData }) => {

    const activeStep = orderData.fullEvents.findIndex(event => event.state === 'CURRENT')
    const prevAction = orderData.fullEvents[activeStep - 1]

    const isMobile = useResponsive(['sm', 'down'])

    const [openStep, setOpenStep] = useState(false)

    return (
        <Stack>
            <SectionsWrap>
                <Stack gap={6}>
                    <Stack direction='row' width='100%' position='relative' justifyContent={isMobile ? 'space-between' : 'flex-start'}>
                        <Stack gap={1} width='100%'>
                            <Stack justifyContent='space-between' direction='row' alignItems='center'>
                                <Typography variant='h2'>Lộ trình đơn hàng</Typography>
                                {
                                    isMobile &&
                                    <Typography variant='body1' color='primary'>#DH{orderData.number}</Typography>
                                }
                            </Stack>
                            {
                                isMobile ?
                                    <Stack justifyContent='space-between' direction='row' alignItems='center' width='100%'>
                                        <Stack>
                                            <Typography variant='body1' color='#0EAB10'>{prevAction.name}</Typography>
                                            <Typography variant='body2' >{`${format(new Date(prevAction.createdAt), 'hh:mm')} - ${format(new Date(prevAction.createdAt), 'dd/MM/yyyy')}`}</Typography>
                                        </Stack>
                                        <IconButton color='primary' onClick={() => setOpenStep(!openStep)}>
                                            <KeyboardArrowUp sx={{
                                                transition: '1s',
                                                transform: openStep ? 'rotate(0)' : 'rotate(180deg)'
                                            }} />
                                        </IconButton>
                                    </Stack>
                                    :
                                    <Stack direction='row' gap={1} >
                                        <Typography variant='title3'>Mã đơn hàng: </Typography>
                                        <Typography variant='title2'>{orderData.number}</Typography>
                                    </Stack>
                            }
                        </Stack>
                        <Box sx={{
                            width: '50%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            display: isMobile ? 'none' : 'flex'
                        }}>
                            <Stepper activeStep={0} alternativeLabel>
                                <Step key={1} >
                                    <StepLabel>{orderData.senderAddress}</StepLabel>
                                </Step>
                                <Step key={2} >
                                    <StepLabel>{orderData.receiverContactAddress}</StepLabel>
                                </Step>
                            </Stepper>
                        </Box>
                    </Stack>
                    {
                        !isMobile &&
                        <Stack gap={4} mt={6}>
                            <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                                {
                                    orderData.fullEvents.map((event, index) =>
                                        <Step key={index}>
                                            <StepLabel>{event.name}</StepLabel>
                                            {
                                                event.createdAt &&
                                                <TimeText alignItems='center'>
                                                    <Typography variant='body2' color='text.gray'>{format(new Date(event.createdAt), 'hh:mm:ss')}</Typography>
                                                    <Typography variant='body1'>{format(new Date(event.createdAt), 'dd/MM/yyyy')}</Typography>
                                                </TimeText>
                                            }
                                        </Step>
                                    )
                                }
                            </Stepper>
                            <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={1}>
                                <MainButton variant='contained'>
                                    Thông tin chi tiết
                                </MainButton>
                                <MainButton variant='outlined'>
                                    Khiếu nại
                                </MainButton>
                            </Stack>
                        </Stack>
                    }
                </Stack>
            </SectionsWrap>
            {
                isMobile &&
                <Stack gap={4}
                    sx={{
                        width: '90%',
                        alignSelf: 'flex-end',
                        background: 'white',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        position: 'relative',
                        transition: '1s',
                        overflow: 'hidden',
                        visibility: openStep ? 'visible' : 'hidden',
                        height: openStep ? '100%' : 0
                    }}
                >
                    <Stepper activeStep={activeStep} connector={<QontoConnector />} orientation='vertical'>
                        {
                            orderData.fullEvents.map((event, index) =>
                                <Step key={index}>
                                    <StepLabel>{event.name}</StepLabel>
                                    {
                                        event.createdAt &&
                                        <TimeText alignItems='center' direction='row' gap={1}>
                                            <Typography variant='body2' color='text.gray'>{format(new Date(event.createdAt), 'hh:mm:ss')}</Typography>
                                            <Typography variant='body1' color='text.gray'>{format(new Date(event.createdAt), 'dd/MM/yyyy')}</Typography>
                                        </TimeText>
                                    }
                                </Step>
                            )
                        }
                    </Stepper>
                    <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={1}>
                        <MainButton variant='contained'>
                            Thông tin chi tiết
                        </MainButton>
                        <MainButton variant='outlined'>
                            Khiếu nại
                        </MainButton>
                    </Stack>
                </Stack>
            }
        </Stack>
    )
}

// const ProgressEl = styled(Box)`

// `

const TimeText = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    top: '-50px',
    left: ' 50%',
    transform: 'translate(-50%, 0)',
    [theme.breakpoints.down('sm')]: {
        top: 'auto',
        left: '30%'
    }
}))

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

export default OrderStep