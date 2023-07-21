import React from 'react';
import {
    Toolbar,
    Button,
    Stack,
} from "@mui/material";

import InputSearch from "../../../components/form/InputSearch";

const ToolbarComponent = ({ __, module, newCounter, setFilterSearch }) => {

    const onSubmit = (values) => {
        setFilterSearch(encodeURIComponent(values.search))
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <Stack className='w-full' direction={"row"} spacing={2} justifyContent="space-between"  >
                <InputSearch propsContainer={{ className: "flex-1" }} onSubmit={onSubmit} color="secondary" sx={{ minWidth: 300, width: "100%" }} size="small" />
                <Button variant="outlined" color="secondary" onClick={newCounter} >
                    {__(`${module}.modal.btn-4`)}
                </Button>
            </Stack>
        </Toolbar>
    )
}

export default ToolbarComponent