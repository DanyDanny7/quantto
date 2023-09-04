/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from 'react';
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
import { useSelector } from "react-redux";

import Quanto from "../../../../assets/icons/Quanto";
// import InputSearch from "../../../../components/form/InputSearch";
import { orange } from "../../../../config/theme/colors"

import routes from "../../../../config/routes/routes";

const Drawer = ({ drawerWidth, toolbarHeight }) => {
    const navigate = useNavigate();
    const href = useHref();
    const [active, setActive] = useState(0);
    const [__] = useTranslation("global");

    const dataUser = useSelector(state => state.auth.login.dataUser);

    const handleClick = (act) => () => {
        setActive(get(act, "key"))
        navigate(get(act, "path"))
    }

    const onUserBtn = () => {
        navigate("/profile")
    }

    const options = [
        {
            key: 1,
            name: __('layout.titles.inventory'),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "active_inventory",
            name: __('layout.menu.active'),
            path: get(find(routes, ({ key }) => key === "active_inventory"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "inventory",
            name: __('layout.menu.inventory'),
            path: get(find(routes, ({ key }) => key === "inventory"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "product",
            name: __('layout.menu.product'),
            path: get(find(routes, ({ key }) => key === "product"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "warehouse",
            name: __('layout.menu.warehouse'),
            path: get(find(routes, ({ key }) => key === "warehouse"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "users",
            name: __('layout.titles.users'),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "counts",
            name: __('layout.menu.counts'),
            path: get(find(routes, ({ key }) => key === "counts"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "report",
            name: __('layout.menu.report'),
            path: get(find(routes, ({ key }) => key === "report"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "documents",
            name: __('layout.titles.documents'),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "inbound",
            name: __('layout.menu.inbound'),
            path: get(find(routes, ({ key }) => key === "inbound"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "outbound",
            name: __('layout.menu.outbound'),
            path: get(find(routes, ({ key }) => key === "outbound"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "transfer",
            name: __('layout.menu.transfer'),
            path: get(find(routes, ({ key }) => key === "transfer"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "payments",
            name: __('layout.titles.payments'),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "payment_history",
            name: __('layout.menu.payment'),
            path: get(find(routes, ({ key }) => key === "payment_history"), "path"),
            title: false,
            divider: true,
        },
        {
            key: "conf",
            name: __('layout.titles.config'),
            path: null,
            title: true,
            divider: false,
        },
        {
            key: "config",
            name: __('layout.menu.config'),
            path: get(find(routes, ({ key }) => key === "config"), "path"),
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
                <div className="sticky top-0 bg-[#FFFFFF] z-[10]">
                    <Box height={toolbarHeight} minHeight={toolbarHeight} >
                        <Quanto sx={{ width: "100%", height: '100%' }} />
                    </Box>
                </div>
                {/* <InputSearch sx={{ ml: 5, mr: 3, mb: 2 }} size="small" color="secondary" /> */}
                <List>
                    {options.map((item, index) => (
                        <Fragment key={index}>
                            <ListItem disablePadding >
                                <ListItemButton

                                    // disablePadding
                                    onClick={handleClick(item)}
                                    disabled={get(item, "title")}
                                    sx={{
                                        bgcolor: active === get(item, "key")
                                            ? orange[50]
                                            : "background.paper",
                                        "&:hover": { bgcolor: orange[50] },
                                        // ".MuiListItemText-root": { m: 0 }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant={active === get(item, "key") ? "buttonMedium" : (get(item, "title") ? "bodySmall" : "bodyMedium")}
                                                // color={get(item, "title") ? "text.lite" : "text.main"}
                                                color="text.main"
                                            >
                                                {get(item, "name")}
                                            </Typography>
                                        }
                                    />
                                    {!(get(item, "title") || (active === get(item, "key"))) &&
                                        <NavigateNextIcon />
                                    }
                                </ListItemButton>
                            </ListItem>
                            {get(item, "divider") && <Divider />}
                        </Fragment>
                    ))}
                </List>
            </Box>

            {/* <div className='sticky bottom-0 bg-[#FFFFFF]'> */}
                <Box className='flex mx-6 my-8'>
                    <ButtonBase className='flex-1' sx={{ borderRadius: 4 }} onClick={onUserBtn}>
                        <Box className='flex-1 p-4 flex items-center justify-between border rounded-2xl'>
                            <Box className='text-left'>
                                <Typography variant="buttonMedium">
                                    {get(dataUser, "username")}
                                </Typography>
                                <br />
                                <Typography variant="bodySmall">
                                    {get(dataUser, "companyname")}
                                </Typography>
                            </Box>
                            <Box>
                                <SettingsIcon color="primary" />
                            </Box>
                        </Box>
                    </ButtonBase>
                </Box>
            {/* </div> */}
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