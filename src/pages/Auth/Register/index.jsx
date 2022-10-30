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

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const [__] = useTranslation("auth");
    const inputs = __('register.input', { returnObjects: true })
    const links = __('register.link', { returnObjects: true })

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    const onSubmit = (values) => {
        console.log(values)
        navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            company: '',
            email: '',
            password: '',
            confirmation: '',
        },
        validationSchema: validator(inputs),
        onSubmit,
    });

    return (
        <LayoutAuth type="register">
            <Box className='flex flex-col justify-center items-center '>
                <Paper className='py-8 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{__("register.title")}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>{__("register.sub-title-1")}</Typography></Box>
                    <Box component="form" onSubmit={get(formik, "handleSubmit")}>

                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="name" >
                                    {get(inputs, "[0].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    placeholder={get(inputs, "[0].placeholder")}
                                    value={get(formik, "values.name")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.name") && Boolean(get(formik, "errors.name"))}
                                    helperText={get(formik, "touched.name") && get(formik, "errors.name")}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="company" >
                                    {get(inputs, "[1].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="company"
                                    name="company"
                                    placeholder={get(inputs, "[1].placeholder")}
                                    value={get(formik, "values.company")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.company") && Boolean(get(formik, "errors.company"))}
                                    helperText={get(formik, "touched.company") && get(formik, "errors.company")}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="email" >
                                    {get(inputs, "[2].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    placeholder={get(inputs, "[2].placeholder")}
                                    value={get(formik, "values.email")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.email") && Boolean(get(formik, "errors.email"))}
                                    helperText={get(formik, "touched.email") && get(formik, "errors.email")}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="password" >
                                    {get(inputs, "[3].name")}
                                </Typography>
                                <TextField
                                    id="password"
                                    name="password"
                                    placeholder={get(inputs, "[3].placeholder")}
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
                                    {get(inputs, "[4].name")}
                                </Typography>
                                <TextField
                                    id="confirmation"
                                    name="confirmation"
                                    placeholder={get(inputs, "[4].placeholder")}
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
                            {__("register.button.name")}
                        </Button>

                        <Box className='my-6 text-center flex justify-between items-center' >
                            <Divider className='flex-1' />
                            <Typography className='px-2' variant='bodySmall'>{__("register.sub-title-2")}</Typography>
                            <Divider className='flex-1' />
                        </Box>

                        <Box className='text-center'>
                            <LinkUi underline="hover" color="secondary">
                                <Link to={get(links, "[0].href")}>
                                    <Typography variant='bodyMedium'>{get(links, "[0].name")}</Typography>
                                </Link>
                            </LinkUi>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </LayoutAuth>
    )
}

export default Register