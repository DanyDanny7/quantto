/* eslint-disable react-hooks/exhaustive-deps */
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
    Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get, replace } from "lodash";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";

import LayoutAuth from "../../../components/layout/LayoutAuth";
import Notification from "../../../components/form/Notification";
// import validator from "./validator";

// import { login } from "../../../store/actions/auth/loginAction"

const RecoveryPassRequest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.auth.login);
    const [showPass, setShowPass] = useState(false);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" });
    const [timer, setTimer] = useState(null);
    const delayCount = 11;
    const [countTimer, setCountTimer] = useState(delayCount - 1);
    const [forward, setForward] = useState(false);
    const [email, setEmail] = useState(null);

    const [__] = useTranslation("auth");
    const link = __('reset_pass.link', { returnObjects: true })
    const variant = __('reset_pass.variant', { returnObjects: true })

    // const handleClickShowPassword = () => {
    //     setShowPass(state => !state)
    // }

    // useEffect(() => {
    //     if (get(loginState, "isLoged")) {
    //         navigate("/")
    //     } else if (get(loginState, "isReject")) {
    //         setShowNoti({ open: true, msg: "Usuario o contraseña inválida", variant: "error" })
    //     }
    // }, [loginState, navigate])

    const onCountTimer = (count) => {
        if (count > 0) {
            setCountTimer(count - 1)
            setTimer(
                setTimeout(() => {
                    onCountTimer(count - 1)
                }, 1000)
            )
        }
    }

    useEffect(() => {
        onCountTimer(delayCount)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (get(location, "state.email")) {
            setEmail(get(location, "state.email"))
        } else {
            navigate("/login")
        }
    }, [get(location, "state.email")])


    const forwardCode = () => {
        onCountTimer(delayCount);
        setForward(true)
    }


    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => navigate(get(link, "[0].href"))
    });

    return (
        <LayoutAuth title={__('reset_pass.name')} type="recover_pass_request">
            <Box className='flex flex-col justify-center items-center h-full'>
                <Paper className='py-8 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{get(variant, "[0].title")}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>
                        {countTimer > 0
                            ? replace(get(variant, "[0].sub-title-1"), "[[email]]", email)
                            : replace(get(variant, "[1].sub-title-1"), "[[email]]", email)
                        }

                    </Typography></Box>
                    <Box component="form" onSubmit={get(formik, "handleSubmit")}>
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            size='large'
                            loadingPosition="end"
                            loading={get(loginState, "isLoading")}
                        >
                            {__("reset_pass.button.name")}
                        </LoadingButton>

                        <Box className='my-6 text-center flex justify-between items-center' >
                            <Divider className='flex-1' />
                            <Typography className='px-2' variant='bodySmall'>{get(variant, "[0].sub-title-2")}</Typography>
                            <Divider className='flex-1' />
                        </Box>

                        <Box className='text-center flex items-center justify-center h-10'>
                            {countTimer > 0
                                ? <Box >
                                    <Typography variant='bodyMedium' >{get(variant, "[0].sub-title-3")}</Typography>
                                    <Typography variant='bodyMedium' color="secondary">{` ${countTimer} ${get(variant, "[0].und")}`}</Typography>
                                </Box>
                                : <Button color="secondary" onClick={forwardCode}>
                                    <Typography variant='bodyMedium' >{get(variant, "[0].sub-title-4")}</Typography>
                                </Button>
                            }
                        </Box>
                    </Box>
                </Paper>
                <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
            </Box>
        </LayoutAuth>
    )
}

export default RecoveryPassRequest