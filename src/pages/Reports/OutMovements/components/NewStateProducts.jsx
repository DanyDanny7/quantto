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
    Grid,
    Switch,
    FormControlLabel
} from '@mui/material';
import { get } from "lodash";
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import validator from "./validator"
import Notification from "../../../../components/form/Notification";

import { postStateProductsRequest } from "../../../../store/config/actions/stateProducts/post";
import { putStateProductsRequest } from "../../../../store/config/actions/stateProducts/put";

const NewStateProducts = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData, setError }) => {
    const [postStateProducts, setPostStateProducts] = useState({ loading: false })
    const [putStateProducts, setPutStateProducts] = useState({ loading: false })

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const handleClose = () => {
        formik.resetForm()
        onClose();
    };

    const onSubmit = (body) => {
        if (isEdit) {
            setPutStateProducts({ loading: true })
            body.statusid = get(toEdit, "statusid")
            putStateProductsRequest(body, () => getState)
                .then(({ data }) => {
                    setPutStateProducts({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPutStateProducts({ loading: false }) })
        } else {
            setPostStateProducts({ loading: true })
            postStateProductsRequest(body, () => getState)
                .then(({ data }) => {
                    setPostStateProducts({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPostStateProducts({ loading: false }) })
        }
    };

    const formik = useFormik({
        initialValues: {
            active: get(toEdit, "active", false),
            description: get(toEdit, "description", ""),
            // ---- complements -----
            language: localStorage.getItem("lang"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
        },
        validationSchema: validator(__, module),
        onSubmit: onSubmit
    });

    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby={`modal-${isEdit ? "edit" : "new"}-stateProducts-${get(toEdit, "statusid")}`}
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
                        ? __(`${module}.modal.title2`)
                        : __(`${module}.modal.title1`)
                    }
                </DialogTitle>
                <DialogContent dividers sx={{ m: 0, p: 0 }}>
                    <Box className='p-4 '>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" >
                            <Typography variant="bodyMedium">{__(`${module}.modal.subTitle1`)}</Typography>
                            <FormControlLabel
                                checked={get(formik, "values.active")}
                                control={<Switch color="primary" onChange={(e, v) => formik.setFieldValue("active", v)} />}
                                label={__(`${module}.input.status.label`)}
                                labelPlacement="start"
                            />
                        </Stack>
                    </Box>
                    <Divider />
                    <Grid className='p-4' container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <Typography className='pb-2' component="label" htmlFor="description" >
                                    {__(`${module}.input.description.label`)}
                                </Typography>
                                <TextField
                                    id="description"
                                    name="description"
                                    placeholder={__(`${module}.input.description.placeholder`)}
                                    value={get(formik, "values.description")}
                                    onChange={get(formik, "handleChange")}
                                    error={get(formik, "touched.description") && Boolean(get(formik, "errors.description"))}
                                    helperText={get(formik, "touched.description") && get(formik, "errors.description")}
                                    size="small"
                                    multiline
                                    rows={3}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack className='w-full' direction="row" spacing={2} justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={handleClose}
                                sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                            >
                                {__(`${module}.modal.btn.cancel`)}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                loading={get(postStateProducts, "loading") || get(putStateProducts, "loading")}
                            >
                                {__(`${module}.modal.btn.save`)}
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog >
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </>
    )
}

export default NewStateProducts