import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Link as LinkUi,
    // Divider,
    FormControl,
    // InputAdornment,
    // IconButton,
    Paper,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get, replace } from "lodash";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import LayoutAuth from "../../../components/layout/LayoutAuth";
import Notification from "../../../components/form/Notification";
import validator from "./validator";

// import { login } from "../../../store/actions/auth/loginAction"

const ForgotPass = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const loginReducer = useSelector(state => state.todos.loginReducer);
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" });
    const [type, setType] = useState(0);
    const [rejectEmail, setRejectEmail] = useState();

    const [__] = useTranslation("auth");
    const inputs = __('forgot_pass.input', { returnObjects: true });
    const links = __('forgot_pass.link', { returnObjects: true });
    const variant = __('forgot_pass.variant', { returnObjects: true });


    // useEffect(() => {
    // if (get(loginReducer, "isLoged")) {
    //     navigate("/")
    // } else if (get(loginReducer, "isReject")) {
    //     setShowNoti({ open: true, msg: "Usuario o contraseña inválida", variant: "error" })
    // }
    // }, [loginReducer, navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validator(inputs),
        onSubmit: ({ email }) => {
            if (email === "raul@lebbel.io") {
                navigate("/recovery-pass-request", { state: { email } })
            } else {
                setType(1)
                setRejectEmail(email);
                formik.setFieldError("email", "Correo invalido, inténtalo nuevamente")
                // dispatch(login(values))
            }
        }
    });

    return (
        <LayoutAuth title={__('forgot_pass.name')} type={!!type ? "forgot_pass_reject" : "forgot_pass"}>
            <Box className='flex flex-col justify-center items-center h-full'>
                <Paper className='py-8 px-16 w-1/2' elevation={3} style={{ minWidth: 433 }} >
                    <Box className='mb-2' ><Typography variant='heading1'>{get(variant, `[${type}].title`)}</Typography></Box>
                    <Box className='mb-10' ><Typography variant='bodySmall'>{replace(get(variant, `[${type}].sub-title-1`), "[[email]]", rejectEmail)}</Typography></Box>
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


                        <LoadingButton
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            size='large'
                            loadingPosition="end"
                        // loading={get(loginReducer, "isLoading")}
                        >
                            {__("forgot_pass.button.name")}
                        </LoadingButton>


                        <Box className='text-center mt-8'>
                            <LinkUi underline="hover" color="secondary">
                                <Link to={get(links, "[0].href")}>
                                    <Typography variant='bodyMedium'>{get(links, "[0].name")}</Typography>
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

export default ForgotPass