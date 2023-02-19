/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import { get, map, replace, join, toString } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Divider,
    IconButton,
    Typography,
    MenuList,
    MenuItem,
    Popover,
    Collapse,
    Stack,
    Tooltip,
    Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PanToolIcon from '@mui/icons-material/PanTool';

import Layout from "../../../../components/layout/Layout"
import Table from "../../../../components/form/Table";
import Notification from "../../../../components/form/Notification";
import AlertQuestion from "../../../../components/form/AlertQuestion";
import Alert from "../../../../components/form/Alert";

import Toolbar from "./components/Toolbar"

import { getInventaryCounts } from "../../../../store/inventary/thunk/getInventary/counts/getCounts";
import { deleteInventaryCountRequest } from "../../../../store/inventary/actions/inventary/counts/deleteCounts";
import { putInventaryReCountRequest } from "../../../../store/inventary/actions/inventary/counts/putReCounts";

const ActiveInventory = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [__] = useTranslation("inve");
    const module = "counts"
    const inventaryId = get(params, "detailId")
    const detailId = get(params, "countId")

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selected, setSelected] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
    const [filterSearch, setFilterSearch] = useState("")

    const [alertReCount, setAlertReCount] = useState({ open: false, title: "", subtitle: "" })
    const [itemsReCount, setItemsReCount] = useState({});
    const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
    const [itemsDelete, setItemsDelete] = useState([]);
    const [loadingReCount, setLoadingReCount] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

    const titles = __(`${module}.table`, { returnObjects: true });

    const inventaryDetailState = useSelector(state => state.inventary.inventary.counts);
    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const getData = ({ page, filterSearch }) => {
        const filters = { page, inventoryid: inventaryId, inventorydetailid: detailId, ...(!!filterSearch && { search: filterSearch }) }
        dispatch(getInventaryCounts(filters))
    }

    useEffect(() => {
        getData({ page: 1, filterSearch })
    }, [dispatch, filterSearch])


    //  --------- Recount -------------
    const onReCountConfirm = (items, inRow) => {
        handleClose()
        let msg = ""
        if (inRow) {
            msg = replace(__(`${module}.modal.recount.confirm1`), "[[product]]", get(items, "[0].itemname", "- -"))
            msg = replace(msg, "[[name]]", get(items, "[0].counter", "- - "))
        } else {
            msg = replace(__(`${module}.modal.recount.confirm2`), "[[number]]", items?.length)
        }
        setItemsReCount({ items, inRow })
        setAlertReCount({ open: true, title: __(`${module}.modal.recount.title`), subtitle: msg })
    }

    const onReCount = () => {
        console.log("acá enviamos esto")
        setAlertReCount({ open: false, title: "", subtitle: "" })
        const body = {
            inventoryid: get(params, "detailId"),
            countid: get(itemsReCount, "inRow") ? toString(get(itemsReCount, "items.[0].inventoryTemplateLineCountId")) : join(get(itemsReCount, "items"), ","),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
            language: localStorage.getItem("lang"),
            markedRecount: true,
        }
        console.log(body)
        setLoadingReCount(true)
        putInventaryReCountRequest(body, () => getState)
            .then(({ data }) => {
                let msg = ""
                if (get(itemsReCount, "inRow")) {
                    msg = replace(__(`${module}.modal.recount.success1`), "[[product]]", get(itemsReCount, "items.[0].itemname", "- -"))
                    msg = replace(msg, "[[name]]", get(itemsReCount, "items.[0].counter", "- - "))
                } else {
                    msg = replace(__(`${module}.modal.recount.confirm2`), "[[number]]", get(itemsReCount, "items")?.length)
                }
                setShowNoti({ open: true, msg, variant: "success" })
                setSelected([])
                getData({ page: 1, filterSearch })
                setLoadingReCount(false)
            })
            .catch((err) => { setError(err); setLoadingReCount(false) })
    }

    const onReCountCancel = () => {
        setAlertReCount({ open: false, title: "", subtitle: "" })
    }

    const setError = (err) => {
        if (!!get(err, "response.data") && (get(err, "response.status") !== 500)) {
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
    const closeAlert = () => {
        setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
    }

    //  --------- Delete -------------
    const onDeleteConfirm = (items) => {
        handleClose()
        let msg = ""
        msg = replace(__(`${module}.modal.delete.confirm1`), "[[product]]", get(items, "[0].itemname", "- -"))
        setItemsDelete(items)
        setAlertDelete({ open: true, title: __(`${module}.modal.delete.title`), subtitle: msg })
    }
    const onDelete = () => {
        setAlertDelete({ open: false, title: "", subtitle: "" })
        const body = {
            userid: get(userState, "userId"),
            companyid: get(userState, "companyId"),
            language: localStorage.getItem("lang"),
            countid: `${get(itemsDelete, "[0].inventoryTemplateLineCountId")}`,
            inventoryid: get(params, "detailId"),
        }
        setLoadingDelete(true)
        deleteInventaryCountRequest(body, () => getState)
            .then(({ data }) => {
                const msg = replace(__(`${module}.modal.delete.success1`), "[[product]]", get(itemsDelete, "[0].itemname", "- -"))
                setShowNoti({ open: true, msg, variant: "success" })
                setSelected([])
                getData({ page: 1, filterSearch })
                setLoadingDelete(false)
            })
            .catch((err) => { setError(err); setLoadingDelete(false) })
    }
    const onDeleteCancel = () => {
        setAlertDelete({ open: false, title: "", subtitle: "" })
    }

    //  --------- Tabla -------------
    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setItemSelected(item)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const headTable = [
        {
            key: "create_at",
            label: get(titles, "[0]"),
            align: "center",
        },
        {
            key: "time",
            label: get(titles, "[1]"),
            align: "center"
        },
        {
            key: "product",
            label: get(titles, "[2]"),
            align: "center"
        },
        {
            key: "counter",
            label: get(titles, "[3]"),
            align: "center"
        },
        {
            key: "locationId",
            label: get(titles, "[4]"),
            align: "center"
        },
        {
            key: "qty",
            label: get(titles, "[5]"),
            align: "center"
        },
        // {
        //     key: "reconut",
        //     label: get(titles, "[6]"),
        //     align: "center"
        // },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const dataTable = map(get(inventaryDetailState, "data.data", []), (row, i) => {
        // const isItemSelected = isSelected(row.inventoryTemplateLineCountId);
        // const labelId = `enhanced-table-checkbox-${i}`;
        return ({
            id: get(row, "inventoryTemplateLineCountId"),
            ...row,
            create_at: moment(get(row, "date")).format("DD/MM/YYYY"),
            time: moment(get(row, "date")).format("hh:mm A"),
            product: (
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    <Box>{get(row, "itemname")}</Box>
                    <Collapse in={get(row, "manualRecord", false)} orientation="horizontal"><Tooltip title={__(`${module}.menu.manualrecord`)} placement="top" arrow><PanToolIcon sx={{ width: 15 }} color="info" /></Tooltip></Collapse>
                </ Stack>
            ),
            qty: (
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    <Box minWidth={0.5}>{get(row, "qty")}</Box>
                    <Collapse in={get(row, "markedRecount", false)} orientation="horizontal"><Tooltip title={__(`${module}.menu.recount`)} placement="top" arrow><WarningAmberIcon fontSize={"small"} color="error" /></Tooltip></Collapse>
                </ Stack>
            ),
            // checkbox: (
            //     <Checkbox
            //         color="secondary"
            //         checked={isItemSelected}
            //         onChange={(e, v) => handleChecked(e, row.inventoryTemplateLineCountId)}
            //         inputProps={{ 'aria-labelledby': labelId, }}
            //     />
            // ),
            options: (
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, row)}
                >
                    <MoreVertIcon />
                </IconButton>
            )
        })
    })

    return (
        <Layout
            propsToolbar={{
                title: replace(__(`${module}.header.title`), "[[code]]", get(dataTable, "[0].itemname", "--")),
                label: __(`${module}.header.sub-title`),
                code: null,
                // btnLabel: __(`${module}.btn`),
                // btnFunc: countFinish
            }}
            goBack
        >
            <Table
                toolbar={<Toolbar __={__} module={module} setFilterSearch={setFilterSearch} selected={selected} onReCount={(e) => onReCountConfirm(e, false)} />}
                headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                multipleCheckbox
                loading={get(inventaryDetailState, "isLoading", false)}
            />
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
                    <MenuItem onClick={() => onReCountConfirm([itemSelected], true)}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.modal.recount.submit`)}</strong></Typography></MenuItem>
                    <Divider />
                    <MenuItem onClick={() => onDeleteConfirm([itemSelected], true)}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.modal.delete.submit`)}</strong></Typography></MenuItem>
                </MenuList>
            </Popover>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            <AlertQuestion
                title={alertReCount.title}
                subtitle={alertReCount.subtitle}
                cancel={{ label: __(`${module}.modal.recount.cancel`), func: onReCountCancel }}
                submit={{ label: __(`${module}.modal.recount.submit`), func: onReCount }}
                openAlert={alertReCount.open}
                loading={loadingReCount}
            />
            <AlertQuestion
                title={alertDelete.title}
                subtitle={alertDelete.subtitle}
                cancel={{ label: __(`${module}.modal.delete.cancel`), func: onDeleteCancel }}
                submit={{ label: __(`${module}.modal.delete.submit`), func: onDelete }}
                openAlert={alertDelete.open}
                loading={loadingDelete}
            />
            <Alert
                title={get(alert, "title")}
                subtitle={get(alert, "subtitle")}
                btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
                btn2={{ label: "", func: () => { } }}
                type={get(alert, "type")}
                openAlert={get(alert, "open")}
                closeAlert={closeAlert}
            />
        </Layout>
    )
}

export default ActiveInventory;