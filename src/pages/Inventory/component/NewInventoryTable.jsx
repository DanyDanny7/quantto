/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Checkbox, Stack, Box, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { get, map, isEmpty, join, filter, find } from "lodash";
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from "react-redux";

import Table from "../../../components/form/Table";
import NewInventoryToolbar from "./NewInventoryToolbar"
import Counters from "./Counters"
import NewCounters from "../../Counters/components/NewCounters";

import { getCounts } from "../../../store/counts/thunk/getCounts"
import { postInventaryCounterRequest } from "../../../store/inventary/actions/inventary/detail/postInventaryCounter"
import { getInventaryDetail } from "../../../store/inventary/thunk/getInventary/detail/getDetails";

const NewInventoryTable = ({ __, module, selected, setSelected, showNoti, setShowNoti, edit, setError }) => {
    const [__2] = useTranslation("count");
    const dispatch = useDispatch();

    const module2 = "counts"
    const [openNew, setOpenNew] = useState(false);
    const [filterSearch, setFilterSearch] = useState("")
    const [loadAddCounter, setLoadAddCounter] = useState(false);

    const countsState = useSelector(state => state.counts);
    const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);
    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const counterAdded = map(get(inventaryDetailState, "data.data.countsUsers", []), (counter) => get(counter, "counterId"))
    const counterAll = get(countsState, "data.data", [])
    const counterFilterd = filter(counterAll, ({ counterId }) => !(find(counterAdded, (id) => id === counterId)))

    const getData = ({ page, filterSearch }) => {
        const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
        dispatch(getCounts(filters))
    }

    useEffect(() => {
        getData({ page: 1, filterSearch })
    }, [dispatch, filterSearch])


    const getInventariDetail = () => {
        const filters = { inventoryid: get(edit, "item.inventoryId") }
        // const filters = { inventoryid: 1 }
        dispatch(getInventaryDetail(filters))
    }

    useEffect(() => {
        getInventariDetail()
    }, [dispatch])

    const closeNewCouter = () => {
        setOpenNew(false)
    }

    const newCounter = () => {
        setOpenNew(true)
    }


    // ---------- Agregar contador ---------------

    const addCounter = () => {
        const body = {
            inventoryid: get(edit, "item.inventoryId"),
            counterid: join(selected, ","),
            userid: get(userState, "userId"),
            companyid: get(userState, "companyId"),
            language: get(userState, "language"),
        }
        setLoadAddCounter(true)
        postInventaryCounterRequest(body, () => getState)
            .then(({ data }) => {
                setSelected([])
                setLoadAddCounter(false)
                getInventariDetail()
            })
            .catch((err) => {
                setShowNoti({ open: true, msg: get(err, "message",), variant: "error" })
                setLoadAddCounter(false)
            })
    }

    // ---------- Table ---------------
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = map(counterFilterd, (n) => n.counterId);
            // const newSelected = map(get(countsState, "data.data"), (n) => n.counterId);
            setSelected(newSelected);
            console.log(newSelected)
            return;
        }
        setSelected([]);
    };

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1
    }

    const handleChecked = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const headTable = [
        {
            key: "checkbox",
            label: (
                <Checkbox
                    color="secondary"
                    indeterminate={selected.length > 0 && selected.length < counterFilterd.length}
                    checked={counterFilterd.length > 0 && selected.length === counterFilterd.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                        'aria-label': 'select all desserts',
                    }}
                />
            ),
            align: "center",
            width: 70,
        },
        {
            key: "userName",
            label: __(`${module}.modal.table-title`),
            align: "left",
        },
    ]



    const dataTable = map(counterFilterd, (row, i) => {
        const isItemSelected = isSelected(get(row, "counterId"));
        const labelId = `enhanced-table-checkbox-${i}`;
        return ({
            id: get(row, "counterId"),
            ...row,
            checkbox: (
                <Checkbox
                    color="secondary"
                    checked={isItemSelected}
                    onChange={(e, v) => handleChecked(e, get(row, "counterId"))}
                    inputProps={{ 'aria-labelledby': labelId, }}
                />
            ),
        })
    })

    return (
        <div>
            <Stack direction="row" spacing={2} >
                {get(edit, "value", false) &&
                    <Box flex={1}>
                        <Typography className='text-center' component={Box} variant="heading3" pb={2} >Contadores</Typography>
                        <Counters inventaryId={get(edit, "item.inventoryId")} getInventariDetail={getInventariDetail} filterSearch={filterSearch} />
                    </Box>
                }
                {get(edit, "value", false) &&
                    <Divider orientation="vertical" flexItem />
                }
                <Box flex={1}>
                    {get(edit, "value", false) &&
                        <Stack direction="row" justifyContent="flex-end" mb={2}>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                onClick={addCounter}
                                disabled={isEmpty(selected)}
                                loading={loadAddCounter}
                            >
                                Agregar contador
                            </LoadingButton>
                        </Stack>
                    }
                    <Table
                        toolbar={<NewInventoryToolbar __={__} module={module} newCounter={newCounter} setFilterSearch={setFilterSearch} />}
                        headTable={headTable}
                        dataTable={dataTable}
                        __={__}
                        module={module}
                        sizeFilters={125}
                        propsTableCell={{ padding: "checkbox" }}
                        loading={get(countsState, "isLoading", false) || get(inventaryDetailState, "isLoading", false)}
                        propsTable={{ stickyHeader: true }}
                        propsContainer={{ sx: { height: 350, overflow: "auto" } }}
                    />
                </Box>
            </Stack>

            {openNew &&
                <NewCounters
                    open={openNew}
                    onClose={closeNewCouter}
                    isEdit={false}
                    toEdit={{}}
                    __={__2}
                    module={module2}
                    maxWidth="lg"
                    showNoti={showNoti}
                    setShowNoti={setShowNoti}
                    getData={() => getData({ page: 1, filterSearch })}
                    setError={setError}

                />
            }

        </div>
    )
}

export default NewInventoryTable