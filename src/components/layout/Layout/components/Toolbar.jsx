import React from 'react'
import { styled } from '@mui/material/styles';
import { get } from "lodash";
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Toolbar as ToolbarUi, Button, IconButton, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledToolbar = styled(ToolbarUi)(({ theme }) => ({
    alignItems: 'center',
    '@media all': {
        padding: theme.spacing(2, 5),
        backgroundColor: theme.palette.color.neutral[200]
    },
}));

const Toolbar = ({
    toolbarHeight,
    propsToolbar = { label: "", btnLabel: "", btnFunc: () => { }, color: "primary" },
    goBack
}) => {
    const navigate = useNavigate();

    return (
        <StyledToolbar sx={{ height: toolbarHeight }} >
            <Box className='flex flex-col' sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                    {!!goBack &&
                        <IconButton onClick={() => navigate(-1)} >
                            <ArrowBackIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    }
                    <Typography variant="heading2" color="text.main" gutterBottom >
                        {get(propsToolbar, "title")}
                    </Typography>
                </Stack>
                <Typography variant="bodySmall" color="text.main" >
                    {get(propsToolbar, "label")}
                </Typography>
            </Box>
            {get(propsToolbar, "btnLabel", false) &&
                <Button color={get(propsToolbar, "color")} variant="contained" size='large' onClick={get(propsToolbar, "btnFunc")} >
                    {get(propsToolbar, "btnLabel")}
                </Button>
            }
        </StyledToolbar>
    )
}

export default Toolbar