import React from 'react'
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get } from "lodash";

const InputSearch = ({ onSubmit, propsContainer = {}, ...props }) => {
    const [__] = useTranslation("global");

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit,
    });

    return (
        <Box component="form" onSubmit={get(formik, "handleSubmit")} {...propsContainer}>
            <TextField
                label={__('layout.search')}
                id="input-search"
                name="search"
                InputProps={{
                    endAdornment: <SearchIcon />,
                }}
                value={get(formik, "values.search")}
                onChange={get(formik, "handleChange")}
                error={get(formik, "touched.search") && Boolean(get(formik, "errors.search"))}
                helperText={get(formik, "touched.search") && get(formik, "errors.search")}
                {...props}
            />
        </Box>
    )
}

export default InputSearch