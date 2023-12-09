import React, { useEffect } from 'react';
import {
    Autocomplete as AutocompleteUi,
    TextField,
} from '@mui/material'
import get from "lodash/get"
import find from "lodash/find"

const Autocomplete = ({
    formik,
    name,
    label,
    disabled,
    labelInput = null,
    fullWidth = true,
    loading,
    inputProps = {},
    options = [],
    ...props
}) => {

    const onChange = (e, v) => {
        formik?.setFieldValue(name, get(v, "value"))
    }

    useEffect(() => {}, [formik.values[name]])

    return (

        <AutocompleteUi
            id={name}
            name={name}
            disablePortal
            fullWidth
            includeInputInList
            disabled={disabled}
            onChange={onChange}
            getOptionLabel={({ label }) => label}
            options={options}
            value={find(options, ({ value }) => value === get(formik, `values.${name}`)) || null}
            loading={loading}
            {...props}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name={name}
                    variant="outlined"
                    helperText={get(formik, `touched.${name}`) && get(formik, `errors.${name}`)}
                    error={Boolean(get(formik, `touched.${name}`) && get(formik, `errors.${name}`))}
                    {...inputProps}
                />
            )}
        />
    );
}

export default Autocomplete;
