/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import { IconButton, Typography, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

import Table from "../../../components/form/Table";
import AlertDelete from "../../../components/form/AlertQuestion";

import { deleteInventaryCounterRequest } from "../../../store/inventary/actions/inventary/detail/deleteInventaryCounter"


const Counters = ({ getInventariDetail, filterSearch }) => {
    const [__] = useTranslation("count");

    const module = "counts"

    const [itemsDelete, setItemsDelete] = useState([]);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
    const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
    const [loadDelete, setLoadDelete] = useState(false)

    const titles = __(`${module}.table`, { returnObjects: true })

    const userState = useSelector(state => state.auth.login.dataUser);
    const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);
    const getState = useSelector(state => state);


    //  --------- Delete -------------
    const onDeleteConfirm = (items, inRow) => {
        const msg = replace(__(`${module}.modal.delete.confirm3`), "[[number]]", items?.length)
        setItemsDelete({ items, inRow })
        setAlertDelete({ open: true, title: __(`${module}.modal.delete.title`), subtitle: msg })
    }
    const onDelete = () => {
        setAlertDelete({ open: false, title: "", subtitle: "" })
        const body = {
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
            language: get(userState, "language"),
            counters: get(itemsDelete, "items.[0].counterId"),
        }
        setLoadDelete(true)
        deleteInventaryCounterRequest(body, () => getState)
            .then(({ data }) => {
                const msg = __(`${module}.modal.delete.success3`);
                setShowNoti({ open: true, msg, variant: "success" })
                getInventariDetail({ page: 1, filterSearch })
                setLoadDelete(false)
            })
            .catch((err) => {
                setShowNoti({ open: true, msg: get(err, "message",), variant: "error" })
                setLoadDelete(false)
            })
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
        </div>
    )
}

export default Counters