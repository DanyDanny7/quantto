/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import { useParams } from 'react-router-dom';
import {
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Table from "../../../../components/form/Table";
import Toolbar from "./Toolbar";
import AlertDelete from "../../../../components/form/AlertQuestion";
import Alert from "../../../../components/form/Alert";
import New from "./List";
import Notification from "../../../../components/form/Notification";

import { deleteTransferDetailRequest } from "../../../../store/transfer/actions/detail/delete";
import { getLocation } from "../../../../store/warehouse/thunk/location/get";
import { getInventoryProdClear } from "../../../../store/product/thunk/productinventory/get";

const Detail = ({ list, getData, loading }) => {
  const [__] = useTranslation("tran");
  const dispatch = useDispatch();
  const { id } = useParams();

  const [filterSearch, setFilterSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [selected, setSelected] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });

  const module = "transfer"
  const titles = __(`${module}.tableDetail`, { returnObjects: true })

  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);


  const getLocationData = () => {
    dispatch(getLocation({}))
  }

  useEffect(() => {
    getLocationData()
    return () => {
      dispatch(getInventoryProdClear())
    }
  }, [])

  const setError = (err) => {
    if (!!get(err, "response.data") && !!get(err, "response.data.Message", "")) {
      setAlert({
        open: true,
        title: get(err, "response.data.Message", ""),
        subtitle: (<ul>{map(get(err, "response.data.ValidationError", []), (item) => <li>{`• ${item}`}</li>)}</ul>),
        type: "error",
        btn: __(`${module}.actions.accept`),
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

  const closePoop = () => {
    setAnchorEl(null);
  };

  const closeNew = () => {
    setIsEdit(false)
    setOpen(false)
    setToEdit({})
  }

  const setNew = () => {
    setIsEdit(false)
    setOpen(true)
  }

  // const onEdit = () => {
  //   closePoop()
  //   setIsEdit(true)
  //   setOpen(true)
  // }

  //  --------- Delete -------------
  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }
  const onDeleteConfirm = () => {
    const msg = replace(__(`${module}.actions.deleteDetail.question`), "[[number]]", `#${get(selected, "inventoryId")}`)
    setAlertDelete({ open: true, title: __(`${module}.actions.deleteDetail.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      transferdetailid: get(selected, "transferdetailid"),
      transferid: id
    }
    setLoadDelete(true)
    deleteTransferDetailRequest(body, () => getState)
      .then(({ data }) => {
        const msg = __(`${module}.actions.delete.success`);
        setShowNoti({ open: true, msg, variant: "success" })
        setSelected({})
        setLoadDelete(false)
        getData()
        dispatch(getInventoryProdClear())
      })
      .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
  }
  
  const headTable = [
    // {
    //   key: "itemid",
    //   label: get(titles, "[0]"),
    //   align: "left",
    //   width: 150,
    // },
    {
      key: "itemcode",
      label: get(titles, "[1]"),
      align: "center",
      width: 150,
    },
    {
      key: "itemname",
      label: get(titles, "[2]"),
      align: "center",
      width: 150,
    },
    {
      key: "status",
      label: get(titles, "[4]"),
      align: "left",
    },
    {
      key: "expiration",
      label: get(titles, "[3]"),
      align: "center",
      width: 150,
    },
    {
      key: "lot",
      label: get(titles, "[5]"),
      align: "left",
    },
    {
      key: "quantity",
      label: get(titles, "[7]"),
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
        toolbar={<Toolbar setFilterSearch={setFilterSearch} __={__} module={module} setNew={setNew} />}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={loading}
        propsPaper={{ elevation: 0 }}
        propsTable={{ size: "small" }}
        empty="items"
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
          {/* <MenuItem onClick={onEdit}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.actions.edit`)}</strong></Typography></MenuItem>
          <Divider /> */}
          <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.actions.delet`)}</strong></Typography></MenuItem>
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
          maxWidth="xl"
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