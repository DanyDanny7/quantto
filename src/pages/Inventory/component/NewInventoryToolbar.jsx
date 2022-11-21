import React, { useState } from 'react';
import { get } from "lodash";
import {
    Typography,
    Toolbar,
    Box,
    Autocomplete,
    TextField,
    Button,
    Stack
} from "@mui/material";

import InputSearch from "../../../components/form/InputSearch";

const ToolbarComponent = ({ __, module }) => {

    const [searchValue, setSearchValue] = useState("");


    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        // filter({ search: value, select: selectValue })
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction={"row"} spacing={2}  >
                <InputSearch className="flex-1" value={searchValue} onChange={onSearchChange} color="secondary" size="small" />
                <Button variant="outlined" color="secondary" >
                    {__(`${module}.modal.btn-4`)}
                </Button>
            </Stack>
        </Toolbar>
    )
}

export default ToolbarComponent