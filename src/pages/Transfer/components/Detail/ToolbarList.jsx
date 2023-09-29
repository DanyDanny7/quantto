import React from 'react';
import { Toolbar, Stack } from "@mui/material";

import InputSearch from "../../../../components/form/InputSearch";

const ToolbarComponent = ({ setFilterSearch }) => {

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction="row" justifyContent="space-between" spacing={2} >
                <InputSearch onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
            </Stack>
        </Toolbar>
    )
}

export default ToolbarComponent