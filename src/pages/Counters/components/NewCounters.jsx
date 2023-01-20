/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
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
} from '@mui/material';
import { get } from "lodash";
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { Visibility, VisibilityOff, LockOpen, Lock, Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import validator from "./validator"
import Notification from "../../../components/form/Notification";
import BtnLanguage from "../../../components/form/BtnLanguage";

import { postCountRequest } from "../../../store/counts/actions/postCounts"
import { putCountRequest } from "../../../store/counts/actions/putCounts"

const NewCounters = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData }) => {
    const [showPass, setShowPass] = useState(false);
    const [editPass, setEditPass] = useState(!isEdit);
    const [postCounter, setPostCounter] = useState({ loading: false })
    const [putCounter, setPutCounter] = useState({ loading: false })

    const inputs = __(`${module}.modal.input`, { returnObjects: true })
    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

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
    const onSubmit = (body) => {
        delete body.confirmation
        if (isEdit) {
            setPutCounter({ loading: true })
            body.counterId = get(toEdit, "counterId")
            putCountRequest(body, () => getState)
                .then(({ data }) => {
                    setPutCounter({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch(({ err }) => {
                    setPutCounter({ loading: false })
                    setShowNoti({ open: true, msg: get(err, "message",), variant: "error" })
                })
        } else {
            setPostCounter({ loading: true })
            postCountRequest(body, () => getState)
                .then(({ data }) => {
                    setPostCounter({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch(({ err }) => {
                    console.log(err)
                    setPostCounter({ loading: false })
                    setShowNoti({ open: true, msg: get(err, "message",), variant: "error" })
                })
        }
    };

    const formik = useFormik({
        initialValues: {
            email: get(toEdit, "email", ""),
            username: get(toEdit, "userName", ""),
            // active: get(toEdit, "active", false),
            userpass: get(toEdit, "userPass", ""),
            confirmation: get(toEdit, "userPass", ""),
            language: get(toEdit, "language", "es"),
            // ---- complements -----
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
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
                maxWidth={maxWidth}
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
                                <Stack direction="row" spacing={2}>
                                    <BtnLanguage
                                        active={get(formik, "values.language", "es")}
                                        onClickEs={() => formik.setFieldValue("language", "es")}
                                        onClickEn={() => formik.setFieldValue("language", "en")}
                                    />
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack direction="column" spacing={2} >
                                <Stack direction="row" spacing={2} >
                                    <FormControl fullWidth >
                                        <Typography className='pb-2' component="label" htmlFor="username" >
                                            {get(inputs, "[0].name")}
                                        </Typography>
                                        <TextField
                                            id="email"
                                            name="email"
                                            placeholder={get(inputs, "[0].placeholder")}
                                            value={get(formik, "values.email")}
                                            onChange={get(formik, "handleChange")}
                                            error={get(formik, "touched.email") && Boolean(get(formik, "errors.email"))}
                                            helperText={get(formik, "touched.email") && get(formik, "errors.email")}
                                            disabled={isEdit}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth >
                                        <Typography className='pb-2' component="label" htmlFor="username" >
                                            {get(inputs, "[1].name")}
                                        </Typography>
                                        <TextField
                                            id="username"
                                            name="username"
                                            placeholder={get(inputs, "[1].placeholder")}
                                            value={get(formik, "values.username")}
                                            onChange={get(formik, "handleChange")}
                                            error={get(formik, "touched.username") && Boolean(get(formik, "errors.username"))}
                                            helperText={get(formik, "touched.username") && get(formik, "errors.username")}
                                        />
                                    </FormControl>
                                </Stack>



                                <Stack direction="row" spacing={2} >
                                    <FormControl fullWidth  >
                                        <Typography className='pb-2' component="label" htmlFor="password" >
                                            {get(inputs, "[2].name")}
                                        </Typography>
                                        <TextField
                                            id="userpass"
                                            name="userpass"
                                            placeholder={get(inputs, "[2].placeholder")}
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
                                                    {get(inputs, "[3].name")}
                                                </Typography>
                                                <TextField
                                                    id="confirmation"
                                                    name="confirmation"
                                                    placeholder={get(inputs, "[3].placeholder")}
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
                                loading={get(postCounter, "loading") || get(putCounter, "loading")}
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