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
    Switch,
    Hidden,
    ButtonGroup,
    FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import get from "lodash/get";
import map from "lodash/map";
import toString from "lodash/toString";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import moment from "moment";

import Load from "../../../components/form/Load";
import Layout from "../../../components/layout/Layout";
import Location from "./components/Location"

// import Switch from "../../../components/form/Switch";
// import InputText from "../../../components/form/InputText";
import Notification from "../../../components/form/Notification";
import Alert from "../../../components/form/Alert";
// import Skeleton from "../../../components/form/Skeleton"
// import FormatMoney from "../../../components/form/FormatMoney"
import validator from "./validator"
// import AutoComplete from "../../../components/form/AutoComplete";

import { getWarehouseId } from "../../../store/warehouse/thunk/warehouse/getId"
import { postWarehouseRequest } from "../../../store/warehouse/actions/warehouse/post"
import { putWarehouseRequest } from "../../../store/warehouse/actions/warehouse/put"

const NewEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [__] = useTranslation("ware");
    const { id } = useParams();
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error", action: "post" })
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" });
    const [tab, setTab] = useState(0);
    const module = "warehouse"
    const [postWarehouse, setPostWarehouse] = useState({ loading: false })
    const [putWarehouse, setPutWarehouse] = useState({ loading: false })

    // const user = useSelector(state => state.auth.login.dataUser);
    // const put = useSelector(state => state.masters.transport.put);
    // const post = useSelector(state => state.masters.transport.post);
    const current = useSelector(state => state.warehouse.warehouse.detail);
    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const user = {}
    const put = {}
    const post = {}

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

    useEffect(() => {
        if (!!id) {
            dispatch(getWarehouseId({ warehouseid: id }))
        }
    }, [dispatch, id])

    const onSubmit = (values) => {
        const body = {
            description: get(values, "description"),
            language: get(values, "language"),
            userid: get(values, "userid"),
            companyid: get(values, "companyid"),
            active: get(values, "active"),
        }
        if (id) {
            setPutWarehouse({ loading: true })
            body.warehouseid = id
            putWarehouseRequest(body, () => getState)
                .then(({ data }) => {
                    setPutWarehouse({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                    // handleClose()
                    // getData()
                })
                .catch((err) => { setError(err); setPutWarehouse({ loading: false }) })
        } else {
            setPostWarehouse({ loading: true })
            try {

                postWarehouseRequest(body, () => getState)
                    .then(({ data }) => {
                        setPostWarehouse({ loading: false })
                        setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                        navigate(`/warehouse/${data.id}`)
                        // handleClose()
                        // getData()
                    })
                    .catch((err) => { setError(err); setPostWarehouse({ loading: false }) })
            } catch (error) {

                console.log(error)
            }
        }

    }

    const initialValues = {
        active: get(current, "data.active", false),
        description: id ? get(current, "data.description", "") : "",
        createdate: (id ? get(current, "data.createdate", false) : false) ? moment(get(current, "data.createdate")).format("L") : moment().format("L"),
        warehouseid: id,
        // ---- complements -----
        language: localStorage.getItem("lang"),
        userid: get(userState, "userId"),
        companyid: Number(get(userState, "companyId")),
    }

    return (
        <Layout
            propsToolbar={{
                title: !id ? __(`${module}.header.new.title`) : __(`${module}.header.edit.title`),
                srute: !id ? __(`head.new.code`) : id
            }}
        >
            {get(current, "isLoading")
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
                                                <Button className='w-[100px] min-w-[100px]' variant='outlined' color="secondary" onClick={() => navigate("/warehouse")} disabled={get(postWarehouse, "loading") || get(putWarehouse, "loading")} >{__(`${module}.action.cancel`)}</Button>
                                                <LoadingButton className='w-[100px] min-w-[100px]' variant="contained" color="secondary" type="submit" loading={get(postWarehouse, "loading") || get(putWarehouse, "loading")}>{__(`${module}.action.save`)}</LoadingButton>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                        <Box className='p-4' >
                                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                    <FormControl fullWidth >
                                                        <Typography className='pb-2' component="label" htmlFor="warehouseid">
                                                            {__(`${module}.input.warehouseid.label`)}
                                                        </Typography>
                                                        <Typography className='pb-2 text-[#a2a2a2]' component="label" varianty="bodyMedium" >
                                                            {get(formik, "values.warehouseid")}
                                                        </Typography>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                    <FormControl fullWidth >
                                                        <Typography className='pb-2' component="label" htmlFor="active">
                                                            {__(`${module}.input.active.label`)}
                                                        </Typography>
                                                        <div>
                                                            <FormControlLabel
                                                                classes={{ root: "!m-0" }}
                                                                checked={get(formik, "values.active")}
                                                                control={<Switch color="primary" onChange={(e, v) => formik.setFieldValue("active", v)} />}
                                                                label={__(`${module}.status.${get(formik, "values.active")}`)}
                                                                labelPlacement="start"
                                                            />
                                                        </div>
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
                                    <Location warehouseid={id} />
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
        </Layout>
    )
}

export default NewEdit