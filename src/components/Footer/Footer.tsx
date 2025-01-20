import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
    sx={{
      backgroundColor: "#333",
      color: "white",
      textAlign: "center",
      py: 1,
      mt: 2,
    }}
  >
    <Typography variant="body2">© 2023 All rights reserved.</Typography>
  </Box>
  )
}

export default Footer