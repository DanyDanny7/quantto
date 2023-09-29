/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, toString } from "lodash";
import {
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Table from "./Table";
import Toolbar from "./Toolbar";
import AlertDelete from "../../../../../components/form/AlertQuestion";
import Alert from "../../../../../components/form/Alert";
import New from "./New";
import List from "./List";
import Notification from "../../../../../components/form/Notification";

import { deleteOutboundDetailRequest } from "../../../../../store/outbound/actions/outboundDetail/delete";
import { getListProduct } from "../../../../../store/product/thunk/productlist/get";
import { getOutboundDetailPickingRequest } from "../../../../../store/outbound/actions/outboundDetailPicking/get";
import { deleteOutboundDetailPickingRequest } from "../../../../../store/outbound/actions/outboundDetailPicking/delete";

const Detail = ({ id, list, getData, loading }) => {
  const [__] = useTranslation("outb");
  const dispatch = useDispatch();
  const [filterSearch, setFilterSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [alertDeleteDetail, setAlertDeleteDetail] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [selected, setSelected] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [details, setDetails] = useState([])
  const [act, setAct] = useState(null)
  const [load, setLoad] = useState(false)

  const module = "outbound"
  const titles = __(`${module}.tableDetail`, { returnObjects: true })
  const titlesDetail = __(`${module}.tableDetailModal`, { returnObjects: true })

  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const getItemsData = () => {
    dispatch(getListProduct({}))
  }

  const getSdetail = (outbounddetailid) => {
    setLoad(true)
    getOutboundDetailPickingRequest({ outboundid: id, outbounddetailid }, () => getState)
      .then(({ data }) => {
        setDetails(data.data)
        setLoad(false)
      })
      .catch((err) => {
        setError(err);
        setLoad(false)
      })
  }

  useEffect(() => {
    getItemsData()
  }, [])

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

  const handleClick = (e) => (event) => {
    setAnchorEl(event.currentTarget);
    setToEdit(e)
    setSelected(e)
  };

  const onDelete = () => {
    closePoop()
    onDeleteConfirm()
  }

  const onDeleteDetail = (row) => {
    setSelected(row)
    closePoop()
    onDeleteConfirmDetail()
  }

  const closePoop = () => {
    setAnchorEl(null);
  };

  const closeNew = () => {
    setIsEdit(false)
    setOpen(false)
    setOpenAdd(false)
    setToEdit({})
  }

  const setNew = () => {
    setIsEdit(false)
    setOpen(true)
  }

  const onEdit = () => {
    closePoop()
    setIsEdit(true)
    setOpen(true)
  }

  const onAdd = () => {
    closePoop()
    setOpenAdd(true)
  }

  //  --------- Delete -------------
  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }
  const onDeleteConfirm = () => {
    const msg = __(`${module}.actions.deleteDetail.question`)
    setAlertDelete({ open: true, title: __(`${module}.actions.deleteDetail.title`), subtitle: msg })
  }
  const onDeleteConfirmDetail = () => {
    const msg = __(`${module}.actions.deleteDetail.question`)
    setAlertDeleteDetail({ open: true, title: __(`${module}.actions.deleteDetail.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      outboundid: id,
      outbounddetailid: get(selected, "outbounddetailid")
    }
    setLoadDelete(true)
    deleteOutboundDetailRequest(body, () => getState)
      .then(({ data }) => {
        const msg = __(`${module}.actions.delete.success`);
        setShowNoti({ open: true, msg, variant: "success" })
        setSelected({})
        getData()
        setLoadDelete(false)
      })
      .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteElementDetail = () => {
    setAlertDeleteDetail({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      outboundid: id,
      outbounddetailpickingid: get(selected, "outboundDetailPickingId"),
    }
    setLoadDelete(true)
    deleteOutboundDetailPickingRequest(body, () => getState)
      .then(({ data }) => {
        const msg = __(`${module}.actions.delete.success`);
        setShowNoti({ open: true, msg, variant: "success" })
        setSelected({})
        getSdetail(act)
        setLoadDelete(false)
      })
      .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    setAlertDeleteDetail({ open: false, title: "", subtitle: "" })
  }

  const headTable = [
    {
      key: "itemid",
      label: get(titles, "[0]"),
      align: "left",
      width: 150,
    },
    {
      key: "itemname",
      label: get(titles, "[1]"),
      align: "left",
    },
    {
      key: "quantity",
      label: get(titles, "[2]"),
      align: "center",
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const headTableDetail = [
    {
      key: "itemId",
      label: get(titlesDetail, "[0]"),
      align: "left",
      width: 150,
    },
    {
      key: "itemName",
      label: get(titlesDetail, "[1]"),
      align: "center",
      width: 150,
    },
    {
      key: "itemCode",
      label: get(titlesDetail, "[2]"),
      align: "center",
      width: 150,
    },
    {
      key: "expiration",
      label: get(titlesDetail, "[3]"),
      align: "left",
    },
    {
      key: "estado",
      label: get(titlesDetail, "[4]"),
      align: "left",
    },
    {
      key: "lot",
      label: get(titlesDetail, "[5]"),
      align: "left",
    },
    {
      key: "quantity",
      label: get(titlesDetail, "[6]"),
      align: "left",
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const dataTable = map(list, (row, i) => ({
    ...row,
    expiration: get(row, "expirationdate") ? moment(get(row, "expirationdate")).format("L") : "",
    status: <Chip className='min-w-[70px]' size="small" label={<Typography variant="bodyXtraSmall">{__(`${module}.status.${toString(get(row, "active"))}`)}</Typography>} color={get(row, "active") ? "success" : "error"} />,
    options: (
      <IconButton
        className='!p-0'
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick(row)}
      >
        <MoreVertIcon />
      </IconButton>
    ),
  }))

  return (
    <div className='min-h-[300px]'>
      <Table
        headTable={headTable}
        headTableDetail={headTableDetail}
        toolbar={<Toolbar setFilterSearch={setFilterSearch} __={__} module={module} setNew={setNew} />}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={loading}
        propsPaper={{ elevation: 0 }}
        propsTable={{ size: "small" }}
        empty="items"
        details={details}
        load={load}
        getSdetail={getSdetail}
        onDeleteDetail={onDeleteDetail}
        act={act}
        setAct={setAct}
      />
      <Popover
        id={"menu-product-activo"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePoop}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
        elevation={1}
      >
        <MenuList autoFocusItem={Boolean(anchorEl)} id="composition-menu" aria-labelledby="composition-button">
          <MenuItem onClick={onEdit}><Typography className='text-left w-full ' variant="bodySmall"><strong>{__(`${module}.action.edit`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={onAdd}><Typography className='text-left w-full ' variant="bodySmall"><strong>{__(`${module}.action.addDetail`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={onDelete}><Typography className='text-left w-full ' variant="bodySmall"><strong>{__(`${module}.action.delete`)}</strong></Typography></MenuItem>
        </MenuList>
      </Popover>
      {open &&
        <New
          open={open}
          onClose={closeNew}
          isEdit={isEdit}
          toEdit={toEdit}
          __={__}
          module={module}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          getData={getData}
          setError={setError}
          maxWidth="md"
        />
      }
      {openAdd &&
        <List
          open={openAdd}
          onClose={closeNew}
          __={__}
          module={module}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          getData={getSdetail}
          setError={setError}
          maxWidth="xl"
          selected={selected}
        />
      }
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.accept`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
      />
      <AlertDelete
        title={alertDeleteDetail.title}
        subtitle={alertDeleteDetail.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.accept`), func: onDeleteElementDetail }}
        openAlert={alertDeleteDetail.open}
        loading={loadDelete}
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
    </div>
  )
}

export default Detail;