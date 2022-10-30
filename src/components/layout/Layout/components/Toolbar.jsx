import React from 'react'
import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { replace, get } from "lodash";

import { Box, Typography, Toolbar as ToolbarUi, Button } from '@mui/material';

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
        title: "Inventario",
        code: "#Asq937614",
        btnLabel: "Finalizar conteo",
        btnFunc: () => { }
    }
}) => {
    const [__] = useTranslation("global");

    return (
        <StyledToolbar sx={{ height: toolbarHeight }} >
            <Box className='flex flex-col' sx={{ flexGrow: 1 }}>
                <Typography variant="heading2" color="text.main" gutterBottom >
                    {get(propsToolbar, "title")}
                </Typography>
                {get(propsToolbar, "code") &&
                    <Typography variant="bodySmall" color="text.main" >
                        {replace(__('header.sub-title'), "[[code]]", get(propsToolbar, "code"))}
                    </Typography>
                }
            </Box>
            <Button color="primary" variant="contained" size='large' onClick={get(propsToolbar, "btnFunc")} >
                {get(propsToolbar, "btnLabel")}
            </Button>
        </StyledToolbar>
    )
}

export default Toolbar