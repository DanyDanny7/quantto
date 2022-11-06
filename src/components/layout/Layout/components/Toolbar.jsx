import React from 'react'
import { styled } from '@mui/material/styles';
import { get } from "lodash";

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
    propsToolbar = { label: "", btnLabel: "", code: "", btnFunc: () => { } }
}) => {

    return (
        <StyledToolbar sx={{ height: toolbarHeight }} >
            <Box className='flex flex-col' sx={{ flexGrow: 1 }}>
                <Typography variant="heading2" color="text.main" gutterBottom >
                    {get(propsToolbar, "title")}
                </Typography>
                <Typography variant="bodySmall" color="text.main" >
                    {get(propsToolbar, "label")}
                </Typography>
            </Box>
            {get(propsToolbar, "btnLabel", false) &&
                <Button color="primary" variant="contained" size='large' onClick={get(propsToolbar, "btnFunc")} >
                    {get(propsToolbar, "btnLabel")}
                </Button>
            }
        </StyledToolbar>
    )
}

export default Toolbar