/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Dialog,
    Box,
    Typography,
    Button,
    IconButton,
    DialogTitle,
    DialogActions,
    Stack,
    Divider,
    FormControl,
    TextField,
    Grid,
} from '@mui/material';
import get from "lodash/get";
import map from "lodash/map";
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import validator from "./validator"
import Notification from "../../../../../components/form/Notification";
import FormatNumber from "../../../../../components/form/FormatNumber";
import AutoComplete from "../../../../../components/form/AutoComplete";
import DatePickerUi from "../../../../../components/form/DatePickerUi";

import { postInboundDetailRequest } from "../../../../../store/inbound/actions/inboundDetail/post"
import { putInboundDetailRequest } from "../../../../../store/inbound/actions/inboundDetail/put"

const NewDetail = ({ open, onClose, isEdit, toEdit, __, module, maxWidth = "xl", showNoti, setShowNoti, getData, setError }) => {
    const [postDetail, setPostDetail] = useState({ loading: false })
    const [putDetail, setPutDetail] = useState({ loading: false })
    const { id } = useParams();

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const product = useSelector(state => state.product.product);
    const locations = useSelector(state => state.warehouse.warehouse.location);
    const stateProducts = useSelector(state => state.config.stateProducts);

    const itemList = map(product?.data.data, ({ itemId, itemName }) => ({ value: itemId, label: itemName }));
    const locationList = map(locations?.data.data, ({ locationId, description }) => ({ value: locationId, label: description }));
    const statusList = map(stateProducts?.data, ({ statusid, description }) => ({ value: statusid, label: description }));

    const handleClose = () => {
        formik.resetForm()
        onClose();
    };

    const onSubmit = (values) => {
        const body = {
            inboundid: Number(id),
            itemid: get(values, "itemid"),
            statusid: get(values, "statusid"),
            locationid: get(values, "locationid"),
            quantity: Number(get(values, "quantity")),
            lot: get(values, "lot"),
            expirationdate: get(values, "expirationdate"),
            userid: get(values, "userid"),
            companyid: get(values, "companyid"),
            language: get(values, "language"),
        }
        if (isEdit) {
            setPutDetail({ loading: true })
            body.id = get(toEdit, "inBoundDetail")
            putInboundDetailRequest(body, () => getState)
                .then(({ data }) => {
                    setPutDetail({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPutDetail({ loading: false }) })
        } else {
            setPostDetail({ loading: true })
            postInboundDetailRequest(body, () => getState)
                .then(({ data }) => {
                    setPostDetail({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                    handleClose()
                    getData()
                })
                .catch((err) => { setError(err); setPostDetail({ loading: false }) })
        }
    };

    const formik = useFormik({
        initialValues: {
            itemid: id ? get(toEdit, "itemid", "") : "",
            lot: id ? get(toEdit, "lot", "") : "",
            quantity: id ? get(toEdit, "quantity", "") : "",
            statusid: id ? get(toEdit, "statusid", "") : "",

            expirationdate: null,
            locationid: id ? get(toEdit, "locationid", "") : "",

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
                aria-labelledby={`modal-${isEdit ? "edit" : "new"}-uom-${get(toEdit, "uomId")}`}
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
                        ? __(`${module}.modal.title2`)
                        : __(`${module}.modal.title1`)
                    }
                </DialogTitle>
                <Box className='p-4 '>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                        <Typography variant="bodyMedium">{__(`${module}.modal.subTitle1`)}</Typography>
                    </Stack>
                </Box>
                <Divider />
                <Grid className='p-4' container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="bodyMedium" color="#787676">{__(`${module}.modal.label1`)}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="itemid" >
                                {__(`${module}.inputDetail.itemid.label`)}
                            </Typography>
                            <AutoComplete
                                name={"itemid"}
                                formik={formik}
                                label={__(`form.itemid.label`)}
                                placeholder={__(`form.itemid.placeholder`)}
                                options={itemList}
                                loading={get(product, "isLoading")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="lot" >
                                {__(`${module}.inputDetail.lot.label`)}
                            </Typography>
                            <TextField
                                id="lot"
                                name="lot"
                                placeholder={__(`${module}.inputDetail.lot.placeholder`)}
                                value={get(formik, "values.lot")}
                                onChange={get(formik, "handleChange")}
                                error={get(formik, "touched.lot") && Boolean(get(formik, "errors.lot"))}
                                helperText={get(formik, "touched.lot") && get(formik, "errors.lot")}
                                size="small"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="quantity" >
                                {__(`${module}.inputDetail.quantity.label`)}
                            </Typography>
                            <TextField
                                id="quantity"
                                name="quantity"
                                placeholder={__(`${module}.inputDetail.quantity.placeholder`)}
                                value={get(formik, "values.quantity")}
                                onChange={get(formik, "handleChange")}
                                error={get(formik, "touched.quantity") && Boolean(get(formik, "errors.quantity"))}
                                helperText={get(formik, "touched.quantity") && get(formik, "errors.quantity")}
                                size="small"
                                InputProps={{ inputComponent: FormatNumber }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="statusid" >
                                {__(`${module}.inputDetail.statusid.label`)}
                            </Typography>
                            <AutoComplete
                                name={"statusid"}
                                formik={formik}
                                label={__(`form.statusid.label`)}
                                placeholder={__(`form.statusid.placeholder`)}
                                options={statusList}
                                loading={get(stateProducts, "isLoading")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="bodyMedium" color="#787676">{__(`${module}.modal.label2`)}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="expirationdate" >
                                {__(`${module}.inputDetail.expirationdate.label`)}
                            </Typography>
                            <DatePickerUi
                                id="expirationdate"
                                name="expirationdate"
                                formik={formik}
                                label={__(`form.expirationdate.label`)}
                                placeholder={__(`form.expirationdate.placeholder`)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth >
                            <Typography className='pb-2' component="label" htmlFor="locationid" >
                                {__(`${module}.inputDetail.locationid.label`)}
                            </Typography>
                            <AutoComplete
                                name={"locationid"}
                                formik={formik}
                                label={__(`form.locationid.label`)}
                                placeholder={__(`form.locationid.placeholder`)}
                                options={locationList}
                                loading={get(locations, "isLoading")}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Stack className='w-full' direction="row" spacing={2} justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={handleClose}
                            >
                                {__(`${module}.modal.btn.cancel`)}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                loading={get(postDetail, "loading") || get(putDetail, "loading")}
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

export default NewDetail