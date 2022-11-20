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
import { useDispatch, useSelector } from "react-redux";

import LayoutAuth from "../../../components/layout/LayoutAuth";
import validator from "./validator"

import { register } from "../../../store/auth/thunk/register"


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);

    const [__] = useTranslation("auth");
    const inputs = __('register.input', { returnObjects: true })
    const links = __('register.link', { returnObjects: true })

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    // const onSubmit = (values) => {
    //     console.log(values)
    //     navigate("/")
    // }

    const formik = useFormik({
        initialValues: {
            username: '',
            companyNombre: '',
            email: '',
            pass: '',
            confirmation: '',



            // "username": "string",
            // "pass": "string",
            // "email": "string",
            // "phone": "string",
            // "token": "string",
            // "companyNombre": "string"
        },
        validationSchema: validator(inputs),
        onSubmit: (values) => dispatch(register(values))
    });

    return (
        <LayoutAuth title={__('register.name')} type="register">
            <Box className='flex flex-col justify-center items-center '>
                <Paper className='py-8 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{__("register.title")}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>{__("register.sub-title-1")}</Typography></Box>
                    <Box component="form" onSubmit={get(formik, "handleSubmit")}>

                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="username" >
                                    {get(inputs, "[0].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="username"
                                    placeholder={get(inputs, "[0].placeholder")}
                                    value={get(formik, "values.username")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.username") && Boolean(get(formik, "errors.username"))}
                                    helperText={get(formik, "touched.username") && get(formik, "errors.username")}
                                />
                            </FormControl>
                        </Box>
                        <Box className='mb-8'>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="companyNombre" >
                                    {get(inputs, "[1].name")}
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="companyNombre"
                                    name="companyNombre"
                                    placeholder={get(inputs, "[1].placeholder")}
                                    value={get(formik, "values.companyNombre")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.companyNombre") && Boolean(get(formik, "errors.companyNombre"))}
                                    helperText={get(formik, "touched.companyNombre") && get(formik, "errors.companyNombre")}
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
                                                    ariaLabel="toggle password visibility"
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
                                                    ariaLabel="toggle password visibility"
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