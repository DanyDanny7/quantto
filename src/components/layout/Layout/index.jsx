import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from "./components/Toolbar";
import Drawer from "./components/Drawer";

const drawerWidth = 272;
const toolbarHeight = 120;

const Layout = ({ children, propsToolbar, goBack }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
                elevation={0}
                style={{ padding: "0 !important"}}
            >
                <Toolbar toolbarHeight={toolbarHeight} propsToolbar={propsToolbar} goBack={goBack} />
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer drawerWidth={drawerWidth} toolbarHeight={toolbarHeight} />
            </Box>
            <Box className='flex-1' component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.base", minHeight: "100vh", width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Box className='h-full flex flex-col' paddingTop={`${toolbarHeight}px`} >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
