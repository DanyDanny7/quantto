import React, { useState } from 'react';
import { isEmpty } from "lodash";
import { Toolbar, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import InputSearch from "../../components/form/InputSearch";
import Notification from "../../components/form/Notification";

const ToolbarComponent = ({ selected, onDelete, setFilterSearch }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Box className='flex items-center' sx={{ flex: '1 1 100%' }} />
            <Box className='flex items-center'>
                {!isEmpty(selected) &&
                    <IconButton aria-label="delete" size="small" onClick={() => onDelete(selected, false)} sx={{ mx: 3 }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                }
                <InputSearch onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
            </Box>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar>
    )
}

export default ToolbarComponent