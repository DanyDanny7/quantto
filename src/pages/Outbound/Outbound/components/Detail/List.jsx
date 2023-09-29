/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Dialog,
    Box,
    Typography,
    IconButton,
    DialogTitle,
    Stack,
    Divider,
    TextField,
} from '@mui/material';
import get from "lodash/get";
import Table from "../../../../../components/form/Table";
import map from "lodash/map";
import includes from "lodash/includes";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import Notification from "../../../../../components/form/Notification";
import FormatNumber from "../../../../../components/form/FormatNumber";
import Toolbar from "./ToolbarList"

import { postOutboundDetailPickingRequest } from "../../../../../store/outbound/actions/outboundDetailPicking/post"
import { getInventoryProduct } from "../../../../../store/product/thunk/productinventory/get";

const NewDetail = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData, setError, selected }) => {
    const [portDetail, setPostDetail] = useState({ loading: false, id: null })
    const [listItems, setListItems] = useState({})
    const { id } = useParams();
    const dispatch = useDispatch();
    const [filterSearch, setFilterSearch] = useState(" ");

    const titles = __(`${module}.tableDetailModal`, { returnObjects: true })

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const getAvailableInventory = useSelector(state => state.product.product.inventory);

    const getItemsInventoryData = ({ page, filterSearch }) => {
        const filters = { page, ...(!!filterSearch && { itemid: filterSearch }) }
        dispatch(getInventoryProduct(filters))
    }

    useEffect(() => {
        if (!!filterSearch) {
            getItemsInventoryData({ page: 1, filterSearch })
        }
    }, [dispatch, filterSearch])


    const handleClose = () => {
        onClose();
        setListItems({})
    };

    const onSubmit = (values, item) => {
        const body = {
            outboundid: Number(id),
            outbounddetailid: get(selected, "outbounddetailid"),
            lpn: get(values, "lpn"),
            quantity: Number(get(item, "quantity")),
            destinationlocationid: get(item, "destiny"),

            // ---- complements -----
            language: localStorage.getItem("lang"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
        }
        setPostDetail({ id: get(values, "lpn"), loading: true })
        postOutboundDetailPickingRequest(body, () => getState)
            .then(({ data }) => {
                getItemsInventoryData({ page: 1, filterSearch })
                setPostDetail({ id: null, loading: false })
                setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                getData(get(selected, "outbounddetailid"));
                setListItems({})
            })
            .catch((err) => {
                setError(err); setPostDetail({ id: null, loading: false })
            })
    };

    const headTable = [
        {
            key: "itemId",
            label: get(titles, "[0]"),
            align: "left",
        },
        {
            key: "itemCode",
            label: get(titles, "[1]"),
            align: "left",
        },
        {
            key: "itemName",
            label: get(titles, "[2]"),
            align: "center",
        },
        {
            key: "expiration",
            label: get(titles, "[3]"),
            align: "center",
        },
        {
            key: "estado",
            label: get(titles, "[4]"),
            align: "left",
        },
        {
            key: "lot",
            label: get(titles, "[5]"),
            align: "left",
        },
        {
            key: "quantity",
            label: get(titles, "[6]"),
            align: "left",
            width: 150,
            sx: { minWidth: 150 }
        },
        {
            key: "quantityReserved",
            label: get(titles, "[7]"),
            align: "center",
        },
        {
            key: "quantityTotal",
            label: get(titles, "[8]"),
            align: "center",
        },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const dataTable = map(get(getAvailableInventory, "data", []), (row, i) => {
        const id = row.lpn;
        let flag = true;
        try {
            const validate = [get(listItems, `${id}.quantity`)]
            flag = includes(validate, undefined)
        } catch (error) { }

        return ({
            ...row,
            expiration: get(row, "expirationDate") ? moment(get(row, "expirationDate")).format("L") : "",
            quantity: (
                <TextField
                    name="quantity"
                    placeholder={__(`${module}.inputDetail.quantity.placeholder`)}
                    onChange={(e, v) => setListItems(prevState => {
                        try {
                            let nextState = {
                                ...prevState,
                                [id]: {
                                    ...prevState?.[id],
                                    quantity: get(e.target, "value", undefined) || undefined
                                }
                            };
                            return nextState

                        } catch (error) {
                            return prevState
                        }
                    })}
                    size="small"
                    InputProps={{ inputComponent: FormatNumber }}
                />
            ),
            options: (
                <LoadingButton
                    variant="contained" color="primary" size="small"
                    disabled={flag || !!(portDetail.loading && portDetail.id !== id)}
                    onClick={() => onSubmit(row, listItems[id])}
                    loading={portDetail.id === id ? portDetail.loading : false}
                >
                    {__(`${module}.modalDetail.add`)}
                </LoadingButton>
            ),
        })
    })

    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby={`modal-${isEdit ? "edit" : "new"}-uom-${get(toEdit, "uomId")}`}
                open={open}
                maxWidth={maxWidth}
                fullWidth
                classes={{ paper: '!overflow-visible' }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                    {isEdit
                        ? __(`${module}.modalDetail.title2`)
                        : __(`${module}.modalDetail.title1`)
                    }
                </DialogTitle>
                <Box className='p-4 '>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                        <Typography variant="bodyMedium">{__(`${module}.modalDetail.subTitle1`)}</Typography>
                    </Stack>
                </Box>
                <Divider />
                <Table
                    toolbar={<Toolbar setFilterSearch={setFilterSearch} __={__} module={module} />}
                    headTable={headTable}
                    dataTable={dataTable}
                    __={__}
                    module={module}
                    sizeFilters={125}
                    loading={get(getAvailableInventory, "isLoading", false)}
                    propsPaper={{ elevation: 0 }}
                    propsTable={{ size: "small", stickyHeader: true }}
                    propsContainer={{ sx: { maxHeight: "60vh" } }}
                    empty="items"
                />
                <br />
            </Dialog >
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </>
    )
}

export default NewDetail