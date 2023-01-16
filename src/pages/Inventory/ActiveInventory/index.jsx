/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, isNull, map, replace, isEmpty } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import {
    Divider,
    IconButton,
    Paper,
    Grid,
    Box,
    Typography,
    MenuList,
    MenuItem,
    Popover,
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';

import CircularProgress from "../../../components/form/CircularProgress";
import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import PieChart from "../component/PieChart";
import BarChart from "../component/BarChart";
import Toolbar from "../Inventory/Toolbar";
import Alert from "../../../components/form/Alert";
import AlertQuestion from "../../../components/form/AlertQuestion";
import Notification from "../../../components/form/Notification";

import { getInventaryActive } from "../../../store/inventary/thunk/getInventaryActive";
import { putInventaryEndRequest } from "../../../store/inventary/actions/inventary/detail/putInventaryEnd";

const LoadingData = () => (
    <Box sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    }}>
        <CircularProgress />
    </Box>
)

const ActiveInventory = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navegate = useNavigate();
    const [__] = useTranslation("inve");
    const module = "detail"


    const [anchorEl, setAnchorEl] = useState(null);
    const [active, setActive] = useState({});
    const open = Boolean(anchorEl);
    const [alertIsEmpty, setAlertIsEmpty] = useState({ open: false, title: "", subtitle: "" })
    const [filterSearch, setFilterSearch] = useState("")
    const [alertActive, setAlertActive] = useState(false);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const [alertFinish, setAlertFinish] = useState({ open: false, title: "", subtitle: "" })
    const [loadFinish, setLoadFinish] = useState(false)
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

    const titles = __(`${module}.table`, { returnObjects: true });

    const inventaryActive = useSelector(state => state.inventary.inventaryActive);
    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const detailId = get(inventaryActive, "data.data.inventoryId", "--")
    const code = `#${detailId}`

    const getData = ({ page, filterSearch }) => {
        const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
        dispatch(getInventaryActive(filters))
    }

    useEffect(() => {
        getData({ page: 1, filterSearch })
    }, [dispatch, filterSearch])

    useEffect(() => {
        if (get(inventaryActive, "isSuccess") && isEmpty(get(inventaryActive, "data.data"))) {
            setAlertIsEmpty({ open: true, title: __(`${module}.active.title`), subtitle: __(`${module}.active.subtitle`) })
        } else {
            setAlertIsEmpty({ open: false, title: "", subtitle: "" })
        }
    }, [get(inventaryActive, "isSuccess"), get(inventaryActive, "isLoading")])

    const onCancelAlertQuestion = () => {
        setAlertIsEmpty({ open: false, title: "", subtitle: "" })
    }

    // ---------- Table ---------------
    const headTable = [
        {
            key: "itemId",
            label: get(titles, "[0]"),
            align: "left",
        },
        {
            key: "itemName",
            label: get(titles, "[1]"),
            align: "left"
        },
        // {
        //   key: "category",
        //   label: get(titles, "[2]"),
        //   align: "center"
        // },
        {
            key: "barCode",
            label: get(titles, "[3]"),
            align: "center"
        },
        {
            key: "inventory",
            label: get(titles, "[4]"),
            align: "center"
        },
        {
            key: "stock",
            label: get(titles, "[5]"),
            align: "center"
        },
        {
            key: "diference",
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
        "count-name": get(inventaryActive, "data.data.name", "- -"),
        "start": isNull(get(inventaryActive, "data.data.startDate")) ? "- -" : moment(get(inventaryActive, "data.data.startDate")).format("DD/MM/YY - HH:mm A"),
        "end": isNull(get(inventaryActive, "data.data.endDate")) ? "- -" : moment(get(inventaryActive, "data.data.endDate")).format("DD/MM/YY - HH:mm A"),
        "progress": get(inventaryActive, "data.data.percentage", "- -"),
        "units-counted": get(inventaryActive, "data.data.itemsQty", "- -"),
        "elapsed-time": get(inventaryActive, "data.data.time", "- -"),
    }

    const handleClick = (e) => (event) => {
        setAnchorEl(event.currentTarget);
        setActive(e)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const showMore = () => {
        navegate(`${get(inventaryActive, "data.data.inventoryId")}/count/${get(active, "inventoryDetailId")}`)
    }

    const dataTable = map(get(inventaryActive, "data.data.countsTemplate", []), (row) => ({
        ...row,
        options: (
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick(row)}
            >
                <MoreVertIcon />
            </IconButton>
        )
    }))

    // ---------- Actions ---------------

    const closeAlert = () => {
        setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
    }

    const setError = (err) => {
        if (!!get(err, "response.data")) {
            setAlert({
                open: true,
                title: get(err, "response.data.Message", ""),
                subtitle: (<ul>{map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
                type: "error",
                btn: __(`${module}.button.close`),
                func: closeAlert
            })
        } else {
            setShowNoti({ open: true, msg: get(err, "message"), variant: "error" })
        }
    }

    const onFinish = () => setAlertFinish({ open: true, title: __(`${module}.actions.finish.title`), subtitle: replace(__(`${module}.actions.finish.question`), "[[number]]", code) })
    const onFinishCancel = () => setAlertFinish({ open: false, title: "", subtitle: "" })
    const onFinishSubmit = () => {
        const body = {
            // inventoryid: detailId,
            language: get(userState, "language", "es"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
        }
        setLoadFinish(true)
        putInventaryEndRequest(body, () => getState)
            .then(({ data }) => {
                setShowNoti({ open: true, msg: __(`${module}.actions.finish.success`), variant: "success" })
                setLoadFinish(false)
                onFinishCancel()
                getData({ page: 1, filterSearch })
            })
            .catch((err) => { setError(err); setLoadFinish(false) })
    }

    return (
        <Layout
            propsToolbar={{
                title: replace(__(`${module}.header.title-2`), "[[code]]", code),
                label: replace(__(`${module}.header.sub-title-2`), "[[code]]", code),
                btnLabel: __(`${module}.actions.finish.title`),
                btnFunc: onFinish,
                color: "primary"
            }}
        >
            <Box className='mb-6'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={3}>
                        <Paper elevation={[1]} className='py-8 px-6 overflow-auto h-full'>
                            {get(inventaryActive, "isLoading", false)
                                ? (
                                    <LoadingData />
                                ) : (
                                    <>
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
                                    </>
                                )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <Paper elevation={[1]} className='py-8 px-6 h-full'>
                            <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-2.title`)}</Typography>
                            <Box className='m-auto my-6' maxWidth={250} >
                                <PieChart values={[get(inventaryActive, "data.data.getCountsPieChart.counted", 0), get(inventaryActive, "data.data.getCountsPieChart.notCounted", 0)]} />
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
                        <Paper elevation={[1]} className='py-8 px-6 h-full'>
                            <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-3.title`)}</Typography>
                            <Box className='m-auto my-6 px-6' overflow="auto">
                                <BarChart minWidth={350} countsBarChart={get(inventaryActive, "data.data.getCountsBarChart")} />
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
                </Grid >
            </Box >

            <Table
                toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
                headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                sizeFilters={125}
                loading={get(inventaryActive, "isLoading", false)}
            />

            <Popover
                id={"menu-inventario-activo"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                elevation={[1]}
            >
                <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                    <MenuItem onClick={showMore}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.details`)}</strong></Typography></MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
                </MenuList>
            </Popover>
            <Alert
                title={__(`${module}.alert.alert-1.title`)}
                subtitle={__(`${module}.alert.alert-1.subtitle`)}
                btn1={{ label: __(`${module}.alert.alert-1.btn-1`), func: () => { navegate("/inventory/active") } }}
                btn2={{ label: __(`${module}.alert.alert-1.btn-2`), func: () => setAlertActive(false) }}
                openAlert={alertActive}
                closeAlert={() => setAlertActive(false)}
            />
            <AlertQuestion
                title={alertIsEmpty.title}
                subtitle={alertIsEmpty.subtitle}
                cancel={{ label: __(`${module}.active.cancel`), func: onCancelAlertQuestion }}
                submit={{ label: __(`${module}.active.submit`), func: () => navegate(`/inventory`) }}
                openAlert={alertIsEmpty.open}
            />
            <AlertQuestion
                title={alertFinish.title}
                subtitle={alertFinish.subtitle}
                cancel={{ label: __(`${module}.actions.cancel`), func: onFinishCancel }}
                submit={{ label: __(`${module}.actions.finish.title`), func: onFinishSubmit }}
                openAlert={alertFinish.open}
                loading={loadFinish}
            />
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            <Alert
                title={get(alert, "title")}
                subtitle={get(alert, "subtitle")}
                btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
                btn2={{ label: "", func: () => { } }}
                type={get(alert, "type")}
                openAlert={get(alert, "open")}
                closeAlert={closeAlert}
            />
        </Layout >
    )
}

export default ActiveInventory;