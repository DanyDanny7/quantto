import React from 'react'
import { styled } from '@mui/material/styles';
import { get } from "lodash";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { LoadingButton } from '@mui/lab';

import { Box, Typography, Toolbar as ToolbarUi, IconButton, Stack } from '@mui/material';
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
    propsToolbar = {
        title: "Quanto",
        label: "",
        btnLabel: "",
        btnFunc: () => { },
        color: "primary",
        btnLabel2: "",
        loading: false,
        btnFunc2: () => { },
        color2: "primary",
        loading2: false,
        customBtn: null
    },
    goBack
}) => {
    const navigate = useNavigate();

    return (
        <StyledToolbar sx={{ height: toolbarHeight }} >
            <Helmet><title>{get(propsToolbar, "title")}</title></Helmet>
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
            {!!get(propsToolbar, "customBtn")
                ? (
                    get(propsToolbar, "customBtn")
                ) : (
                    <Stack direction="row-reverse" spacing={2} alignItems="right">
                        {get(propsToolbar, "btnLabel", false) &&
                            <LoadingButton loading={get(propsToolbar, "loading")} color={get(propsToolbar, "color")} variant="contained" size='large' onClick={get(propsToolbar, "btnFunc")} >
                                {get(propsToolbar, "btnLabel")}
                            </LoadingButton>
                        }
                        {get(propsToolbar, "btnLabel2", false) &&
                            <LoadingButton loading={get(propsToolbar, "loading2")} color={get(propsToolbar, "color2")} variant="contained" size='large' onClick={get(propsToolbar, "btnFunc2")} >
                                {get(propsToolbar, "btnLabel2")}
                            </LoadingButton>
                        }
                    </Stack>
                )}
        </StyledToolbar>
    )
}

export default Toolbar