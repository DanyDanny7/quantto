import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from "./components/Toolbar";
import Drawer from "./components/Drawer";

const drawerWidth = 272;
const toolbarHeight = 120;

const Layout = ({ children, propsToolbar }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
                elevation={0}
            >
                <Toolbar toolbarHeight={toolbarHeight} propsToolbar={propsToolbar} />
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer drawerWidth={drawerWidth} toolbarHeight={toolbarHeight} />
            </Box>
            <Box className='flex-1' component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.base", minHeight: "100vh", width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Box height={toolbarHeight} />
                {children}
            </Box>
        </Box>
    );
}

export default Layout;
