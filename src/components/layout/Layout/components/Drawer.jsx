/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    ListItemText,
    ListItem,
    ListItemButton,
    List,
    Box,
    ButtonBase,
    Drawer as DrawerIo,
    Divider,
    Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { get, find } from "lodash";
import { useNavigate, useHref } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Quanto from "../../../../assets/icons/Quanto";
import InputSearch from "../../../../components/form/InputSearch";
import { orange } from "../../../../config/theme/colors"

import routes from "../../../../config/routes/routes";

const Drawer = ({ drawerWidth, toolbarHeight }) => {
    const navigate = useNavigate();
    const href = useHref();
    const [active, setActive] = useState(0);
    const [__] = useTranslation("global");

    const handleClick = (act) => () => {
        setActive(get(act, "key"))
        navigate(get(act, "path"))
    }

    const onUserBtn = () => {
        navigate("/profile")
    }

    const titles = __('layout.titles', { returnObjects: true })
    const menus = __('layout.menus', { returnObjects: true })

    const options = [
        {
            key: 1,
            name: get(titles, "[0]"),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "active_inventory",
            name: get(menus, "[0]"),
            path: get(find(routes, ({ key }) => key === "active_inventory"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "inventory",
            name: get(menus, "[1]"),
            path: get(find(routes, ({ key }) => key === "inventory"), "path"),
            title: false,
            divider: true,
        },
        {
            key: 4,
            name: get(titles, "[1]"),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "counts",
            name: get(menus, "[2]"),
            path: get(find(routes, ({ key }) => key === "counts"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "payments",
            name: get(titles, "[2]"),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "payment_history",
            name: get(menus, "[3]"),
            path: get(find(routes, ({ key }) => key === "payment_history"), "path"),
            title: false,
            divider: true,
        },
    ]

    useEffect(() => {
        setActive(get(find(options, ({ path }) => path === href), "key"))
    }, [href])

    const drawer = (
        <Box className='flex-1 flex flex-col justify-between' >
            <Box>
                <Box height={toolbarHeight}>
                    <Quanto sx={{ width: "100%", height: '100%' }} />
                </Box>
                <InputSearch sx={{ ml: 5, mr: 3, mb: 2 }} size="small" color="secondary" />
                <List>
                    {options.map((item, index) => (
                        <>
                            <ListItem key={get(item, "key")} disablePadding>
                                <ListItemButton
                                    onClick={handleClick(item)}
                                    disabled={get(item, "title")}
                                    sx={{
                                        bgcolor: active === get(item, "key")
                                            ? orange[50]
                                            : "background.paper",
                                        "&:hover": { bgcolor: orange[50] }
                                    }}
                                >
                                    <ListItemText primary={
                                        <Typography
                                            variant={active === get(item, "key") ? "buttonMedium" : (get(item, "title") ? "bodySmall" : "bodyMedium")}
                                            // color={get(item, "title") ? "text.lite" : "text.main"}
                                            color="text.main"
                                        >
                                            {get(item, "name")}
                                        </Typography>
                                    } />
                                    {!(get(item, "title") || (active === get(item, "key"))) &&
                                        <NavigateNextIcon />
                                    }
                                </ListItemButton>
                            </ListItem>
                            {get(item, "divider") && <Divider />}
                        </>
                    ))}
                </List>
            </Box>

            <Box className='flex mx-6 my-8 '>
                <ButtonBase className='flex-1' sx={{ borderRadius: 4 }} onClick={onUserBtn}>
                    <Box className='flex-1 p-4 flex items-center justify-between border rounded-2xl'>
                        <Box className='text-left'>
                            <Typography variant="buttonMedium">
                                Ed warren
                            </Typography>
                            <br />
                            <Typography variant="bodySmall">
                                AS1837645
                            </Typography>
                        </Box>
                        <Box>
                            <SettingsIcon color="primary" />
                        </Box>
                    </Box>
                </ButtonBase>
            </Box>
        </Box >
    );


    return (
        <DrawerIo
            variant="permanent"
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            open
        >
            {drawer}
        </DrawerIo>
    )
}

export default Drawer