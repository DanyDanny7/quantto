
import React, { useState } from 'react';
import {
    Dialog,
    Box,
    SvgIcon,
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
    InputAdornment
} from '@mui/material';
import { get } from "lodash";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff, LockOpen, Lock, Close } from '@mui/icons-material';


import validator from "./validator"

const NewCounters = ({ open, onClose, isEdit, __, module }) => {
    const [showPass, setShowPass] = useState(false);
    const [editPass, setEditPass] = useState(false)


    const inputs = __(`${module}.modal.input`, { returnObjects: true })
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPass(state => !state)
    }

    const handleClose = () => {
        onClose();
    };

    const onEdit = () => {
        setEditPass(state => !state)
    }

    const onSubmit = () => {
        // onClose(false);
        // dispatch()
    };

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
        validationSchema: validator(inputs, editPass),
        onSubmit: (values) => onSubmit
    });

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="modal-new-inventory"
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
                                    id="password"
                                    name="password"
                                    placeholder={get(inputs, "[1].placeholder")}
                                    type={showPass ? 'text' : 'password'}
                                    value={get(formik, "values.password")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.password") && Boolean(get(formik, "errors.password"))}
                                    helperText={get(formik, "touched.password") && get(formik, "errors.password")}
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
                                    </>
                                }
                            </FormControl>
                        </Stack>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Stack className='w-full' direction="row" spacing={2} justifyContent="space-between">
                    {editPass
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
                        )}

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleClose}
                            sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                        >
                            {__(`${module}.modal.btn.btn-3`)}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        // disabled={!name || (isEmpty(selected) && activeStep === 1)}
                        // sx={{ bgcolor: (theme) => theme.palette.color.neutral[600], color: "common.white", "&:hover": { bgcolor: (theme) => theme.palette.color.neutral[700] } }}
                        >
                            {isEdit
                                ? __(`${module}.modal.btn.btn-2`)
                                : __(`${module}.modal.btn.btn-1`)
                            }
                        </Button>
                    </Stack>
                </Stack>
            </DialogActions>

        </Dialog >
    )
}

export default NewCounters