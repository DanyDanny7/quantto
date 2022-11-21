import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./Toolbar";
import NewCounters from "./components/NewCounters";

function createData(id, date, name, state) {
  return { id, date, name, state };
}

const rows = [
  createData("1", '04/09/22', "Jane Cooper", "Activo"),
  createData("2", '04/09/22', "Wade Warren", "Activo"),
  createData("3", '04/09/22', "Jane Cooper", "Inactivo"),
  createData("4", '04/09/22', "Wade Warren", "Activo"),
  createData("5", '04/09/22', "Jane Cooper", "Inactivo"),
];

const Counts = () => {
  const [__] = useTranslation("count");
  const module = "counts"
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });


  const titles = __(`${module}.table`, { returnObjects: true })


  const closeNewCouter = () => {
    setIsEdit(false)
    setOpen(false)
  }

  const newCounter = () => {
    setIsEdit(false)
    setOpen(true)
  }

  const onEdit = () => () => {
    setIsEdit(true)
    setOpen(true)
  }

  const onDelete = (items) => {
    console.log(items)
    const msg = items.length === 1 ? replace(__(`${module}.modal.notification-3`), "[[name]]", get(items, "[0].name")) : replace(__(`${module}.modal.notification-4`), "[[number]]", items.length)
    setShowNoti({ open: true, msg, variant: "success" })
    setSelected([])
  }

  //  --------- Tabla -------------

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
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
    } else if (selectedIndex === selected.length - 1) {
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
          indeterminate={selected.length > 0 && selected.length < rows.length}
          checked={rows.length > 0 && selected.length === rows.length}
          onChange={handleSelectAllClick}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      ),
      align: "center",
      width: 70,
    },
    {
      key: "date",
      label: get(titles, "[0]"),
      align: "center",
      width: 300,
    },
    {
      key: "name",
      label: get(titles, "[1]"),
      align: "left"
    },
    {
      key: "state",
      label: get(titles, "[2]"),
      align: "center"
    },
    {
      key: "edit",
      label: "",
      align: "center",
      width: 70,
    },
    {
      key: "delete",
      label: "",
      align: "center",
      width: 70,
    },

  ]

  const dataTable = map(rows, (row, i) => {

    const isItemSelected = isSelected(row.id);
    const labelId = `enhanced-table-checkbox-${i}`;
    return ({
      ...row,
      checkbox: (
        <Checkbox
          color="secondary"
          checked={isItemSelected}
          onChange={(e, v) => handleChecked(e, row.id)}
          inputProps={{ 'aria-labelledby': labelId, }}
        />
      ),
      edit: <IconButton aria-label="edit" size="small" onClick={onEdit(row)}><ModeEditIcon fontSize="small" /></IconButton>,
      delete: <IconButton aria-label="delete" size="small" onClick={() => onDelete([row])}><DeleteIcon fontSize="small" /></IconButton>
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
        toolbar={<Toolbar __={__} module={module} selected={selected} onDelete={onDelete} />}
        dataTable={dataTable}
        __={__}
        module="payment"
        sizeFilters={125}
        propsTableCell={{ padding: "checkbox" }}
      />
      <NewCounters
        open={open}
        onClose={closeNewCouter}
        isEdit={isEdit}
        __={__}
        module={module}
      />
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
    </Layout>
  )
}

export default Counts;