/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Stack,
    Paper,
    Typography,
    Divider,
    Grid,
    Box,
    FormControl,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

import Layout from "../../../components/layout/Layout";
import Detail from "./components/Detail"

import Notification from "../../../components/form/Notification";
import Alert from "../../../components/form/Alert";
import validator from "./validator"
import AutoComplete from "../../../components/form/AutoComplete";
import Load from "../../../components/form/Load";
import AlertDelete from "../../../components/form/AlertQuestion";

import { getOutboundIdRequest, } from "../../../store/outbound/actions/outbound/getId"
import { postOutboundRequest } from "../../../store/outbound/actions/outbound/post"
import { putOutboundRequest } from "../../../store/outbound/actions/outbound/put"
import { getOutBoundType } from "../../../store/config/thunk/outBoundType/get"
import { putCloseOutboundRequest } from "../../../store/outbound/actions/outbound/putClose"

const NewEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [__] = useTranslation("outb");
    const { id } = useParams();
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error", action: "post" })
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" });
    const module = "outbound"
    const [postOutbound, setPostOutbound] = useState({ loading: false })
    const [putOutbound, setPutOutbound] = useState({ loading: false })
    const [current, setCurrent] = useState({})
    const [loadSuccess, setLoadSuccess] = useState(false);
    const [loadDetail, setLoadDetail] = useState(false);
    const [loadClose, setLoadClose] = useState(false);
    const [closeDoc, setCloseDoc] = useState({ open: false, title: "", subtitle: "" })

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const type = useSelector(state => state.config.outBoundType);

    const typeList = map(type?.data, ({ type, description }) => ({ value: type, label: description }));

    const closeAlert = () => {
        setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
    }

    const setError = (err, action) => {
        if (!isEmpty(err) && !!get(err, "Message", "")) {
            setAlert({
                open: true,
                title: get(err, "Message", ""),
                subtitle: (<ul>{map(get(err, "ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
                type: "error",
                btn: __(`${module}.actions.close`),
                func: closeAlert
            })
        } else {
            setAlert({
                open: true,
                type: "default",
                btn: __(`${module}.actions.close`),
                func: closeAlert
            })
        }
    }

    const getType = () => {
        dispatch(getOutBoundType({}))
    }

    const getOutbound = () => {
        setLoadDetail(true)
        getOutboundIdRequest({ outboundid: id }, () => getState)
            .then(({ data }) => {
                setCurrent(data)
                setLoadSuccess(true)
                setLoadDetail(false)
            })
    }

    useEffect(() => {
        if (!!id) {
            getOutbound()
        }
        getType()
    }, [dispatch, id])

    const onSubmit = (values) => {
        const body = {
            description: get(values, "description"),
            language: get(values, "language"),
            userid: get(values, "userid"),
            companyid: get(values, "companyid"),
            type: get(values, "type"),
        }
        if (id) {
            setPutOutbound({ loading: true })
            body.outboundid = id
            putOutboundRequest(body, () => getState)
                .then(({ data }) => {
                    setPutOutbound({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                })
                .catch((err) => { setError(err); setPutOutbound({ loading: false }) })
        } else {
            setPostOutbound({ loading: true })
            try {

                postOutboundRequest(body, () => getState)
                    .then(({ data }) => {
                        setPostOutbound({ loading: false })
                        setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                        navigate(`/outbound/${data.id}`)
                    })
                    .catch((err) => { setError(err); setPostOutbound({ loading: false }) })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const closeDocElement = () => {
        const body = {
            outboundid: id,
            language: localStorage.getItem("lang"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
        }
        setLoadClose(true)
        putCloseOutboundRequest(body, () => getState)
            .then(({ data }) => {
                setLoadSuccess(false)
                setLoadClose(false)
                setShowNoti({ open: true, msg: __(`${module}.actions.close.success`), variant: "success" })
                getOutbound()
                closeDocCancel()
            })
            .catch((err) => { setError(err); setLoadClose(false) })
    }

    const closeDocConfirm = () => {
        const msg = __(`${module}.actions.close.question`)
        setCloseDoc({ open: true, title: __(`${module}.actions.close.title`), subtitle: msg })
    }

    const closeDocCancel = () => {
        setCloseDoc({ open: false, title: "", subtitle: "" })
    }

    const initialValues = {
        description: id ? get(current, "data.description", "") : "",
        createdate: (id ? get(current, "data.createdate", false) : false) ? moment(get(current, "data.createdate")).format("L") : moment().format("L"),
        inventorydate: (id ? get(current, "data.inventorydate", false) : "- -") ? moment(get(current, "data.inventorydate")).format("L") : moment().format("L"),
        outBound: id,
        status: id ? get(current, "data.status", "- -") : "- -",
        type: id ? get(current, "data.typeid", "") : "",

        // ---- complements -----
        language: localStorage.getItem("lang"),
        userid: get(userState, "userId"),
        companyid: Number(get(userState, "companyId")),
    }

    return (
        <Layout
            propsToolbar={{
                title: !id ? __(`${module}.header.new.title`) : __(`${module}.header.edit.title`),
                srute: !id ? __(`head.new.code`) : id,
                ...(get(current, "data.status") !== "CLOSE") && !!id && {
                    btnLabel: __(`${module}.actions.close.title`),
                    btnFunc: closeDocConfirm,
                    color: "error",
                    loading: loadClose,
                    disabled: loadDetail || putOutbound.loading
                }
            }}
        >
            {!loadSuccess && id
                ? (
                    <Paper>
                        <Load height={400} />
                    </Paper>
                ) : (
                    <div>
                        <Formik initialValues={initialValues} validationSchema={validator(__, module)} onSubmit={onSubmit}>
                            {formik => (
                                <form onSubmit={get(formik, "handleSubmit")}>
                                    <Paper className=''>
                                        <Stack className='p-4' direction="row" spacing={2} justifyContent="space-between">
                                            <Typography component="h6" variant="h6">{__(`${module}.labels.1`)}</Typography>
                                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                                <Button className='w-[100px] min-w-[100px]' variant='outlined' color="secondary" onClick={() => navigate("/outbound")} disabled={get(postOutbound, "loading") || get(putOutbound, "loading")} >{__(`${module}.action.cancel`)}</Button>
                                                <LoadingButton className='w-[100px] min-w-[100px]' variant="contained" color="secondary" type="submit" loading={get(postOutbound, "loading") || get(putOutbound, "loading")}>{__(`${module}.action.save`)}</LoadingButton>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                        <Box className='p-4' >
                                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                    <FormControl fullWidth >
                                                        <Typography className='pb-2' component="label" htmlFor="outBound">
                                                            {__(`${module}.input.outBound.label`)}
                                                        </Typography>
                                                        <Typography className='pb-2 text-[#a2a2a2]' component="label" varianty="bodyMedium" >
                                                            {get(formik, "values.outBound")}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                                    <FormControl fullWidth >
                                                        <Typography className='mt-4 md:mt-6 pb-2' component="label" htmlFor="createdate" >
                                                            {__(`${module}.input.createdate.label`)}
                                                        </Typography>
                                                        <Typography className='pb-2 text-[#a2a2a2]' component="label" varianty="bodyMedium" >
                                                            {get(formik, "values.createdate")}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                                    <FormControl fullWidth >
                                                        <Typography className='mt-4 md:mt-6 pb-2' component="label" htmlFor="inventorydate" >
                                                            {__(`${module}.input.inventorydate.label`)}
                                                        </Typography>
                                                        <Typography className='pb-2 text-[#a2a2a2]' component="label" varianty="bodyMedium" >
                                                            {get(formik, "values.inventorydate")}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                                    <FormControl fullWidth >
                                                        <Typography className='mt-4 md:mt-6 pb-2' component="label" htmlFor="status" >
                                                            {__(`${module}.input.status.label`)}
                                                        </Typography>
                                                        <Typography className='pb-2 text-[#a2a2a2]' component="label" varianty="bodyMedium" >
                                                            {get(formik, "values.status")}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4} lg={8}>
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
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <FormControl fullWidth >
                                                        <Typography className='pb-2' component="label" htmlFor="type" >
                                                            {__(`${module}.input.type.label`)}
                                                        </Typography>
                                                        <AutoComplete
                                                            name={"type"}
                                                            formik={formik}
                                                            label={__(`form.type.label`)}
                                                            placeholder={__(`form.type.placeholder`)}
                                                            disabled={get(current, "isLoading", false) || get(putOutbound, "loading", false) || get(postOutbound, "loading", false)}
                                                            options={typeList}
                                                            loading={get(type, "isLoading")}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </form>
                            )}
                        </Formik>
                        <Paper id="details" className='mt-8' >
                            {id &&
                                <div>
                                    <Detail
                                        id={id}
                                        list={get(current, "data.detail", [])}
                                        loading={loadDetail}
                                        getData={getOutbound}
                                    />
                                </div>
                            }
                        </Paper>
                    </div>
                )}
            <Notification __={__} showNoti={showNoti} setShowNoti={setShowNoti} />
            <Alert
                title={get(alert, "title")}
                subtitle={get(alert, "subtitle")}
                btn1={{ func: get(alert, "func") }}
                btn2={{}}
                type={get(alert, "type")}
                openAlert={get(alert, "open")}
                closeAlert={closeAlert}
            />
            <AlertDelete
                title={closeDoc.title}
                subtitle={closeDoc.subtitle}
                cancel={{ label: __(`${module}.actions.cancel`), func: closeDocCancel }}
                submit={{ label: __(`${module}.actions.accept`), func: closeDocElement }}
                openAlert={closeDoc.open}
                loading={loadClose}
            />
        </Layout>
    )
}

export default NewEdit