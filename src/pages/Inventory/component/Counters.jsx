/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import { IconButton, Typography, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

import Table from "../../../components/form/Table";
import AlertDelete from "../../../components/form/AlertQuestion";
import Alert from "../../../components/form/Alert";
import Notification from "../../../components/form/Notification";

import { deleteInventaryCounterRequest } from "../../../store/inventary/actions/inventary/detail/deleteInventaryCounter"


const Counters = ({ getInventariDetail, filterSearch, inventaryId }) => {
    const [__] = useTranslation("count");

    const module = "counts"

    const [itemsDelete, setItemsDelete] = useState([]);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
    const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
    const [loadDelete, setLoadDelete] = useState(false)
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

    const titles = __(`${module}.table`, { returnObjects: true })

    const userState = useSelector(state => state.auth.login.dataUser);
    const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);
    const getState = useSelector(state => state);


    //  --------- Delete -------------
    const closeAlert = () => {
        setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
    }

    const setError = (err) => {
        if (!!get(err, "response.data") && (get(err, "response.status") !== 500)) {
            setAlert({
                open: true,
                title: get(err, "response.data.Message", ""),
                subtitle: (<ul>{map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
                type: "error",
                btn: __(`${module}.actions.close`),
                func: closeAlert
            })
        } else {
            setShowNoti({ open: true, msg: get(err, "message"), variant: "error" })
        }
    }

    const onDeleteConfirm = (items, inRow) => {
        const msg = replace(__(`${module}.modal.delete.confirm3`), "[[number]]", items?.length)
        setItemsDelete({ items, inRow })
        setAlertDelete({ open: true, title: __(`${module}.modal.delete.title`), subtitle: msg })
    }
    const onDelete = () => {
        setAlertDelete({ open: false, title: "", subtitle: "" })
        const body = {
            // userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
            language: localStorage.getItem("lang"),
            counterid: get(itemsDelete, "items.[0].counterId"),
            inventoryid: inventaryId
        }
        setLoadDelete(true)
        deleteInventaryCounterRequest(body, () => getState)
            .then(({ data }) => {
                const msg = __(`${module}.modal.delete.success3`);
                setShowNoti({ open: true, msg, variant: "success" })
                getInventariDetail({ page: 1, filterSearch })
                setLoadDelete(false)
            })
            .catch((err) => { setError(err); setLoadDelete(false) })
    }
    const onDeleteCancel = () => {
        setAlertDelete({ open: false, title: "", subtitle: "" })
    }


    //  --------- Tabla -------------

    const headTable = [
        {
            key: "counterName",
            label: get(titles, "[0]"),
            align: "left",
        },
        {
            key: "delete",
            label: "",
            align: "center",
        },
    ]

    const dataTable = map(get(inventaryDetailState, "data.data.countsUsers", []), (row, i) => {
        return ({
            id: get(row, "counterId"),
            ...row,
            active: <Chip label={<Typography variant="bodyXtraSmall">{get(row, "active", false) ? __(`${module}.status.active`) : __(`${module}.status.inactive`)}</Typography>} color={get(row, "active") ? "success" : "error"} />,
            delete: <IconButton aria-label="delete" size="small" onClick={() => onDeleteConfirm([row], true)}><DeleteIcon fontSize="small" /></IconButton>
        })
    })

    return (
        <div>
            <Table headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                sizeFilters={125}
                propsTableCell={{ padding: "checkbox", height: 42 }}
                loading={get(inventaryDetailState, "isLoading", false)}
                propsContainer={{ sx: { height: 440, overflow: "auto" } }}
            />
            <AlertDelete
                title={alertDelete.title}
                subtitle={alertDelete.subtitle}
                cancel={{ label: __(`${module}.modal.delete.cancel`), func: onDeleteCancel }}
                submit={{ label: __(`${module}.modal.delete.submit`), func: onDelete }}
                openAlert={alertDelete.open}
                loading={loadDelete}
            />
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            <Alert
                title={get(alert, "title")}
                subtitle={get(alert, "subtitle")}
                btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
                btn2={{ label: get(alert, "btn2", ""), func: get(alert, "func2", () => { }) }}
                type={get(alert, "type")}
                openAlert={get(alert, "open")}
                closeAlert={closeAlert}
            />
        </div>
    )
}

export default Counters