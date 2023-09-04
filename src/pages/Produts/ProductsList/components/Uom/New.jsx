/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import get from "lodash/get";
import map from "lodash/map";
import find from "lodash/find";
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import validator from "./validator"
import Notification from "../../../../../components/form/Notification";
import FormatNumber from "../../../../../components/form/FormatNumber";
import AutoComplete from "../../../../../components/form/AutoComplete";

import { postUomProductRequest } from "../../../../../store/product/actions/productuom/post";
import { putUomProductRequest } from "../../../../../store/product/actions/productuom/put";

const NewLocation = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData, setError }) => {
    const [postLoad, setPostLoad] = useState({ loading: false })
    const [putLoad, setPutLoad] = useState({ loading: false })
    const { id } = useParams();

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const uom = useSelector(state => state.config.uom);

    const uoms = map(uom?.data, ({ id, description }) => ({ value: id, label: description }));

    const handleClose = () => {
        formik.resetForm()
        onClose();
    };

    const onSubmit = (values) => {
        const body = {
            itemId: Number(id),
            active: get(values, "active", false),
            factor: get(values, "factor", ""),
            barcode: get(values, "barcode", ""),
            uomId: get(values, "uomId", ""),
            // ---- complements -----
            companyid: get(values, "companyid"),
            language: get(values, "language"),
            userid: get(values, "userid"),
        }
        if (isEdit) {
            setPutLoad({ loading: true })
            body.id = get(toEdit, "itemsuomid")
            putUomProductRequest(body, () => getState)
                .then(({ data }) => {
                    setPutLoad({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPutLoad({ loading: false }) })
        } else {
            setPostLoad({ loading: true })
            postUomProductRequest(body, () => getState)
                .then(({ data }) => {
                    setPostLoad({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPostLoad({ loading: false }) })
        }
    };

    const formik = useFormik({
        initialValues: {
            active: get(toEdit, "active", false),
            factor: get(toEdit, "factor", ""),
            barcode: get(toEdit, "barcode", ""),
            uomId: get(toEdit, "uomId", ""),

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
                aria-labelledby={`modal-${isEdit ? "edit" : "new"}-uom-${get(toEdit, "id")}`}
                open={open}
                maxWidth={maxWidth}
                fullWidth
                component="form"
                onSubmit={get(formik, "handleSubmit")}
                classes={{ paper: '!overflow-visible' }}
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
                        ? __(`${module}.modal.uom.title2`)
                        : __(`${module}.modal.uom.title1`)
                    }
                </DialogTitle>
                <Box className='p-4 '>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                        <Typography variant="bodyMedium">{__(`${module}.modal.uom.subTitle1`)}</Typography>
                        <FormControlLabel
                            checked={get(formik, "values.active")}
                            control={<Switch color="primary" onChange={(e, v) => formik.setFieldValue("active", v)} />}
                            label={__(`${module}.inputUom.status.label`)}
                            labelPlacement="start"
                        />
                    </Stack>
                </Box>
                <Divider />
                <Grid className='p-4' container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="uomId" >
                                {__(`${module}.inputUom.uomId.label`)}
                            </Typography>
                            <AutoComplete
                                name={"uomId"}
                                formik={formik}
                                label={__(`inputUom.uomId.label`)}
                                placeholder={__(`inputUom.uomId.placeholder`)}
                                disabled={get(postLoad, "loading") || get(putLoad, "loading")}
                                options={uoms}
                                loading={get(uom, "isLoading")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="factor" >
                                {__(`${module}.inputUom.factor.label`)}
                            </Typography>
                            <TextField
                                id="factor"
                                name="factor"
                                placeholder={__(`${module}.inputUom.factor.placeholder`)}
                                value={get(formik, "values.factor")}
                                onChange={get(formik, "handleChange")}
                                error={get(formik, "touched.factor") && Boolean(get(formik, "errors.factor"))}
                                helperText={get(formik, "touched.factor") && get(formik, "errors.factor")}
                                size="small"
                                InputProps={{ inputComponent: FormatNumber }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="barcode" >
                                {__(`${module}.inputUom.barcode.label`)}
                            </Typography>
                            <TextField
                                id="barcode"
                                name="barcode"
                                placeholder={__(`${module}.inputUom.barcode.placeholder`)}
                                value={get(formik, "values.barcode")}
                                onChange={get(formik, "handleChange")}
                                error={get(formik, "touched.barcode") && Boolean(get(formik, "errors.barcode"))}
                                helperText={get(formik, "touched.barcode") && get(formik, "errors.barcode")}
                                size="small"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                <DialogActions>
                    <Stack className='w-full' direction="row" spacing={2} justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClose}
                            >
                                {__(`${module}.modal.btn.cancel`)}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                loading={get(postLoad, "loading") || get(putLoad, "loading")}
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

export default NewLocation