/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import {
    Dialog,
    Box,
    Typography,
    IconButton,
    DialogTitle,
    Stack,
    Divider,
    TextField,
    Autocomplete as AutocompleteUi,
} from '@mui/material';
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import Table from "../../../../components/form/Table";
import map from "lodash/map";
import filter from "lodash/filter";
import includes from "lodash/includes";
import toLower from "lodash/toLower";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import Notification from "../../../../components/form/Notification";
import FormatNumber from "../../../../components/form/FormatNumber";
import Toolbar from "./ToolbarList"

import { getInventoryProduct } from "../../../../store/product/thunk/productinventory/get";
import { postTransferDetailRequest } from "../../../../store/transfer/actions/detail/post"

const NewDetail = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData, setError }) => {
    const [portDetail, setPostDetail] = useState({ loading: false, id: null })
    const [listItems, setListItems] = useState({})
    const { id } = useParams();
    const dispatch = useDispatch();
    const [filterSearch, setFilterSearch] = useState("0");
    const [list, setList] = useState([])

    const titles = __(`${module}.tableDetailModal`, { returnObjects: true })

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const locations = useSelector(state => state.warehouse.warehouse.location);
    const getAvailableInventory = useSelector(state => state.product.product.inventory);

    const locationList = map(locations?.data.data, ({ locationId, description }) => ({ value: locationId, label: description }));

    const getItemsInventoryData = () => {
        dispatch(getInventoryProduct({ itemId: '0' }))
    }

    useEffect(() => {
        getItemsInventoryData()
    }, [dispatch])
    
    useEffect(() => {
        setList(get(getAvailableInventory, "data", []))
    }, [get(getAvailableInventory, "data.length", 0), get(getAvailableInventory, "isLoading", false)])

    const filterData = () => {
        const allList = get(getAvailableInventory, "data", []);
        const newList = filter(allList, (itm) => {
            let flag = false;
            for (const key in itm) {
                if (Object.hasOwnProperty.call(itm, key)) {
                    const element = itm[key];
                    if (includes(toLower(element), toLower(filterSearch?.search))) {
                        flag = true;
                    }
                }
            }
            return flag;
        })
        setList(newList)
    }

    useEffect(() => {
        if (!!filterSearch) {
            filterData()
        }
    }, [JSON.stringify(filterSearch)])

    const handleClose = () => {
        onClose();
        setListItems({})
    };

    const onSubmit = (values, item) => {
        const body = {
            transferid: Number(id),
            lpn: get(values, "lpn"),
            quantity: Number(get(item, "quantity")),
            destinationlocationid: get(item, "destiny"),

            // ---- complements -----
            language: localStorage.getItem("lang"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
        }
        setPostDetail({ id: get(values, "lpn"), loading: true })
        postTransferDetailRequest(body, () => getState)
            .then(({ data }) => {
                setPostDetail({ id: null, loading: false })
                setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                getData()
                getItemsInventoryData({ page: 1, filterSearch });
                setListItems({})
            })
            .catch((err) => {
                setError(err); setPostDetail({ id: null, loading: false })
            })
    };

    const headTable = [
        // {
        //     key: "itemId",
        //     label: get(titles, "[0]"),
        //     align: "left",
        // },
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
            key: "destiny",
            label: get(titles, "[5]"),
            align: "left",
            width: 125,
            sx: { minWidth: 125 }
        },
        {
            key: "estado",
            label: get(titles, "[4]"),
            align: "left",
        },
        {
            key: "expiration",
            label: get(titles, "[3]"),
            align: "center",
        },
        {
            key: "lot",
            label: get(titles, "[6]"),
            align: "left",
        },
        {
            key: "quantity",
            label: get(titles, "[7]"),
            align: "left",
            width: 150,
            sx: { minWidth: 150 }
        },
        {
            key: "quantityReserved",
            label: get(titles, "[8]"),
            align: "center",
        },
        {
            key: "quantityTotal",
            label: get(titles, "[9]"),
            align: "center",
        },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const dataTable = map(list, (row, i) => {
        const id = row.lpn;

        let flag = true;
        try {
            const validate = [
                // get(listItems, `${id}.origen`),
                get(listItems, `${id}.destiny`),
                get(listItems, `${id}.quantity`)
            ]
            flag = includes(validate, undefined)
        } catch (error) {

        }

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
            destiny: (
                <AutocompleteUi
                    disablePortal
                    fullWidth
                    includeInputInList
                    options={locationList}
                    onChange={(e, v) => setListItems(prevState => {
                        try {
                            let nextState = {
                                ...prevState,
                                [id]: {
                                    ...prevState?.[id],
                                    destiny: get(v, "value", undefined)
                                }
                            };
                            return nextState
                        } catch (error) {
                            return prevState
                        }
                    })}
                    loading={get(locations, "isLoading")}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                    )}
                />
            ),
            options: (
                <LoadingButton
                    variant="contained" color="primary" size="small"
                    disabled={flag || !!(portDetail.loading && portDetail.id !== id)}
                    onClick={() => onSubmit(row, listItems[id])}
                    loading={portDetail.id === id ? portDetail.loading : false}
                >
                    Agregar
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
                        ? __(`${module}.modal.title2`)
                        : __(`${module}.modal.title1`)
                    }
                </DialogTitle>
                <Box className='p-4 '>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                        <Typography variant="bodyMedium">{__(`${module}.modal.subTitle1`)}</Typography>
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