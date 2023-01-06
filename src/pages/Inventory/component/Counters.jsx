/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace, join, toString } from "lodash";
import { Checkbox, IconButton, Typography, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from "react-redux";

// import Layout from "../../components/layout/Layout"
import Table from "../../../components/form/Table";
// import Notification from "../../components/form/Notification";
// import Toolbar from "./Toolbar";
// import NewCounters from "./components/NewCounters";
// import AlertDelete from "../../components/form/AlertQuestion";
import AlertDelete from "../../../components/form/AlertQuestion";

import { getInventaryDetail } from "../../../store/inventary/thunk/getInventary/detail/getDetails";
import { deleteInventaryCounterRequest } from "../../../store/inventary/actions/inventary/detail/deleteInventaryCounter"


const Counters = ({ inventory }) => {
    const [__] = useTranslation("count");
    const dispatch = useDispatch();

    const module = "counts"

    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [itemsDelete, setItemsDelete] = useState([]);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
    const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
    const [loadDelete, setLoadDelete] = useState(false)
    const [toEdit, setToEdit] = useState({});
    const [filterSearch, setFilterSearch] = useState("")

    const titles = __(`${module}.table`, { returnObjects: true })

    const userState = useSelector(state => state.auth.login.dataUser);
    const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);
    const getState = useSelector(state => state);


    const getData = () => {
        const filters = { inventoryid: get(inventory, "inventoryId") }
        // const filters = { inventoryid: 1 }
        dispatch(getInventaryDetail(filters))
    }

    useEffect(() => {
        getData()
    }, [dispatch])


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
            counters: join(get(itemsDelete, "items"), ","),
        }
        setLoadDelete(true)
        deleteInventaryCounterRequest(body, () => getState)
            .then(({ data }) => {
                const msg = __(`${module}.modal.delete.success3`);
                setShowNoti({ open: true, msg, variant: "success" })
                setSelected([])
                getData({ page: 1, filterSearch })
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
                module="payment"
                sizeFilters={125}
                propsTableCell={{ padding: "checkbox", height: 42 }}
                loading={get(inventaryDetailState, "isLoading", false)}
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