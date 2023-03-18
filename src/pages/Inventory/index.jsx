/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, join, toString, find, split, last, trim, replace, isNull } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover,
  Pagination,
  Stack,
  Chip,
  Link,
  Button,
  Box,
  Fade,
  CircularProgress,
  Collapse,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./component/Toolbar"
import NewInventory from "./component/NewInventory";
import EditInventory from "./component/EditInventory";
import NewInventaryAlert from "./component/NewInventaryAlert";
import NewInventaryAlertNoTemplate from "./component/NewInventaryAlertNoTemplate";
import AlertDelete from "../../components/form/AlertQuestion";
import Alert from "../../components/form/Alert";
import AlertQuestion from "../../components/form/AlertQuestion";
import Paying from "./component/Paying";

import { getInventary } from "../../store/inventary/thunk/getInventary";
import { postInventaryRequest } from "../../store/inventary/actions/inventary/postInventary"
import { deleteInventaryRequest } from "../../store/inventary/actions/inventary/deleteInventary"
import { putInventaryEndRequest } from "../../store/inventary/actions/inventary/detail/putInventaryEnd";
import { putInventaryStartRequest } from "../../store/inventary/actions/inventary/detail/putInventaryStart";

const ActiveInventory = () => {
  const navegate = useNavigate();
  const dispatch = useDispatch();

  const [__] = useTranslation("inve");
  const module = "inventaries"

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState({});
  const [showNoti, setShowNoti] = useState({ open: false, variant: "", msg: "" })
  const open = Boolean(anchorEl);
  const [openNew, setOpenNew] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertTemplate, setOpenAlertTemplate] = useState(false);
  const [filterSearch, setFilterSearch] = useState("")
  const [postLoading, setPostLoading] = useState(false);
  const [edit, setEdit] = useState({ item: {}, value: false });
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [valuesTemp, setValuesTemp] = useState({})
  const [loadToPay, setLoadToPay] = useState(false)

  const [alertStart, setAlertStart] = useState({ open: false, title: "", subtitle: "" })
  const [loadStart, setLoadStart] = useState(false)
  const [alertPay, setAlertPay] = useState({ open: false, title: "", subtitle: "" })
  const [alertFinish, setAlertFinish] = useState({ open: false, title: "", subtitle: "" })
  const [loadFinish, setLoadFinish] = useState(false)
  const [loadReport, setLoadReport] = useState(false)
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })
  const [openPay, setOpenPay] = useState(false)

  const titles = __(`${module}.table`, { returnObjects: true });
  const status = __(`${module}.status`, { returnObjects: true });

  const inventaryState = useSelector(state => state.inventary.inventary);
  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getInventary(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])

  const handleClick = (item) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelected(item)
  };

  const closePoop = () => {
    setAnchorEl(null);
  };

  const onSuccess = () => {
    const msg = __(`${module}.modal.update-csv`);
    setShowNoti({ open: true, msg, variant: "success" })
    getData({ page: 1, filterSearch })
  }

  const onSubmit = async (values, noTemplate) => {
    const body = {
      userid: get(userState, "userId"),
      companyid: get(userState, "companyId"),
      language: localStorage.getItem("lang"),
      inventoryname: trim(get(values, "name")),
      counters: join(get(values, "counters"), ","),
      template: get(values, "file")
    }

    if (isNull(get(body, "template")) && !noTemplate) {
      setValuesTemp(values)
      setOpenAlertTemplate(true)
    } else {
      setOpenAlertTemplate(false)
      const formData = new FormData();
      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          if (!!body[key]) {
            formData.append(`${key}`, body[key])
          }
        }
      }
      setPostLoading(true)
      postInventaryRequest(formData, () => getState)
        .then(({ data }) => {
          setSelected({ inventoryId: get(data, "id") })
          getData({ page: 1, filterSearch })
          values.handleClose()
          setPostLoading(false)
          setOpenAlert(true)
        })
        .catch((err) => { setError(err); setPostLoading(false) })
    }
  }

  const alertNoTempalteCancel = () => {
    setValuesTemp({})
    setOpenAlertTemplate(false)
  }

  const onActivePay = () => {
    setOpenAlert(false)
    onPay()
  }

  const onChangePagination = (e, page) => {
    getData({ page: 1, filterSearch })
  }

  //  --------- Delete -------------
  const onDeleteConfirm = () => {
    const msg = replace(__(`${module}.actions.delete.question`), "[[number]]", `#${get(selected, "inventoryId")}`)
    setAlertDelete({ open: true, title: __(`${module}.actions.delete.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      inventoryid: get(selected, "inventoryId")
    }
    setLoadDelete(true)
    deleteInventaryRequest(body, () => getState)
      .then(({ data }) => {
        const msg = __(`${module}.actions.delete.success`);
        setShowNoti({ open: true, msg, variant: "success" })
        setSelected([])
        getData({ page: 1, filterSearch })
        setLoadDelete(false)
      })
      .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
  }

  // ---------- Table ---------------
  const headTable = [
    {
      key: "inventoryId",
      label: get(titles, "[0]"),
      align: "center",
    },
    {
      key: "name",
      label: get(titles, "[1]"),
      align: "left",
    },
    {
      key: "create_at",
      label: get(titles, "[2]"),
      align: "center",
      width: 200,
    },
    {
      key: "status",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "file",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "theoretical",
      label: get(titles, "[5]"),
      align: "center"
    },
    {
      key: "physical",
      label: get(titles, "[6]"),
      align: "center"
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const dataTable = map(get(inventaryState, "data.data.data", []), (row) => {
    const s = find(status, { statusId: get(row, "statusId") });
    return ({
      ...row,
      name: (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
          <Box>{get(row, "name")}</Box>
          <Collapse in={get(row, "free", false)} orientation="horizontal"><Tooltip title={__(`${module}.modal.alert.title-free`)} placement="top" arrow><CreditScoreIcon sx={{ width: 15 }} color="info" /></Tooltip></Collapse>
        </ Stack>
      ),

      create_at: moment(row.date).format("DD/MM/YYYY"),
      status: <Chip label={<Typography variant="bodyXtraSmall">{get(s, "description")}</Typography>} color={get(s, "color")} />,
      file: <Link color="secondary" href={get(row, "templateUrl")} download>{last(split(get(row, "templateUrl"), "/"))}</Link>,
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
    })
  })

  // ---------- Actions ---------------

  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }

  const setError = (err, type) => {
    if (!!get(err, "response.data") && (get(err, "response.status") !== 500)) {
      if (type === "pay") {
        setAlert({
          open: true,
          title: `Error #${get(err, "response.data.returnCode", "")}`,
          subtitle: get(err, "response.data.message", ""),
          type: "error",
          btn: __(`${module}.actions.close`),
          func: closeAlert
        })
      } else {
        setAlert({
          open: true,
          title: get(err, "response.data.Message", ""),
          subtitle: (<ul>{map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
          type: "error",
          btn: __(`${module}.actions.close`),
          func: closeAlert
        })
      }
    } else {
      setShowNoti({ open: true, msg: get(err, "message"), variant: "error" })
    }
  }

  const setSuccess = (success, id) => {
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

  const onStart = () => { closePoop(); setAlertStart({ open: true, title: __(`${module}.actions.start.title`), subtitle: replace(replace(__(`${module}.actions.start.question`), "[[number]]", `#${get(selected, "inventoryId")}`), "[[name]]", get(selected, "name")) }) }
  const onStartCancel = () => setAlertStart({ open: false, title: "", subtitle: "" })
  const onStartSubmit = () => {
    const body = {
      inventoryid: get(selected, "inventoryId"),
      language: localStorage.getItem("lang"),
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
      .catch((err) => { setError(err); setLoadStart(false); onStartCancel() })
  }

  const onFinish = () => { closePoop(); setAlertFinish({ open: true, title: __(`${module}.actions.finish.title`), subtitle: replace(replace(__(`${module}.actions.finish.question`), "[[number]]", `#${get(selected, "inventoryId")}`), "[[name]]", get(selected, "name")) }) }
  const onFinishCancel = () => setAlertFinish({ open: false, title: "", subtitle: "" })
  const onFinishSubmit = () => {
    const body = {
      inventoryid: get(selected, "inventoryId"),
      language: localStorage.getItem("lang"),
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
      .catch((err) => { setError(err); setLoadFinish(false); onFinishCancel() })
  }

  useEffect(() => { if (!loadToPay) closePoop() }, [loadToPay])
  const onPay = () => { onPaySubmit() }
  const onPayCancel = () => setAlertPay({ open: false, title: "", subtitle: "" })
  const onPaySubmit = () => {
    setOpenPay(true)
    onPayCancel()
  }

  const onDetail = () => { closePoop(); navegate(toString(get(selected, "inventoryId"))) }

  const onEdit = () => {
    setEdit({ item: selected, value: true });
    closePoop()
  }

  const onDelete = () => {
    closePoop()
    onDeleteConfirm()
  }

  const onDownload = () => {
    setLoadReport(true)

    const url = '/api/web/getinventoryreportbyid';

    const options = {
      baseURL: process.env.REACT_APP_API_URL,
      responseType: 'blob',
      headers: {
        companyid: get(userState, "companyname"),
        userid: get(userState, "userId"),
        Authorization: `Bearer ${get(userState, "jwt")}`,
      },
      params: {
        inventoryid: get(selected, "inventoryId"),
        language: localStorage.getItem("lang"),
        userid: get(userState, "userId"),
        companyid: Number(get(userState, "companyId")),
      }
    }

    axios.get(url, options)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${replace(__(`${module}.menu.report`), "[[code]]", get(selected, "inventoryId"))}.xlsx`);
        document.body.appendChild(link);
        link.click();
        closePoop();
        setLoadReport(false);
      })
      .catch((err) => { setError(err); setLoadReport(false); closePoop(); })

  }

  const getOptions = (status) => {
    const divider = <Divider />
    const detail = <MenuItem onClick={onDetail}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.detail`)}</strong></Typography></MenuItem>
    const edit = <MenuItem loading={true} onClick={onEdit}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.edit`)}</strong></Typography></MenuItem>
    const start = <MenuItem onClick={onStart}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.start`)}</strong></Typography></MenuItem>
    const deleteIt = <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
    const finish = <MenuItem onClick={onFinish}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.finish`)}</strong></Typography></MenuItem>
    const pay =
      <MenuItem onClick={onPay} disabled={loadToPay}>
        <Box height={28} position="relative">
          <Fade in={loadToPay}>
            <Box position="absolute" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
              <CircularProgress color="primary" size={20} />
            </Box>
          </Fade>
          <Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.pay`)}</strong></Typography>
        </Box >
      </MenuItem>
    const report = <MenuItem onClick={onDownload} disabled={loadReport}>
      <Box height={28} position="relative">
        <Fade in={loadReport}>
          <Box position="absolute" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress color="primary" size={20} />
          </Box>
        </Fade>
        <Typography className='text-center w-full ' variant="bodySmall" color={loadReport ? "text.slite" : "text.main"}><strong>{__(`${module}.menu.download`)}</strong></Typography>
      </Box >
    </MenuItem>

    switch (status) {
      case 1: return [detail, divider, edit, divider, pay, divider, deleteIt];
      case 2: return [detail, divider, edit, divider, start];
      case 3: return [detail, divider, edit, divider, finish];
      case 4: return [detail, divider, report];
      default: return [detail]
    }
  }

  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: __(`${module}.header.subtitle`),
        // btn right
        btnLabel: __(`${module}.btn`),
        btnFunc: () => setOpenNew(true),
        color: "primary",
      }}
    >
      <Table
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
        headTable={headTable}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(inventaryState, "isLoading", false)}
        action={
          <Button
            color="primary"
            variant="contained"
            size='large'
            onClick={() => setOpenNew(true)}
          >
            {__(`${module}.btn`)}
          </Button>
        }
      />
      <Stack sx={{ mt: 2 }} alignItems="flex-end">
        <Pagination
          count={get(inventaryState, "data.data.totalPage", 1)}
          page={get(inventaryState, "data.data.currentPage", 1)}
          onChange={onChangePagination}
          color="primary"
        />
      </Stack>

      <Popover
        id={"menu-inventario-activo"}
        open={open}
        anchorEl={anchorEl}
        onClose={closePoop}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        elevation={1}
      >
        <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
          {getOptions(get(selected, "statusId"))}
        </MenuList>
      </Popover>
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      {openNew &&
        <NewInventory
          __={__}
          open={openNew || get(edit, "value")}
          setOpen={setOpenNew}
          module={module}
          onSubmit={onSubmit}
          loading={postLoading}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          edit={edit}
          setEdit={setEdit}
          setError={setError}
        />
      }
      {get(edit, "value") &&
        <EditInventory
          __={__}
          open={openNew || get(edit, "value")}
          setOpen={setOpenNew}
          module={module}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          edit={edit}
          setEdit={setEdit}
          setError={setError}
          onSuccess={onSuccess}
        />
      }
      <NewInventaryAlert
        title={__(`${module}.modal.alert.title`)}
        subtitle={__(`${module}.modal.alert.sub-title`)}
        btn1={{ label: __(`${module}.modal.alert.btn-1`), func: onActivePay }}
        btn2={{ label: __(`${module}.modal.alert.btn-2`), func: () => setOpenAlert(false) }}
        openAlert={openAlert}
        closeAlert={() => setOpenAlert(false)}
      />
      <NewInventaryAlertNoTemplate
        __={__}
        module={module}
        submit={() => onSubmit(valuesTemp, true)}
        cancel={alertNoTempalteCancel}
        openAlert={openAlertTemplate}
        closeAlert={() => setOpenAlertTemplate(false)}
      />

      {openPay &&
        <Paying
          open={openPay}
          setOpen={setOpenPay}
          __={__}
          module={module}
          inventaryId={get(selected, "inventoryId")}
          setError={setError}
          setSuccess={setSuccess}
          getData={() => getData({ page: 1, filterSearch })}
          closeAlert={closeAlert}
          onDetail={false}
          setIsLoading={setLoadToPay}
        />
      }

      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.delete.title`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
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
    </Layout>
  )
}

export default ActiveInventory;