/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Box,
    Typography,
    Button,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Divider,
    FormControl,
    TextField,
    InputAdornment,
    Switch,
} from '@mui/material';
import { get } from "lodash";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff, LockOpen, Lock, Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import validator from "./validator"
import Notification from "../../../components/form/Notification";

import { postCount } from "../../../store/counts/thunk/postCounts"
import { putCount } from "../../../store/counts/thunk/putCounts"

const NewCounters = ({ open, onClose, isEdit, toEdit, __, module }) => {
    const [showPass, setShowPass] = useState(false);
    const [editPass, setEditPass] = useState(!isEdit)
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });

    const inputs = __(`${module}.modal.input`, { returnObjects: true })
    const userState = useSelector(state => state.auth.login.dataUser);
    const postCountState = useSelector(state => state.counts.post);
    const putCountState = useSelector(state => state.counts.put);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    const handleClose = () => {
        formik.resetForm()
        onClose();
    };

    const onEdit = () => {
        setEditPass(state => !state)
    }

    useEffect(() => {
        // post
        if (get(postCountState, "isSuccess")) {
            setShowNoti({ open: true, msg: __(`${module}.msg.success`), variant: "success" })
            handleClose()
        }
        if (get(postCountState, "isReject")) {
            console.log(postCountState)
            setShowNoti({ open: true, msg: get(postCountState, "error.message",), variant: "error" })
        }
    }, [get(postCountState, "isReject"), get(postCountState, "isSuccess")])

    useEffect(() => {
        // put
        if (get(putCountState, "isSuccess")) {
            setShowNoti({ open: true, msg: __(`${module}.msg.success`), variant: "success" })
            handleClose()
        }
        if (get(putCountState, "isReject")) {
            setShowNoti({ open: true, msg: get(putCountState, "error.message",), variant: "error" })
        }
    }, [get(putCountState, "isReject"), get(putCountState, "isSuccess")])

    const onSubmit = (body) => {
        delete body.confirmation
        if (isEdit) {
            dispatch(putCount(body))
        } else {
            dispatch(postCount(body))
        }
    };

    const formik = useFormik({
        initialValues: {
            username: get(toEdit, "userName", ""),
            active: get(toEdit, "active", false),
            userpass: "",
            confirmation: "",

            // ---- complements -----
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
            language: get(userState, "language"),
        },
        validationSchema: validator(inputs, editPass),
        onSubmit: onSubmit
    });

    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby={`modal-${isEdit ? "edit" : "new"}-inventory-${get(toEdit, "counterId")}`}
                open={open}
                maxWidth="xl"
                fullWidth
                component="form"
                onSubmit={get(formik, "handleSubmit")}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                    {isEdit
                        ? __(`${module}.modal.title-2`)
                        : __(`${module}.modal.title-1`)
                    }
                </DialogTitle>
                <DialogContent dividers sx={{ m: 0, p: 0 }}>
                    <Box className='p-4 '>
                        <Stack direction="column" spacing={3} >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                <Typography variant="bodyMedium">{__(`${module}.modal.sub-title-1`)}</Typography>
                                <Switch id="active" name="active" checked={get(formik, "values.active")} onChange={get(formik, "handleChange")} color="success" />
                            </Stack>
                            <Divider />
                            <Stack direction="row" spacing={2} >
                                <FormControl fullWidth >
                                    <Typography className='pb-2' component="label" htmlFor="username" >
                                        {get(inputs, "[0].name")}
                                    </Typography>
                                    <TextField
                                        id="username"
                                        name="username"
                                        placeholder={get(inputs, "[0].placeholder")}
                                        value={get(formik, "values.username")}
                                        onChange={get(formik, "handleChange")}
                                        error={get(formik, "touched.username") && Boolean(get(formik, "errors.username"))}
                                        helperText={get(formik, "touched.username") && get(formik, "errors.username")}
                                    />
                                </FormControl>
                                <FormControl fullWidth  >
                                    <Typography className='pb-2' component="label" htmlFor="password" >
                                        {get(inputs, "[1].name")}
                                    </Typography>
                                    <TextField
                                        id="userpass"
                                        name="userpass"
                                        placeholder={get(inputs, "[1].placeholder")}
                                        type={showPass ? 'text' : 'password'}
                                        value={get(formik, "values.userpass")}
                                        onChange={get(formik, "handleChange")}
                                        error={get(formik, "touched.userpass") && Boolean(get(formik, "errors.userpass"))}
                                        helperText={get(formik, "touched.userpass") && get(formik, "errors.userpass")}
                                        disabled={!editPass}
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end" className='mr-2'>
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleClickShowPassword}
                                                        edge="end"
                                                        disabled={!editPass}
                                                    >
                                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    {editPass &&
                                        <>
                                            <Typography className='pb-2' component="label" htmlFor="password" >
                                                {get(inputs, "[2].name")}
                                            </Typography>
                                            <TextField
                                                id="confirmation"
                                                name="confirmation"
                                                placeholder={get(inputs, "[2].placeholder")}
                                                type={showPass ? 'text' : 'password'}
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
                                        </>
                                    }
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Stack className='w-full' direction="row" spacing={2} justifyContent="space-between">
                        {isEdit
                            ?
                            editPass
                                ? (
                                    <Button
                                        color="secondary"
                                        variant="text"
                                        type="button"
                                        startIcon={<LockOpen />}
                                        onClick={onEdit}
                                    >
                                        {__(`${module}.modal.btn.btn-4`)}
                                    </Button>
                                ) : (
                                    <Button
                                        color="secondary"
                                        variant="text"
                                        type="button"
                                        onClick={onEdit}
                                        startIcon={<Lock />}
                                    >
                                        {__(`${module}.modal.btn.btn-4`)}
                                    </Button>
                                )
                            : <Box />
                        }

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={handleClose}
                                sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                            >
                                {__(`${module}.modal.btn.btn-3`)}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                loading={get(postCountState, "isLoading") || get(putCountState, "isLoading")}
                            >
                                {isEdit
                                    ? __(`${module}.modal.btn.btn-2`)
                                    : __(`${module}.modal.btn.btn-1`)
                                }
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog >
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </>
    )
}

export default NewCounters