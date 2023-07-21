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
    Paper,
    Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";

import LayoutAuth from "../../../components/layout/LayoutAuth";
import Notification from "../../../components/form/Notification";
import BtnLanguage from "../../../components/form/BtnLanguage";
import validator from "./validator";

import { login } from "../../../store/auth/thunk/login";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.auth.login);
    const [showPass, setShowPass] = useState(false);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })

    const [__, i18n] = useTranslation("auth");
    const inputs = __('login.input', { returnObjects: true })
    const links = __('login.link', { returnObjects: true })

    const onHeadBtn = (lang) => {
        let selectLanguage = lang;
        i18n.changeLanguage(selectLanguage);
        localStorage.setItem("lang", selectLanguage)
    }

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    useEffect(() => {
        if (get(loginState, "isLoged")) {
            navigate("/")
        } else if (get(loginState, "isReject")) {
            const msg = `${get(loginState, "allResp", "")}`
            setShowNoti({ open: true, msg, variant: "error" })
        } else {
            setShowNoti({ open: false, msg: undefined, variant: "" })
        }
    }, [loginState, navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validator(inputs),
        onSubmit: (values) => dispatch(login({ ...values, language: i18n.resolvedLanguage }))
    });

    return (
        <LayoutAuth title={__('login.name')} type="login">
            <Box className='flex flex-col justify-center items-center h-full'>
                <Paper className='py-8 px-16 w-1/2 relative' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{__("login.title")}</Typography></Box>
                    <Box className='mb-4' ><Typography variant='bodySmall'>{__("login.sub-title-1")}</Typography></Box>
                    <Stack direction="row" justifyContent="flex-end">
                        <BtnLanguage active={i18n.resolvedLanguage} onClickEn={onHeadBtn} onClickEs={onHeadBtn} />
                    </Stack>
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
                                    size='small'
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
                                    size='small'
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
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            size='large'
                            loadingPosition="end"
                            loading={get(loginState, "isLoading")}
                        >
                            {__("login.button.name")}
                        </LoadingButton>

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
                <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            </Box>
        </LayoutAuth>
    )
}

export default Login