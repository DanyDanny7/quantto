/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, isNull, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Divider,
  IconButton,
  Paper,
  Grid,
  Box,
  Typography,
  MenuList,
  MenuItem,
  Popover,
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import CircularProgress from "../../../components/form/CircularProgress";
import Alert from "../../../components/form/Alert";
import AlertQuestion from "../../../components/form/AlertQuestion";
import PieChart from "../component/PieChart";
import BarChart from "../component/BarChart";
import Toolbar from "./Toolbar";
import Notification from "../../../components/form/Notification";
import Paying from "../component/Paying";
import NewInventory from "../component/NewInventory";

import { getInventaryDetail } from "../../../store/inventary/thunk/getInventary/detail/getDetails";
import { putInventaryEndRequest } from "../../../store/inventary/actions/inventary/detail/putInventaryEnd";
import { putInventaryStartRequest } from "../../../store/inventary/actions/inventary/detail/putInventaryStart";
import { deleteInventaryProductRequest } from "../../../store/inventary/actions/inventary/deleteInventaryProduct"

const LoadingData = () => (
  <Box sx={{
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  }}>
    <CircularProgress />
  </Box>
)

const ActiveInventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const params = useParams();
  const [__] = useTranslation("inve");
  const module = "detail"
  const detailId = get(params, "detailId")
  const code = `#${detailId}`

  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState({});
  const open = Boolean(anchorEl);
  const [alertActive, setAlertActive] = useState(false);
  const [filterSearch, setFilterSearch] = useState("")
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "error" })
  const [openPay, setOpenPay] = useState(false)
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false)

  const [alertStart, setAlertStart] = useState({ open: false, title: "", subtitle: "" })
  const [loadStart, setLoadStart] = useState(false)
  const [alertPay, setAlertPay] = useState({ open: false, title: "", subtitle: "" })
  const [alertFinish, setAlertFinish] = useState({ open: false, title: "", subtitle: "" })
  const [loadFinish, setLoadFinish] = useState(false)
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })
  const [edit, setEdit] = useState({ item: {}, value: false });

  const titles = __(`${module}.table`, { returnObjects: true });

  const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);
  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, inventoryid: get(params, "detailId"), ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getInventaryDetail(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])


  // ---------- Table ---------------

  const headTable = [
    {
      key: "itemId",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "itemName",
      label: get(titles, "[1]"),
      align: "left"
    },
    {
      key: "barCode",
      label: get(titles, "[2]"),
      align: "center"
    },
    {
      key: "stock",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "inventory",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "diference",
      label: get(titles, "[5]"),
      align: "center"
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const card1 = {
    "count-name": get(inventaryDetailState, "data.data.name", "- -"),
    "start": isNull(get(inventaryDetailState, "data.data.startDate")) ? "- -" : moment(get(inventaryDetailState, "data.data.startDate")).format("DD/MM/YY - HH:mm A"),
    "end": isNull(get(inventaryDetailState, "data.data.endDate")) ? "- -" : moment(get(inventaryDetailState, "data.data.endDate")).format("DD/MM/YY - HH:mm A"),
    "progress": get(inventaryDetailState, "data.data.percentage", "- -"),
    "units-counted": get(inventaryDetailState, "data.data.itemsQty", "- -"),
    "elapsed-time": get(inventaryDetailState, "data.data.time", "- -"),
  }

  const handleClick = (e) => (event) => {
    setAnchorEl(event.currentTarget);
    setActive(e)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMore = () => {
    navegate(`count/${get(active, "inventoryDetailId")}`)
  }

  const dataTable = map(get(inventaryDetailState, "data.data.countsTemplate", []), (row) => ({
    ...row,
    options: (
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick(row)}
      >
        <MoreVertIcon />
      </IconButton>
    )
  }))

  //  --------- Delete -------------

  const onDeleteConfirm = () => {
    const msg = replace(__(`${module}.actions.delete.question`), "[[number]]", `#${get(active, "itemId")}`)
    setAlertDelete({ open: true, title: __(`${module}.actions.delete.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: get(userState, "language"),
      inventoryid: Number(detailId),
      templatelineid: get(active, "inventoryDetailId")
    }
    setLoadDelete(true)
    deleteInventaryProductRequest(body, () => getState)
      .then(({ data }) => {
        const msg = __(`${module}.actions.delete.success`);
        setShowNoti({ open: true, msg, variant: "success" })
        setActive({})
        getData({ page: 1, filterSearch })
        setLoadDelete(false)
      })
      .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
  }

  const onDelete = () => {
    handleClose()
    onDeleteConfirm()
  }

  // ---------- Actions ---------------

  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }

  const setError = (err) => {
    if (!!get(err, "response.data") && !!get(err, "response.data.Message", "")) {
      setAlert({
        open: true,
        title: get(err, "response.data.Message", ""),
        subtitle: (<ul>{map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
        type: "error",
        btn: __(`${module}.actions.close`),
        func: closeAlert
      })
    } else {
      setShowNoti({ open: true, msg: get(err, "message"), variant: "error" })
    }
  }

  const setSuccess = (success) => {
    setAlert({
      open: true,
      title: get(success, "title", ""),
      subtitle: get(success, "subtitle"),
      type: "success",
      btn: get(success, "btn", ""),
      btn2: get(success, "btn2", ""),
      func: get(success, "func", () => { }),
      func2: get(success, "func2", () => { }),
    })
  }

  const onStart = () => { handleClose(); setAlertStart({ open: true, title: __(`${module}.actions.start.title`), subtitle: replace(__(`${module}.actions.start.question`), "[[number]]", code) }) }
  const onStartCancel = () => setAlertStart({ open: false, title: "", subtitle: "" })
  const onStartSubmit = () => {
    onStartCancel();
    const body = {
      inventoryid: detailId,
      language: get(userState, "language", "es"),
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
    }
    setLoadStart(true)
    putInventaryStartRequest(body, () => getState)
      .then(({ data }) => {
        setLoadStart(false)
        setShowNoti({ open: true, msg: __(`${module}.actions.start.success`), variant: "success" })
        onStartCancel()
        getData({ page: 1, filterSearch })
      })
      .catch((err) => { setError(err); setLoadStart(false) })
  }

  const onFinish = () => { handleClose(); setAlertFinish({ open: true, title: __(`${module}.actions.finish.title`), subtitle: replace(__(`${module}.actions.finish.question`), "[[number]]", code) }) }
  const onFinishCancel = () => setAlertFinish({ open: false, title: "", subtitle: "" })
  const onFinishSubmit = () => {
    onStartCancel();
    const body = {
      inventoryid: detailId,
      language: get(userState, "language", "es"),
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
    }
    setLoadFinish(true)
    putInventaryEndRequest(body, () => getState)
      .then(({ data }) => {
        setShowNoti({ open: true, msg: __(`${module}.actions.finish.success`), variant: "success" })
        setLoadFinish(false)
        onFinishCancel()
        getData({ page: 1, filterSearch })
      })
      .catch((err) => { setError(err); setLoadFinish(false) })
  }

  // const onPay = () => setAlertPay({ open: true, title: __(`${module}.actions.pay.title`), subtitle: replace(__(`${module}.actions.pay.question`), "[[number]]", code) })
  const onPay = () => { handleClose(); onPaySubmit() }
  const onPayCancel = () => setAlertPay({ open: false, title: "", subtitle: "" })
  const onPaySubmit = () => {
    onStartCancel();
    setOpenPay(true)
    onPayCancel()
  }

  const onEdit = () => { handleClose(); setEdit({ item: get(inventaryDetailState, "data.data", {}), value: true }); }

  const getOptions = (status) => {
    const edit = { btnLabel2: __(`${module}.actions.edit.title`), btnFunc2: onEdit, color2: "info" }

    switch (status) {
      case 1: return ({ btnLabel: __(`${module}.actions.pay.title`), btnFunc: onPay, color: "warning", ...edit })
      case 2: return ({ btnLabel: __(`${module}.actions.start.title`), btnFunc: onStart, color: "success", ...edit })
      case 3: return ({ btnLabel: __(`${module}.actions.finish.title`), btnFunc: onFinish, color: "primary", ...edit })
      default: return ({})
    }
  }

  return (
    <Layout
      propsToolbar={{
        title: replace(__(`${module}.header.title-1`), "[[code]]", code),
        label: replace(__(`${module}.header.sub-title-1`), "[[code]]", code),
        ...getOptions(get(inventaryDetailState, "data.data.statusId")),
      }}
      goBack
    >
      <Box className='mb-6'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <Paper elevation={[1]} className='py-8 px-6 overflow-auto h-full'>
              {get(inventaryDetailState, "isLoading", false)
                ? (
                  <LoadingData />
                ) : (
                  <>
                    <Typography className='pb-8' component={Box} variant="heading4">{__(`${module}.cards.card-1.title`)}</Typography>
                    <Box className='mb-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.count-name`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "count-name")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.start`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "start")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.end`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "end")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.progress`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "progress")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.units-counted`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "units-counted")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.elapsed-time`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "elapsed-time")}</Typography>
                    </Box>
                  </>
                )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <Paper elevation={[1]} className='py-8 px-6 h-full'>
              <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-2.title`)}</Typography>
              <Box className='m-auto my-6' maxWidth={250} >
                <PieChart loading={get(inventaryDetailState, "isLoading", false)} values={[get(inventaryDetailState, "data.data.getCountsPieChart.counted", 0), get(inventaryDetailState, "data.data.getCountsPieChart.notCounted", 0)]} />
              </Box>
              <Box className='flex items-center justify-around'>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.skyblue[500]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-2.counted`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.purplelight[300]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-2.not-counted`)}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} xl={5}>
            <Paper elevation={[1]} className='py-8 px-6 h-full'>
              <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-3.title`)}</Typography>
              <Box className='m-auto my-6 px-6' overflow="auto">
                <BarChart loading={get(inventaryDetailState, "isLoading", false)} minWidth={350} countsBarChart={get(inventaryDetailState, "data.data.getCountsBarChart")} />
              </Box>
              <Box className='flex items-center justify-around'>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.greenlight[400]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.on-hand`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.orange[400]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.counted-units`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.pink[300]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.diference`)}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid >
      </Box >

      <Table
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
        headTable={headTable}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(inventaryDetailState, "isLoading", false)}
      />

      {openPay &&
        <Paying
          open={openPay}
          setOpen={setOpenPay}
          __={__}
          module={module}
          inventaryId={detailId}
          setError={setError}
          setSuccess={setSuccess}
          getData={() => getData({ page: 1, filterSearch })}
        />
      }
      {get(edit, "value") &&
        <NewInventory
          __={__}
          open={get(edit, "value")}
          setOpen={() => { }}
          module={module}
          onSubmit={() => { }}
          loading={false}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          edit={edit}
          setEdit={setEdit}
        />
      }

      <Popover
        id={"menu-inventario-activo"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        elevation={[1]}
      >
        <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
          <MenuItem onClick={showMore}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.details`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
        </MenuList>
      </Popover>
      <Alert
        title={__(`${module}.alert.alert-1.title`)}
        subtitle={__(`${module}.alert.alert-1.subtitle`)}
        btn1={{ label: __(`${module}.alert.alert-1.btn-1`), func: () => { navegate("/inventory/active") } }}
        btn2={{ label: __(`${module}.alert.alert-1.btn-2`), func: () => setAlertActive(false) }}
        openAlert={alertActive}
        closeAlert={() => setAlertActive(false)}
      />
      <AlertQuestion
        title={alertStart.title}
        subtitle={alertStart.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onStartCancel }}
        submit={{ label: __(`${module}.actions.start.title`), func: onStartSubmit }}
        openAlert={alertStart.open}
        loading={loadStart}
      />
      <AlertQuestion
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.delete.title`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
      />
      <AlertQuestion
        title={alertPay.title}
        subtitle={alertPay.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onPayCancel }}
        submit={{ label: __(`${module}.actions.pay.title`), func: onPaySubmit }}
        openAlert={alertPay.open}
        loading={false}
      />
      <AlertQuestion
        title={alertFinish.title}
        subtitle={alertFinish.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onFinishCancel }}
        submit={{ label: __(`${module}.actions.finish.title`), func: onFinishSubmit }}
        openAlert={alertFinish.open}
        loading={loadFinish}
      />
      <Alert
        title={get(alert, "title")}
        subtitle={get(alert, "subtitle")}
        btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
        btn2={{ label: get(alert, "btn2", ""), func: get(alert, "func2", () => { }) }}
        type={get(alert, "type")}
        openAlert={get(alert, "open")}
        closeAlert={closeAlert}
      />
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
    </Layout >
  )
}

export default ActiveInventory;