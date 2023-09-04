import React from 'react'

import { Box } from "@mui/material"
import CircularProgress from "./CircularProgress"

const Load = ({ children, height = 300 }) => {
    return (
        <Box sx={{
            display: 'flex',
            height,
            width: '100%',
            justifyContent: "center",
            alignItems: "center"
        }}>
            {children || <CircularProgress />}
        </Box>
    )
}

export default Load