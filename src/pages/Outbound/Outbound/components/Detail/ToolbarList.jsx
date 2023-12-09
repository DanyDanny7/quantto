import React from 'react';
import { Toolbar } from "@mui/material";

import InputSearch from "../../../../../components/form/InputSearch";

const ToolbarComponent = ({ setFilterSearch }) => {

    const onSubmit = (values) => {
        setFilterSearch(values)
    }

    return (
        <Toolbar className='p-2' sx={{ borderBottomWidth: "1px", borderBottomColor: "text.sslite", borderBottomStyle: "solid" }}>
            <div className='w-full grid sm:grid-cols-2 md:grid-cols-4 gap-3' >
                <InputSearch seachId="search-s-outbound" onSubmit={onSubmit} color="secondary" initialValue={""} className="!max-w-[300px]" size="small" />
            </div>
        </Toolbar>
    )
}

export default ToolbarComponent