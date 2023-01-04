import React from 'react'
import { Box } from "@mui/material"

import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';

const CircularProgressCustom = (props) => (
    <Box sx={{ position: 'relative' }}>
        <CircularProgress
            variant="determinate"
            sx={{
                color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={40}
            thickness={4}
            {...props}
            value={100}
        />
        <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
                color: "secondary",
                animationDuration: '750ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round', }
            }}
            size={40}
            thickness={4}
            {...props}
        />
    </Box>
);

export default CircularProgressCustom