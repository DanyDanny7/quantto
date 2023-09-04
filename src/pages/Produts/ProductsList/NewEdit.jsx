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
    ButtonGroup
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";

import Layout from "../../../components/layout/Layout";
import Inventary from "./components/Inventary"
import Images from "./components/Images"
import Uom from "./components/Uom"

import AutoComplete from "../../../components/form/AutoComplete";
import Notification from "../../../components/form/Notification";
import FormatMoney from "../../../components/form/FormatMoney";
import FormatNumber from "../../../components/form/FormatNumber";
import Load from "../../../components/form/Load";
import Alert from "../../../components/form/Alert";
import validator from "./validator"

// import { getListProductId } from "../../../store/product/thunk/productlist/getId"
import { getListProductIdRequest } from "../../../store/product/actions/productlist/getId"
import { postListProductRequest } from "../../../store/product/actions/productlist/post"
import { putListProductRequest } from "../../../store/product/actions/productlist/put"
import { getCategory } from "../../../store/config/thunk/category/get"
import { getSubCategory } from "../../../store/config/thunk/subCategory/get"

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const NewEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [__] = useTranslation("prod");
    const { id } = useParams();
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error", action: "post" })
    const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" });
    const [tab, setTab] = useState(0);
    const module = "list"
    const [postLoad, setPostLoad] = useState({ loading: false });
    const [putLoad, setPutLoad] = useState({ loading: false });
    // const [current, setCurrent] = useState({ success: false, data: {} })
    const [loadSuccess, setLoadSuccess] = useState(false);
    const [loadDetail, setLoadDetail] = useState(false);
    const [current, setCurrent] = useState({})
    const [btnFunc, setBtnFunc] = useState(null);

    // const current = useSelector(state => state.product.product.detail);

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);
    const category = useSelector(state => state.config.category);
    const subCategory = useSelector(state => state.config.subCategory);
    const categories = map(category?.data, ({ categoryId, description }) => ({ value: categoryId, label: description }));
    const subCategories = map(subCategory?.data, ({ subCategoryId, description }) => ({ value: subCategoryId, label: description }));

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

    const getDataCategory = () => {
        dispatch(getCategory({}))
    }
    const getDataSubCategory = () => {
        dispatch(getSubCategory({}))
    }
    const getProduct = () => {
        setLoadDetail(true)
        getListProductIdRequest({ itemid: id }, () => getState)
            .then(({ data }) => {
                setCurrent(data)
                setLoadSuccess(true)
                setLoadDetail(false)
            })
    }
    useEffect(() => {
        if (!!id) {
            getProduct(false)
        }
        getDataCategory()
        getDataSubCategory()
    }, [dispatch, id])

    useEffect(() => {
        console.log(get(current, "isSuccess"))
        if (id && get(current, "isSuccess")) {

            setLoadSuccess(true);
        }
    }, [get(current, "isSuccess"), id])


    const onSubmit = (values) => {
        const body = {
            itemCode: get(values, "itemCode"),
            itemName: get(values, "itemName"),
            active: get(values, "active"),
            categoryId: get(values, "category"),
            subCategoryId: get(values, "subCategory"),
            cost: Number(get(values, "cost")),
            reorderPoint: Number(get(values, "reorderPoint")),
            // ---- complements -----
            language: get(values, "language"),
            userid: get(values, "userid"),
            companyid: get(values, "companyid"),
        }

        if (id) {
            setPutLoad({ loading: true })
            body.itemId = id
            putListProductRequest(body, () => getState)
                .then(({ data }) => {
                    setPutLoad({ loading: false })
                    setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
                })
                .catch((err) => { setError(err); setPutLoad({ loading: false }) })
        } else {
            setPostLoad({ loading: true })
            try {

                postListProductRequest(body, () => getState)
                    .then(({ data }) => {
                        setPostLoad({ loading: false })
                        setShowNoti({ open: true, msg: __(`${module}.msg.create`), variant: "success" })
                        navigate(`/product/${data.id}`)
                    })
                    .catch((err) => { setError(err); setPostLoad({ loading: false }) })
            } catch (error) {

                console.log(error)
            }
        }
    }

    const initialValues = {
        active: id ? get(current, "data.active", "") : false,
        itemCode: id ? get(current, "data.itemCode", "") : "",
        cost: id ? get(current, "data.cost", "") : "",
        reorderPoint: id ? get(current, "data.reorderPoint", "") : "",
        itemName: id ? get(current, "data.itemName", "") : "",
        category: id ? get(current, "data.categoryId", "") : "",
        subCategory: id ? get(current, "data.subCategoryId", "") : "",
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
                                                <Button className='w-[100px] min-w-[100px]' variant='outlined' color="secondary" onClick={() => navigate("/product")} disabled={get(postLoad, "loading") || get(putLoad, "loading")} >{__(`${module}.action.cancel`)}</Button>
                                                <LoadingButton className='w-[100px] min-w-[100px]' variant="contained" color="secondary" type="submit" loading={get(postLoad, "loading") || get(putLoad, "loading")}>{__(`${module}.action.save`)}</LoadingButton>
                                            </Stack>
                                        </Stack>
                                        <Divider />
                                        <Box className='p-4' >
                                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                                <Grid item xs={12} md={5}>
                                                    <Grid container spacing={{ xs: 2, md: 3 }}>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth >
                                                                <Typography className='pb-2' component="label" htmlFor="itemCode" >
                                                                    {__(`${module}.input.itemCode.label`)}
                                                                </Typography>
                                                                <TextField
                                                                    id="itemCode"
                                                                    name="itemCode"
                                                                    placeholder={__(`${module}.input.itemCode.placeholder`)}
                                                                    value={get(formik, "values.itemCode")}
                                                                    onChange={get(formik, "handleChange")}
                                                                    error={get(formik, "touched.itemCode") && Boolean(get(formik, "errors.itemCode"))}
                                                                    helperText={get(formik, "touched.itemCode") && get(formik, "errors.itemCode")}
                                                                    size="small"
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} ></Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth >
                                                                <Typography className='pb-2' component="label" htmlFor="cost" >
                                                                    {__(`${module}.input.cost.label`)}
                                                                </Typography>
                                                                <TextField
                                                                    id="cost"
                                                                    name="cost"
                                                                    placeholder={__(`${module}.input.cost.placeholder`)}
                                                                    value={get(formik, "values.cost")}
                                                                    onChange={get(formik, "handleChange")}
                                                                    error={get(formik, "touched.cost") && Boolean(get(formik, "errors.cost"))}
                                                                    helperText={get(formik, "touched.cost") && get(formik, "errors.cost")}
                                                                    size="small"
                                                                    InputProps={{ inputComponent: FormatMoney }}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} >
                                                            <FormControl fullWidth >
                                                                <Typography className='mt-4 md:mt-6 pb-2' component="label" htmlFor="reorderPoint" >
                                                                    {__(`${module}.input.reorderPoint.label`)}
                                                                </Typography>
                                                                <TextField
                                                                    id="reorderPoint"
                                                                    name="reorderPoint"
                                                                    placeholder={__(`${module}.input.reorderPoint.placeholder`)}
                                                                    value={get(formik, "values.reorderPoint")}
                                                                    onChange={get(formik, "handleChange")}
                                                                    error={get(formik, "touched.reorderPoint") && Boolean(get(formik, "errors.reorderPoint"))}
                                                                    helperText={get(formik, "touched.reorderPoint") && get(formik, "errors.reorderPoint")}
                                                                    size="small"
                                                                    InputProps={{ inputComponent: FormatNumber }}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth >
                                                                <Typography className='pb-2' component="label" htmlFor="itemName" >
                                                                    {__(`${module}.input.itemName.label`)}
                                                                </Typography>
                                                                <TextField
                                                                    id="itemName"
                                                                    name="itemName"
                                                                    placeholder={__(`${module}.input.itemName.placeholder`)}
                                                                    value={get(formik, "values.itemName")}
                                                                    onChange={get(formik, "handleChange")}
                                                                    error={get(formik, "touched.itemName") && Boolean(get(formik, "errors.itemName"))}
                                                                    helperText={get(formik, "touched.itemName") && get(formik, "errors.itemName")}
                                                                    size="small"
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Hidden mdDown>
                                                    <Divider className='pl-8' orientation="vertical" flexItem />
                                                </Hidden>
                                                <Grid item xs={12} md={6}>
                                                    <Grid container spacing={{ xs: 2, md: 3 }}>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth >
                                                                <Typography className='pb-2' component="label" htmlFor="status" >
                                                                    {__(`${module}.input.status.label`)}
                                                                </Typography>
                                                                <Switch name="active" checked={get(formik, "values.active")} onChange={(e, v) => formik?.setFieldValue("active", v)} />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControl fullWidth >
                                                                <Typography className='pb-2' component="label" htmlFor="category" >
                                                                    {__(`${module}.input.category.label`)}
                                                                </Typography>
                                                                <AutoComplete
                                                                    name={"category"}
                                                                    formik={formik}
                                                                    label={__(`form.category.label`)}
                                                                    placeholder={__(`form.category.placeholder`)}
                                                                    disabled={get(current, "isLoading", false) || get(putLoad, "loading", false) || get(postLoad, "loading", false)}
                                                                    options={categories}
                                                                    loading={get(category, "isLoading")}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <FormControl fullWidth >
                                                                <Typography className='mt-4 md:mt-6 pb-2' component="label" htmlFor="subCategory" >
                                                                    {__(`${module}.input.subCategory.label`)}
                                                                </Typography>
                                                                <AutoComplete
                                                                    name={"subCategory"}
                                                                    formik={formik}
                                                                    label={__(`form.subCategory.label`)}
                                                                    placeholder={__(`form.subCategory.placeholder`)}
                                                                    disabled={get(current, "isLoading", false) || get(putLoad, "loading", false) || get(postLoad, "loading", false)}
                                                                    options={subCategories}
                                                                    loading={get(subCategory, "isLoading")}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </form>
                            )}
                        </Formik>
                        {id &&
                            <Paper id="details" className='mt-8' >
                                <div className='p-4 overflow-auto'>
                                    <Stack direction="row" justifyContent="space-between">
                                        <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group" disableElevation>
                                            <Button className='whitespace-nowrap' variant={tab === 0 ? "contained" : "outlined"} onClick={() => setTab(0)}>Inventario</Button>
                                            <Button className='whitespace-nowrap' variant={tab === 1 ? "contained" : "outlined"} onClick={() => setTab(1)}>Unidad de medida</Button>
                                            <Button className='whitespace-nowrap' variant={tab === 2 ? "contained" : "outlined"} onClick={() => setTab(2)}>Imagenes</Button>
                                        </ButtonGroup>
                                        {btnFunc}
                                    </Stack>
                                </div>
                                <Divider />
                                <div>
                                    <CustomTabPanel value={tab} index={0}>
                                        <Inventary
                                            getData={getProduct}
                                            setBtnFunc={setBtnFunc}
                                        />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={tab} index={1}>
                                        <Uom
                                            list={get(current, "data.uom", [])}
                                            loading={loadDetail}
                                            getData={getProduct}
                                            setBtnFunc={setBtnFunc}
                                        />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={tab} index={2}>
                                        <Images
                                            list={get(current, "data.images", [])}
                                            loading={loadDetail}
                                            getData={getProduct}
                                            setBtnFunc={setBtnFunc}
                                        />
                                    </CustomTabPanel>
                                </div>
                            </Paper>
                        }
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

