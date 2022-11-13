import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Divider,
    IconButton,
    Typography,
    MenuList,
    MenuItem,
    Popover,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Box,
    Autocomplete,
    TextField
} from "@mui/material";

import InputSearch from "../../../components/form/InputSearch";

const ToolbarComponent = ({ __, module }) => {


    const selects = __(`${module}.filters.selects`, { returnObjects: true });
    let filter1 = get(selects, "[0]")
    let filter2 = get(selects, "[1]")
    let filter3 = get(selects, "[2]")
    let filter4 = get(selects, "[3]")

    const [searchValue, setSearchValue] = useState("");
    const [selectFilter, setSelectFilter] = useState({
        filter1: get(filter1, "options[0]"),
        filter2: get(filter2, "options[0]"),
        filter3: get(filter3, "options[0]"),
        filter4: get(filter4, "options[0]"),
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
                            sx={{ width: 125, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
                            value={get(selectFilter, "filter1")}
                            onChange={(e, v) => onSelectChange(v, "filter1")}
                            size="small"
                            disableClearable
                            // disableCloseOnSelect={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                }
                {get(filter2, "title") &&
                    <Box className='mr-4 flex items-center'>
                        <Typography variant="bodyMedium" component="div" color="text.main">
                            {get(filter2, "title")}
                        </Typography>
                        <Autocomplete
                            id="select-filter"
                            options={get(filter2, "options", [])}
                            sx={{ width: 125, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
                            value={get(selectFilter, "filter2")}
                            onChange={(e, v) => onSelectChange(v, "filter2")}
                            size="small"
                            disableClearable
                            // disableCloseOnSelect={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                }
                {get(filter3, "title") &&
                    <Box className='mr-4 flex items-center'>
                        <Typography variant="bodyMedium" component="div" color="text.main">
                            {get(filter3, "title")}
                        </Typography>
                        <Autocomplete
                            id="select-filter"
                            options={get(filter3, "options", [])}
                            sx={{ width: 125, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
                            value={get(selectFilter, "filter3")}
                            onChange={(e, v) => onSelectChange(v, "filter3")}
                            size="small"
                            disableClearable
                            // disableCloseOnSelect={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                }
                {get(filter4, "title") &&
                    <Box className='mr-4 flex items-center'>
                        <Typography variant="bodyMedium" component="div" color="text.main">
                            {get(filter4, "title")}
                        </Typography>
                        <Autocomplete
                            id="select-filter"
                            options={get(filter4, "options", [])}
                            sx={{ width: 125, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
                            value={get(selectFilter, "filter4")}
                            onChange={(e, v) => onSelectChange(v, "filter4")}
                            size="small"
                            disableClearable
                            // disableCloseOnSelect={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                }
            </Box>
            <InputSearch value={searchValue} onChange={onSearchChange} color="secondary" sx={{ minWidth: 200 }} size="small" />
        </Toolbar>
    )
}

export default ToolbarComponent