/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace, join, toString } from "lodash";
import { Checkbox, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./Toolbar";
import NewCounters from "./components/NewCounters";
import AlertDelete from "../../components/form/AlertQuestion";
import Alert from "../../components/form/Alert";

import { getCounts } from "../../store/counts/thunk/getCounts"
import { deleteCountRequest } from "../../store/counts/actions/deleteCounts"


const Counts = () => {
  const [__] = useTranslation("count");
  const dispatch = useDispatch();
  const module = "counts"
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsDelete, setItemsDelete] = useState([]);
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false)
  const [toEdit, setToEdit] = useState({});
  const [filterSearch, setFilterSearch] = useState("")
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

  const titles = __(`${module}.table`, { returnObjects: true })

  const userState = useSelector(state => state.auth.login.dataUser);
  const countsState = useSelector(state => state.counts);
  const getState = useSelector(state => state);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getCounts(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])

  const closeNewCouter = () => {
    setIsEdit(false)
    setOpen(false)
    setToEdit({})
  }

  const newCounter = () => {
    setIsEdit(false)
    setOpen(true)
  }

  const onEdit = (count) => () => {
    setToEdit(count)
    setIsEdit(true)
    setOpen(true)
  }

  //  --------- Delete -------------

  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }

  const setError = (err) => {
    if (!!get(err, "response.data")) {
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


  const onDeleteConfirm = (items, inRow) => {
    const msg = inRow ? replace(__(`${module}.modal.delete.confirm1`), "[[name]]", get(items, "[0].userName")) : replace(__(`${module}.modal.delete.confirm2`), "[[number]]", items?.length)
    setItemsDelete({ items, inRow })
    setAlertDelete({ open: true, title: __(`${module}.modal.delete.title`), subtitle: msg })
  }
  const onDelete = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: get(userState, "language"),
      counters: get(itemsDelete, "inRow") ? toString(get(itemsDelete, "items.[0].counterId")) : join(get(itemsDelete, "items"), ","),
    }
    setLoadDelete(true)
    deleteCountRequest(body, () => getState)
      .then(({ data }) => {
        const msg = get(itemsDelete, "inRow") ? replace(__(`${module}.modal.delete.success1`), "[[name]]", get(itemsDelete, "[0].userName")) : replace(__(`${module}.modal.delete.success2`), "[[number]]", get(itemsDelete, "items")?.length)
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
  

  //  --------- Tabla -------------

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = map(get(countsState, "data.data"), (n) => n.counterId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1
  }

  const handleChecked = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const headTable = [
    {
      key: "checkbox",
      label: (
        <Checkbox
          color="secondary"
          indeterminate={selected.length > 0 && selected.length < get(countsState, "data.data", []).length}
          checked={get(countsState, "data.data", []).length > 0 && selected.length === get(countsState, "data.data", []).length}
          onChange={handleSelectAllClick}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      ),
      align: "center",
      width: 100,
    },
    {
      key: "userName",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "edit",
      label: "",
      align: "center",
    },
    {
      key: "delete",
      label: "",
      align: "center",
    },
  ]

  const dataTable = map(get(countsState, "data.data", []), (row, i) => {
    const isItemSelected = isSelected(get(row, "counterId"));
    const labelId = `enhanced-table-checkbox-${i}`;
    return ({
      id: get(row, "counterId"),
      ...row,
      checkbox: (
        <Checkbox
          color="secondary"
          checked={isItemSelected}
          onChange={(e, v) => handleChecked(e, get(row, "counterId"))}
          inputProps={{ 'aria-labelledby': labelId, }}
        />
      ),
      edit: <IconButton aria-label="edit" size="small" onClick={onEdit(row)}><ModeEditIcon fontSize="small" /></IconButton>,
      delete: <IconButton aria-label="delete" size="small" onClick={() => onDeleteConfirm([row], true)}><DeleteIcon fontSize="small" /></IconButton>
    })
  })


  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: __(`${module}.header.sub-title`),
        btnLabel: __(`${module}.btn`),
        btnFunc: newCounter
      }}
    >
      <Table headTable={headTable}
        toolbar={<Toolbar setFilterSearch={setFilterSearch} selected={selected} onDelete={onDeleteConfirm} />}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        propsTableCell={{ padding: "checkbox", height: 73 }}
        loading={get(countsState, "isLoading", false)}
        action={
          <Button
            color="primary"
            variant="contained"
            size='large'
            onClick={newCounter}
          >
            {__(`${module}.btn`)}
          </Button>
        }
      />
      {open &&
        <NewCounters
          open={open}
          onClose={closeNewCouter}
          isEdit={isEdit}
          toEdit={toEdit}
          __={__}
          module={module}
          showNoti={showNoti}
          setShowNoti={setShowNoti}
          getData={() => getData({ page: 1, filterSearch })}
        />
      }
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.modal.delete.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.modal.delete.submit`), func: onDelete }}
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
    </Layout>
  )
}

export default Counts;