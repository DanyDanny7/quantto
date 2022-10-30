import React from 'react'
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

const InputSearch = (props) => {
    const [__] = useTranslation("global");

    return (
        <TextField
            label={__('layout.search')}
            id="input-search"
            InputProps={{
                endAdornment: <SearchIcon />,
            }}
            {...props}
        />
    )
}

export default InputSearch