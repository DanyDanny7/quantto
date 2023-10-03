import React, { useState } from 'react';
import { Toolbar, Button, Stack, IconButton } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import InputSearch from "../../../../../components/form/InputSearch";
import Notification from "../../../../../components/form/Notification";

const ToolbarComponent = ({ setFilterSearch, __, module, setNew }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction="row" justifyContent="space-between" spacing={2} >
                <InputSearch seachId="search-outbound" onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
                <Stack direction="row" spacing={2}>
                    <IconButton><FileDownloadIcon color="secondary" /></IconButton>
                    <Button className='whitespace-nowrap' color="primary" variant="contained" onClick={setNew}>{__(`${module}.actions.add`)}</Button>
                </Stack>
            </Stack>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar>
    )
}

export default ToolbarComponent