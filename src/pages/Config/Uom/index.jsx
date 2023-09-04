/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";
import {
  IconButton,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Notification from "../../../components/form/Notification";
import NewUom from "./components/NewUom";
import Table from "../../../components/form/Table";
import Toolbar from "./Toolbar";
import AlertDelete from "../../../components/form/AlertQuestion";
import Alert from "../../../components/form/Alert";

import { getUom } from "../../../store/config/thunk/uom/get"
import { deleteUomRequest } from "../../../store/config/actions/uom/delete"

const Uom = ({ setBtnFunc }) => {
  const [__] = useTranslation("conf");
  const dispatch = useDispatch();
  const [filterSearch, setFilterSearch] = useState("");
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [toEdit, setToEdit] = useState({});
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })
  const [isEdit, setIsEdit] = useState(false);
  const [itemsDelete, setItemsDelete] = useState([]);

  const module = "uom"
  const titles = __(`${module}.table`, { returnObjects: true })

  const uom = useSelector(state => state.config.uom);
  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getUom(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])

  useEffect(() => {
    setBtnFunc(() => newUom)
  }, [])

  const closeNewUom = () => {
    setIsEdit(false)
    setOpen(false)
    setToEdit({})
  }

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

  const newUom = () => {
    setIsEdit(false)
    setOpen(true)
  }

  const onEdit = (item) => () => {
    setToEdit(item)
    setIsEdit(true)
    setOpen(true)
  }

  //  --------- Delete -------------
  const onDeleteConfirm = (item) => {
    const msg = __(`${module}.actions.delete.question`)
    setAlertDelete({ open: true, title: __(`${module}.actions.delete.title`), subtitle: msg })
    setItemsDelete({ item })
  }
  const onDelete = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })

    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      id: get(itemsDelete, "item.id"),
    }
    setLoadDelete(true)
    deleteUomRequest(body, () => getState)
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

  const headTable = [
    {
      key: "id",
      label: get(titles, "[0]"),
      align: "left",
      width: 100
    },
    {
      key: "status",
      label: get(titles, "[1]"),
      align: "center",
      width: 100
    },
    {
      key: "description",
      label: get(titles, "[2]"),
      align: "left"
    },
    {
      key: "edit",
      label: "",
      align: "center",
      width: 100
    },
    {
      key: "delete",
      label: "",
      align: "center",
      width: 100
    },
  ]

  const dataTable = map(get(uom, "data", []), (row, i) => ({
    ...row,
    date: moment(get(row, "create_at")).format("DD/MM/YYYY"),
    total: `$ ${get(row, "cost")}`,
    status: <Chip className='min-w-[70px]' size="small" label={<Typography variant="bodyXtraSmall">{__(`${module}.status.${get(row, "active")}`)}</Typography>} color={get(row, "active") ? "success" : "error"} />,
    edit: <IconButton aria-label="edit" size="small" onClick={onEdit(row)}><ModeEditIcon fontSize="small" /></IconButton>,
    delete: <IconButton aria-label="delete" size="small" onClick={() => onDeleteConfirm(row)}><DeleteIcon fontSize="small" /></IconButton>
  }))

  return (
    <div>
      <Table headTable={headTable}
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(uom, "isLoading", false)}
        propsPaper={{ elevation: 0 }}
        action={
          <Button
            color="primary"
            variant="contained"
            size='large'
            onClick={newUom}
          >
            {__(`${module}.btn`)}
          </Button>
        }
      />
      {open &&
        <NewUom
          open={open}
          onClose={closeNewUom}
          isEdit={isEdit}
          toEdit={toEdit}
          __={__}
          module={module}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          getData={() => getData({ page: 1, filterSearch })}
          setError={setError}
          maxWidth="md"
        />
      }
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.modal.btn.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.modal.btn.save`), func: onDelete }}
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

export default Uom;