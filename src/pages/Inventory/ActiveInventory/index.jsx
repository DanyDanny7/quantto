import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Divider,
    IconButton,
    Paper,
    Grid,
    Box,
    Typography,
    MenuList,
    MenuItem,
    Popover
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import PieChart from "../component/PieChart";
import BarChart from "../component/BarChart";

import { getInventaryActive } from "../../../store/inventary/thunk/getInventaryActive";

function createData(code, product, category, barcode, onHand, counted, difference) {
    return { code, product, category, barcode, onHand, counted, difference };
}

const rows = [
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
];

const ActiveInventory = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navegate = useNavigate();
    const [__] = useTranslation("inve");
    const module = "detail"
    const code = "#Asq937614"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const inventaryActiveState = useSelector(state =>  state.inventary.inventaryActive);


    useEffect(() => {
        dispatch(getInventaryActive())
    }, [dispatch])



    const titles = __(`${module}.table`, { returnObjects: true });

    const headTable = [
        {
            key: "code",
            label: get(titles, "[0]"),
            align: "left",
        },
        {
            key: "product",
            label: get(titles, "[1]"),
            align: "center"
        },
        {
            key: "category",
            label: get(titles, "[2]"),
            align: "center"
        },
        {
            key: "barcode",
            label: get(titles, "[3]"),
            align: "center"
        },
        {
            key: "onHand",
            label: get(titles, "[4]"),
            align: "center"
        },
        {
            key: "counted",
            label: get(titles, "[5]"),
            align: "center"
        },
        {
            key: "difference",
            label: get(titles, "[6]"),
            align: "center"
        },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const card1 = {
        "count-name": "Nombre",
        "start": "09/10/22 - 9:00 AM",
        "end": "------",
        "progress": "75%",
        "units-counted": "100",
        "elapsed-time": "8:00:00",
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const showMore = () => {
        navegate("AJHG623645")
    }


    const dataTable = map(rows, (row) => ({
        ...row,
        options: (
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
        )
    }))

    return (
        <Layout
            propsToolbar={{
                title: replace(__(`${module}.header.title-2`), "[[code]]", code),
                label: replace(__(`${module}.header.sub-title-2`), "[[code]]", code),
                btnLabel: __(`${module}.btn-2`),
                btnFunc: () => { },
            }}
        >
            <Box className='mb-6'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={3}>
                        <Paper className='py-8 px-6 overflow-auto h-full'>
                            <Typography className='pb-8' component={Box} variant="heading4">{__(`${module}.cards.card-1.title`)}</Typography>
                            <Box className='mb-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.count-name`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "count-name")}</Typography>
                            </Box>
                            <Box className='my-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.start`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "start")}</Typography>
                            </Box>
                            <Box className='my-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.end`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "end")}</Typography>
                            </Box>
                            <Box className='my-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.progress`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "progress")}</Typography>
                            </Box>
                            <Box className='my-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.units-counted`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "units-counted")}</Typography>
                            </Box>
                            <Box className='my-3'>
                                <Typography variant="heading4">{__(`${module}.cards.card-1.elapsed-time`)}</Typography>
                                <Typography className='pl-2' variant="bodyMedium">{get(card1, "elapsed-time")}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <Paper className='py-8 px-6 h-full'>
                            <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-2.title`)}</Typography>
                            <Box className='m-auto my-6' maxWidth={250} >
                                <PieChart values={[90, 30]} />
                            </Box>
                            <Box className='flex items-center justify-around'>
                                <Box className='flex items-center'>
                                    <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.skyblue[500]} />
                                    <Typography variant="bodySmall">{__(`${module}.cards.card-2.counted`)}</Typography>
                                </Box>
                                <Box className='flex items-center'>
                                    <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.purplelight[300]} />
                                    <Typography variant="bodySmall">{__(`${module}.cards.card-2.not-counted`)}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xl={5}>
                        <Paper className='py-8 px-6 h-full'>
                            <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-3.title`)}</Typography>
                            <Box className='m-auto my-6 px-6' overflow="auto">
                                <BarChart minWidth={350} />
                            </Box>
                            <Box className='flex items-center justify-around'>
                                <Box className='flex items-center'>
                                    <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.greenlight[400]} />
                                    <Typography variant="bodySmall">{__(`${module}.cards.card-3.on-hand`)}</Typography>
                                </Box>
                                <Box className='flex items-center'>
                                    <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.orange[400]} />
                                    <Typography variant="bodySmall">{__(`${module}.cards.card-3.counted-units`)}</Typography>
                                </Box>
                                <Box className='flex items-center'>
                                    <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.pink[300]} />
                                    <Typography variant="bodySmall">{__(`${module}.cards.card-3.diference`)}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Table headTable={headTable} dataTable={dataTable} __={__} module={module} sizeFilters={125} />

            <Popover
                id={"menu-inventario-activo"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                elevation={1}
            >
                <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                    <MenuItem onClick={showMore}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.details`)}</strong></Typography></MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
                </MenuList>
            </Popover>
        </Layout>
    )
}

export default ActiveInventory;