import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <Box height={'40vh'} overflow="auto" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress />
        </Box>
    )
}

export default Loader