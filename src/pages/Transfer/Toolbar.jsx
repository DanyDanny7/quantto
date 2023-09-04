import React, { useState } from 'react';
import { Toolbar, Box } from "@mui/material";

import InputSearch from "../../components/form/InputSearch";
import Notification from "../../components/form/Notification";

const ToolbarComponent = ({ setFilterSearch }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Box className='flex items-center' sx={{ flex: '1 1 100%' }} />
            <Box className='flex items-center'>
                <InputSearch onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
            </Box>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar>
    )
}

export default ToolbarComponent