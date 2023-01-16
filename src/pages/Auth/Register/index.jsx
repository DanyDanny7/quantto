import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Link as LinkUi,
    Divider,
    FormControl,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get, map } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { LoadingButton } from '@mui/lab';

import LayoutAuth from "../../../components/layout/LayoutAuth";
import Notification from "../../../components/form/Notification";
import Alert from "../../../components/form/Alert";
import validator from "./validator"

import { registerRequest } from "../../../store/auth/actions/register"

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loadRegister, setLoadRegister] = useState(false);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

    const registerState = useSelector(state => state.auth.login);
    const getState = useSelector(state => state);
    const module = "register"

    const [__, i18n] = useTranslation("auth");
    const inputs = __(`${module}.input`, { returnObjects: true })
    const links = __(`${module}.link`, { returnObjects: true })

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    useEffect(() => {
        if (get(registerState, "isLoged")) {
            navigate("/")
        }
    }, [registerState, navigate])

    const closeAlert = () => {
        setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
    }

    const goLogin = () => {
        closeAlert()
        navigate("/login")
    }

    const onSubmit = (values) => {
        setLoadRegister(true)
        registerRequest(values, () => getState)
            .then(({ data }) => {
                setAlert({
                    open: true,
                    title: __(`${module}.msg.success.title`),
                    subtitle: __(`${module}.msg.success.subtitle`),
                    type: "success",
                    btn: __(`${module}.button.set-login`),
                    func: goLogin,
                })
                setLoadRegister(false)
            })
            .catch((err) => {
                if (!!get(err, "response.data")) {
                    setAlert({
                        open: true,
                        title: get(err, "response.data.Message", ""),
                        subtitle: (
                            <ul>
                                {map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}
                            </ul>
                        ),
                        type: "error",
                        btn: __(`${module}.button.close`),
                        func: closeAlert
                    })
                } else {
                    setShowNoti({ open: true, msg: get(err, "message",), variant: "error" })
                }
                setLoadRegister(false)
            })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            companyNombre: '',
            email: '',
            pass: '',
            confirmation: '',
            phone: "",
            language: i18n.resolvedLanguage
        },
        validationSchema: validator(inputs),
        onSubmit
    });

    return (
        <LayoutAuth title={__(`${module}.name`)} type="register">
            <Box className='flex-1 flex items-center justify-center'  >
                <Box className='w-1/2'>
                    <Paper className='py-8 px-16 w-full' elevation={3} style={{ minWidth: 433 }} >
                        <Box className='mb-2' ><Typography variant='heading1'>{__(`${module}.title`)}</Typography></Box>
                        <Box className='mb-10' ><Typography variant='bodySmall'>{__(`${module}.sub-title-1`)}</Typography></Box>
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
                                    <Typography className='pb-2' component="label" htmlFor="companyNombre" >
                                        {get(inputs, "[2].name")}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        placeholder={get(inputs, "[2].placeholder")}
                                        value={get(formik, "values.phone")}
                                        onChange={get(formik, "handleChange")}
                                        error={get(formik, "touched.phone") && Boolean(get(formik, "errors.phone"))}
                                        helperText={get(formik, "touched.phone") && get(formik, "errors.phone")}
                                    />
                                </FormControl>
                            </Box>
                            <Box className='mb-8'>
                                <FormControl fullWidth >
                                    <Typography className='pb-2' component="label" htmlFor="email" >
                                        {get(inputs, "[3].name")}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder={get(inputs, "[3].placeholder")}
                                        value={get(formik, "values.email")}
                                        onChange={get(formik, "handleChange")}
                                        error={get(formik, "touched.email") && Boolean(get(formik, "errors.email"))}
                                        helperText={get(formik, "touched.email") && get(formik, "errors.email")}
                                    />
                                </FormControl>
                            </Box>
                            <Box className='mb-8'>
                                <FormControl fullWidth >
                                    <Typography className='pb-2' component="label" htmlFor="pass" >
                                        {get(inputs, "[4].name")}
                                    </Typography>
                                    <TextField
                                        id="pass"
                                        name="pass"
                                        placeholder={get(inputs, "[4].placeholder")}
                                        type={showPass ? 'text' : 'password'}
                                        value={get(formik, "values.pass")}
                                        onChange={get(formik, "handleChange")}
                                        error={get(formik, "touched.pass") && Boolean(get(formik, "errors.pass"))}
                                        helperText={get(formik, "touched.pass") && get(formik, "errors.pass")}
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
                                    <Typography className='pb-2' component="label" htmlFor="confirmation" >
                                        {get(inputs, "[5].name")}
                                    </Typography>
                                    <TextField
                                        id="confirmation"
                                        name="confirmation"
                                        placeholder={get(inputs, "[5].placeholder")}
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

                            <LoadingButton color="primary" variant="contained" fullWidth type="submit" size='large' loading={loadRegister}>
                                {__(`${module}.button.name`)}
                            </LoadingButton>

                            <Box className='my-6 text-center flex justify-between items-center' >
                                <Divider className='flex-1' />
                                <Typography className='px-2' variant='bodySmall'>{__(`${module}.sub-title-2`)}</Typography>
                                <Divider className='flex-1' />
                            </Box>

                            <Box className='text-center'>
                                <LinkUi component={Link} to={get(links, "[0].href")} underline="hover" color="secondary">
                                    <Typography variant='bodyMedium'>{get(links, "[0].name")}</Typography>
                                </LinkUi>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            <Alert
                title={get(alert, "title")}
                subtitle={get(alert, "subtitle")}
                btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
                btn2={{ label: "", func: () => { } }}
                type={get(alert, "type")}
                openAlert={get(alert, "open")}
                closeAlert={get(alert, "func")}
            />
        </LayoutAuth>
    )
}

export default Register