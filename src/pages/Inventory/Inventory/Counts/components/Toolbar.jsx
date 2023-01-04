import React, { useState } from 'react';
import { isEmpty } from "lodash";
import {
    Typography,
    Toolbar,
    Box,
    Button
} from "@mui/material";

import InputSearch from "../../../../../components/form/InputSearch";
import Notification from "../../../../../components/form/Notification";

const ToolbarComponent = ({ __, module, setFilterSearch, selected, onReCount }) => {
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Box className='flex items-center' sx={{ flex: '1 1 100%' }} />
            <Box className='flex items-center'>
                {!isEmpty(selected) &&
                    <Button color="secondary" sx={{ mr: 3 }} onClick={() => onReCount(selected)} >
                        <Typography variant="buttonMedium">
                            {__(`${module}.modal.recount.submit`)}
                        </Typography>
                    </Button>
                }
                <InputSearch onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300 }} size="small" />
            </Box>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Toolbar>
    )
}

export default ToolbarComponent