import React from 'react';
import { Toolbar, Stack } from "@mui/material";

import InputSearch from "../../../../../components/form/InputSearch";

const ToolbarComponent = ({ setFilterSearch, initialValue }) => {

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction="row" justifyContent="space-between" spacing={2} >
                <div></div>
                <InputSearch seachId="search-s-outbound" onSubmit={onSubmit} color="secondary" initialValue={initialValue} sx={{ minWidth: 300 }} size="small" />
            </Stack>
        </Toolbar>
    )
}

export default ToolbarComponent