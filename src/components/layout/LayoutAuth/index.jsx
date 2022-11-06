import React from 'react';
import { Box, CardMedia } from '@mui/material';
import { get } from "lodash";
import { Helmet } from "react-helmet";

const LayoutAuth = ({ title, type, children, ...restProps }) => {

    const getType = (key) => {
        switch (key) {
            case "login": return { name: "", src: "/images/auth/login.png", };
            case "forgot_pass": return { name: "", src: "/images/auth/forgot.png", };
            case "forgot_pass_reject": return { name: "", src: "/images/auth/reject_recover.png", };
            case "recover_pass_request": return { name: "", src: "/images/auth/check_email.png", };
            case "register": return { name: "", src: "/images/auth/register.png", };
            case "recover_pass_receive": return { name: "", src: "/images/auth/recover_pass.png", };
            default: return { name: "", src: "/images/auth/login.png", };
        }
    }

    return (
        <Box {...restProps}>
            <Helmet><title>{title}</title></Helmet>
            <Box className='flex'>
                <CardMedia
                    component="image"
                    image={get(getType(type), "src")}
                    alt="Live from space album cover"
                    sx={{ width: "45%", height: "100vh", bgcolor: "#1b0700" }}
                />
                <Box className='overflow-auto h-screen flex-1 py-8'>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default LayoutAuth