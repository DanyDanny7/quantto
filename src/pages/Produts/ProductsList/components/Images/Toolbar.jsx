import React, { useState } from 'react';
import { Toolbar, Button, Stack, IconButton } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';

import InputSearch from "../../../../../components/form/InputSearch";
import Notification from "../../../../../components/form/Notification";

const ToolbarComponent = ({ setFilterSearch, __, module, setNew, loading }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction="row" justifyContent="space-between" spacing={2} >
                <div />
                <Stack direction="row" spacing={2}>
                    <LoadingButton className='whitespace-nowrap' color="primary" variant="contained" component="label" onChange={setNew} loading={loading}>{__(`${module}.actions.add`)} <input type="file" hidden /></LoadingButton>
                </Stack>
            </Stack>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar >
    )
}

export default ToolbarComponent