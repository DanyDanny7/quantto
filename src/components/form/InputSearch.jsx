import React from 'react'
import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get } from "lodash";

const InputSearch = ({ seachId, onSubmit, propsContainer = {}, initialValue, ...props }) => {
    const [__] = useTranslation("global");

    const formik = useFormik({
        initialValues: {
            search: initialValue || "",
        },
        onSubmit,
    });

    return (
        <Box id={seachId || "search"} component="form" onSubmit={get(formik, "handleSubmit")} {...propsContainer}>
            <TextField
                label={__('layout.search')}
                id="input-search"
                name="search"
                InputProps={{
                    endAdornment:
                        <IconButton size="small" type="submit">
                            <SearchIcon />
                        </IconButton>
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