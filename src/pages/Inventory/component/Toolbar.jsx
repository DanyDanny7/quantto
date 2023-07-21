import React from 'react';
import { Toolbar, Box } from "@mui/material";

import InputSearch from "../../../components/form/InputSearch";

const ToolbarComponent = ({ setFilterSearch }) => {

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Box className='flex items-center' sx={{ flex: '1 1 100%' }} />
            <InputSearch onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
        </Toolbar>
    )
}

export default ToolbarComponent