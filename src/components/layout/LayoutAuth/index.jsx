import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { get } from "lodash";

const LayoutAuth = ({ type, children, ...restProps }) => {

    const getType = (key) => {
        switch (key) {
            case "login": return { name: "", src: "/images/auth/login.png", };
            case "forgot_pass": return { name: "", src: "/images/auth/forgot.png", };
            case "recover_pass": return { name: "", src: "/images/auth/recover_pass.png", };
            case "check_email": return { name: "", src: "/images/auth/check_email.png", };
            case "reject_recover": return { name: "", src: "/images/auth/reject_recover.png", };
            case "register": return { name: "", src: "/images/auth/register.png", };
            default: return { name: "", src: "/images/auth/login.png", };
        }
    }

    return (
        <Box {...restProps}>
            <Box className='flex'>
                <CardMedia
                    component="image"
                    image={get(getType(type), "src")}
                    alt="Live from space album cover"
                    sx={{ width: "45%", height: "100vh" }}
                />
                <Box className='overflow-auto h-screen flex-1 py-8'>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default LayoutAuth