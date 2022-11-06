import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Typography,
    Box,
    Autocomplete,
    TextField
} from "@mui/material"
import { get, map } from "lodash";

import InputSearch from "./InputSearch";


const TableComponent = ({ headTable, dataTale, __, module, filter, sizeFilters }) => {
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

    console.log(selectFilter)

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
        <Paper>
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
                                sx={{ width: sizeFilters, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
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
                                sx={{ width: sizeFilters, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
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
                                sx={{ width: sizeFilters, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
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
                                sx={{ width: sizeFilters, "& fieldset": { border: "0px !important" }, "& div, & button": { color: "secondary.main", } }}
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
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {map(headTable, ({ key, label, align }) => (
                                <TableCell key={key} align={align} >
                                    <Typography variant="buttonSmall">{label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTale.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    "&:nth-of-type(odd)": { bgcolor: "background.base" }
                                }}
                            >
                                {headTable.map(({ key, align }) => (
                                    <TableCell align={align} >
                                        <Typography variant="bodySmall">{get(row, `${[key]}`)}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );
}
export default TableComponent
