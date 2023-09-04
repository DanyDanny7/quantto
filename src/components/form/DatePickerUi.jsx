/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Typography, FormControl, TextField } from '@mui/material';
import get from "lodash/get";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { useEffect } from 'react';

const DatePickerUi = ({ children, formik, name, label, disabled, ...props }) => {
    const [value, setValue] = useState(null)

    const onChange = (e) => {
        try {
            setValue(e)
            formik.setFieldValue([name], moment(e).format())
        } catch (error) {
        }
    }
    useEffect(() => {
        setValue(get(formik, `values.[${name}]`))
    }, [])

    return (
        <DatePicker
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            defaultValue={get(formik, `values.[${name}]`)}
            sx={{ "& .MuiInputBase-root": { height: 40 } }}
            disabled={disabled}
            {...props}
        />
    )
}

export default DatePickerUi