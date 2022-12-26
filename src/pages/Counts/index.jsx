/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace, join } from "lodash";
import { Checkbox, IconButton, Typography, Chip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./Toolbar";
import NewCounters from "./components/NewCounters";
import AlertDelete from "../../components/form/AlertDelete";

import { getCounts } from "../../store/counts/thunk/getCounts"
import { deleteCount } from "../../store/counts/thunk/deleteCounts"


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
  const [toEdit, setToEdit] = useState({});

  const titles = __(`${module}.table`, { returnObjects: true })

  const countsState = useSelector(state => state.counts);
  // const userState = useSelector(state => state.auth.login.dataUser);

  const getData = () => {
    dispatch(getCounts())
  }

  useEffect(() => {
    getData(1)
  }, [dispatch])

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

  const onDeleteConfirm = (items) => {
    const msg = items?.length === 1 ? replace(__(`${module}.modal.delete.confirm1`), "[[name]]", get(items, "[0].userName")) : replace(__(`${module}.modal.delete.confirm2`), "[[number]]", items?.length)
    setItemsDelete(items)
    setAlertDelete({ open: true, title: __(`${module}.modal.delete.title`), subtitle: msg })
  }
  const onDelete = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })

    // dispatch(deleteCount({
    //   userid: get(userState, "userId"),
    //   companyid: Number(get(userState, "companyId")),
    //   language: get(userState, "language"),
    // }))
    const msg = itemsDelete?.length === 1 ? replace(__(`${module}.modal.delete.success1`), "[[name]]", get(itemsDelete, "[0].userName")) : replace(__(`${module}.modal.delete.success2`), "[[number]]", itemsDelete?.length)
    setShowNoti({ open: true, msg, variant: "success" })
    setSelected([])
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

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleDelete = () => {
  //   setShowNoti({ open: open, msg: __(`${module}.menu.delete-success`), variant: "success" })
  //   handleClose()
  // }

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
      key: "create_at",
      label: get(titles, "[1]"),
      align: "center"
    },
    {
      key: "active",
      label: get(titles, "[2]"),
      align: "center"
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
      active: <Chip label={<Typography variant="bodyXtraSmall">{get(row, "active", false) ? __(`${module}.status.active`) : __(`${module}.status.inactive`)}</Typography>} color={get(row, "active") ? "success" : "error"} />,
      checkbox: (
        <Checkbox
          color="secondary"
          checked={isItemSelected}
          onChange={(e, v) => handleChecked(e, get(row, "counterId"))}
          inputProps={{ 'aria-labelledby': labelId, }}
        />
      ),
      edit: <IconButton aria-label="edit" size="small" onClick={onEdit(row)}><ModeEditIcon fontSize="small" /></IconButton>,
      delete: <IconButton aria-label="delete" size="small" onClick={() => onDeleteConfirm([row])}><DeleteIcon fontSize="small" /></IconButton>
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
        toolbar={<Toolbar __={__} module={module} selected={selected} onDelete={onDeleteConfirm} />}
        dataTable={dataTable}
        __={__}
        module="payment"
        sizeFilters={125}
        propsTableCell={{ padding: "checkbox", height: 73 }}
        loading={get(countsState, "isLoading", false)}
      />
      {open &&
        <NewCounters
          open={open}
          onClose={closeNewCouter}
          isEdit={isEdit}
          toEdit={toEdit}
          __={__}
          module={module}
        />
      }
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.modal.delete.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.modal.delete.submit`), func: onDelete }}
        openAlert={alertDelete.open}
      />
    </Layout>
  )
}

export default Counts;