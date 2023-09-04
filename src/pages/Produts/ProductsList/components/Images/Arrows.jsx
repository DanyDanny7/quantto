import React from 'react'
import { IconButton, Box } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Box className={`${className} !h-auto !w-auto !left-[-32px]`} onClick={onClick} sx={{ "&::before": { display: "none" } }}>
            <IconButton aria-label="prev" size="small" color="secondary" sx={{ bgcolor: ({ palette }) => palette.color.blue[50], transform: "traslateY(-50%)" }}>
                <ArrowLeftIcon fontSize="inherit" color="inherit" />
            </IconButton>
        </Box>
    );
}

export const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Box className={`${className} !h-auto !w-auto !right-[-32px]`} onClick={onClick} sx={{ "&::before": { display: "none" } }}>
            <IconButton aria-label="next" size="small" color="secondary" sx={{ bgcolor: ({ palette }) => palette.color.blue[50], transform: "traslateY(-50%)" }}>
                <ArrowRightIcon fontSize="inherit" color="inherit" />
            </IconButton>
        </Box>
    );
}

