import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LayoutAuth from "../../../components/layout/LayoutAuth";
import validator from "./validator"

const RecoveryPassReceive = () => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const [__] = useTranslation("auth");
    const inputs = __('reset_pass.input', { returnObjects: true })
    const variant = __('reset_pass.variant', { returnObjects: true })

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    const onSubmit = (values) => {
        navigate("/login")
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmation: '',
        },
        validationSchema: validator(inputs),
        onSubmit,
    });

    return (
        <LayoutAuth title={__('reset_pass.name')} type="recover_pass_receive">
            <Box className='flex flex-col justify-center items-center h-full'>
                <Paper className='pt-8 pb-12 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{get(variant, "[2].title")}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>{get(variant, "[2].sub-title-1")}</Typography></Box>
                    <Box component="form" onSubmit={get(formik, "handleSubmit")}>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="password" >
                                    {get(inputs, "[1].name")}
                                </Typography>
                                <TextField
                                    id="password"
                                    name="password"
                                    placeholder={get(inputs, "[1].placeholder")}
                                    type={showPass ? 'text' : 'password'}
                                    value={get(formik, "values.password")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.password") && Boolean(get(formik, "errors.password"))}
                                    helperText={get(formik, "touched.password") && get(formik, "errors.password")}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end" className='mr-2'>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="password" >
                                    {get(inputs, "[2].name")}
                                </Typography>
                                <TextField
                                    id="confirmation"
                                    name="confirmation"
                                    placeholder={get(inputs, "[2].placeholder")}
                                    type={showPass ? 'text' : 'confirmation'}
                                    value={get(formik, "values.confirmation")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.confirmation") && Boolean(get(formik, "errors.confirmation"))}
                                    helperText={get(formik, "touched.confirmation") && get(formik, "errors.confirmation")}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end" className='mr-2'>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Button color="primary" variant="contained" fullWidth type="submit" size='large'>
                            {__("reset_pass.button.reset-pass")}
                        </Button>

                    </Box>
                </Paper>
            </Box>
        </LayoutAuth>
    )
}

export default RecoveryPassReceive