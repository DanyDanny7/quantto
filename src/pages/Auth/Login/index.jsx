import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Link as LinkUi,
    Divider,
    FormControl,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LayoutAuth from "../../../components/layout/LayoutAuth";
import validator from "./validator"

const Login = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)

    const [__] = useTranslation("auth");
    const inputs = __('login.input', { returnObjects: true })
    const links = __('login.link', { returnObjects: true })

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    const onSubmit = (values) => {
        console.log(values)
        navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validator(inputs),
        onSubmit,
    });

    return (
        <LayoutAuth type="login">
            <Box className='flex flex-col justify-center items-center h-full'>
                <Paper className='py-8 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{__("login.title")}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>{__("login.sub-title-1")}</Typography></Box>
                    <Box component="form" onSubmit={get(formik, "handleSubmit")}>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="email" >
                                    {get(inputs, "[0].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    placeholder={get(inputs, "[0].placeholder")}
                                    value={get(formik, "values.email")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.email") && Boolean(get(formik, "errors.email"))}
                                    helperText={get(formik, "touched.email") && get(formik, "errors.email")}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-4'>
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
                            <LinkUi underline="always" color="text.main">
                                <Link to={get(links, "[0].href")}>
                                    <Typography variant='bodySmall' >{get(links, "[0].name")}</Typography>
                                </Link>
                            </LinkUi>
                        </Box>

                        <Button color="primary" variant="contained" fullWidth type="submit" size='large'>
                            {__("login.button.name")}
                        </Button>

                        <Box className='my-6 text-center flex justify-between items-center' >
                            <Divider className='flex-1' />
                            <Typography className='px-2' variant='bodySmall'>{__("login.sub-title-2")}</Typography>
                            <Divider className='flex-1' />
                        </Box>

                        <Box className='text-center'>
                            <LinkUi underline="hover" color="secondary">
                                <Link to={get(links, "[1].href")}>
                                    <Typography variant='bodyMedium'>{get(links, "[1].name")}</Typography>
                                </Link>
                            </LinkUi>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </LayoutAuth>
    )
}

export default Login