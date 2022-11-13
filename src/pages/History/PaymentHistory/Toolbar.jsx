import React, { useState } from 'react';
import { get, isEmpty, replace } from "lodash";
import {
    Typography,
    Toolbar,
    Box,
    Autocomplete,
    TextField,
} from "@mui/material";

import InputSearch from "../../../components/form/InputSearch";
import Notification from "../../../components/form/Notification";

const ToolbarComponent = ({ __, module }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const selects = __(`${module}.filters.selects`, { returnObjects: true });
    let filter1 = get(selects, "[0]")

    const [searchValue, setSearchValue] = useState("");
    const [selectFilter, setSelectFilter] = useState({
        filter1: get(filter1, "options[0]"),
    })

    const onSelectChange = async (newValue, name) => {
        setSelectFilter((state) => ({ ...state, [name]: newValue }));
        // filter({ search: searchValue, select: newValue })
    }

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        // filter({ search: value, select: selectValue })
    }


    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Box className='flex items-center' sx={{ flex: '1 1 100%' }}>
                {get(filter1, "title") &&
                    <Box className='mr-4 flex items-center'>
                        <Typography variant="bodyMedium" component="div" color="text.main">
                            {get(filter1, "title")}
                        </Typography>
                        <Autocomplete
                            id="select-filter"
                            options={get(filter1, "options", [])}
                            sx={{ width: 175, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
                            value={get(selectFilter, "filter1")}
                            onChange={(e, v) => onSelectChange(v, "filter1")}
                            size="small"
                            disableClearable
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                }
            </Box>
            <Box className='flex items-center'>
                <InputSearch value={searchValue} onChange={onSearchChange} color="secondary" sx={{ minWidth: 250 }} size="small" />
            </Box>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar>
    )
}

export default ToolbarComponent