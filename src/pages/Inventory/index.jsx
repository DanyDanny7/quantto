import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./component/Toolbar"
import NewInventory from "./component/NewInventory";

function createData(code, create_at, quantity, status, counts, file, onHand, counted, difference) {
  return { code, create_at, quantity, status, counts, file, onHand, counted, difference };
}

const rows = [
  createData('19283', "04/09/22", 100, "Creado", 10, "Example.csv", 5, 6, 7),
  createData('19283', "04/09/22", 40, "Activo", 5, "Example.csv", 5, 6, 7),
  createData('19283', "04/09/22", 100, "Pagado", 10, "Example.csv", 5, 6, 7),
  createData('19283', "04/09/22", 40, "Creado", 5, "Example.csv", 5, 6, 7),
  createData('19283', "04/09/22", 100, "Finalizado", 10, "Example.csv", 5, 6, 7),
];

const ActiveInventory = () => {
  const theme = useTheme();
  const navegate = useNavigate();
  const [__] = useTranslation("inve");
  const module = "inventaries"
  const code = "#Asq937614"

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState({});
  const [showNoti, setShowNoti] = useState({ open: false, variant: "", msg: "" })
  const open = Boolean(anchorEl);
  const [openNew, setOpenNew] = useState(false)


  const titles = __(`${module}.table`, { returnObjects: true });


  const handleClick = (item) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelected(item)

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ---------- Table ---------------
  const headTable = [
    {
      key: "code",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "create_at",
      label: get(titles, "[1]"),
      align: "center"
    },
    {
      key: "quantity",
      label: get(titles, "[2]"),
      align: "center"
    },
    {
      key: "status",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "counts",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "file",
      label: get(titles, "[5]"),
      align: "center"
    },
    {
      key: "onHand",
      label: get(titles, "[6]"),
      align: "center"
    },
    {
      key: "counted",
      label: get(titles, "[7]"),
      align: "center"
    },
    {
      key: "difference",
      label: get(titles, "[8]"),
      align: "center"
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]


  const dataTable = map(rows, (row) => ({
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

  // ---------- Menu ---------------

  const onDetail = () => {
    navegate("AJHG623645")
  }
  const onEdit = () => {
    // setShowNoti({ open: true, variant: "success", msg: "" })
  }
  const onStart = () => {
    setShowNoti({ open: true, variant: "success", msg: "Inventario Inicializado" })
  }
  const onDelete = () => {
    setShowNoti({ open: true, variant: "success", msg: "Inventario Eliminado" })
  }
  const onFinish = () => {
    setShowNoti({ open: true, variant: "success", msg: "Inventario Finalizado" })
  }

  const getOptions = (status) => {
    const divider = <Divider />
    const detail = <MenuItem onClick={onDetail}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.detail`)}</strong></Typography></MenuItem>
    const edit = <MenuItem onClick={onEdit}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.edit`)}</strong></Typography></MenuItem>
    const start = <MenuItem onClick={onStart}><Typography className='text-center w-full ' variant="bodySmall" color="success.main"><strong>{__(`${module}.menu.start`)}</strong></Typography></MenuItem>
    const deleteIt = <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
    const finish = <MenuItem onClick={onFinish}><Typography className='text-center w-full ' variant="bodySmall" color="primary.main"><strong>{__(`${module}.menu.finish`)}</strong></Typography></MenuItem>

    switch (status) {
      case "Creado": return <>{detail}{divider}{edit}{divider}{deleteIt}</>;
      case "Pagado": return <>{detail}{divider}{edit}{divider}{start}</>;
      case "Finalizado": return <>{detail}</>;
      case "Activo": return <>{detail}{divider}{finish}</>;
      default: return <>{detail}</>
    }
  }

  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: replace(__(`${module}.header.sub-title`), "[[code]]", code),
        btnLabel: __(`${module}.btn`),
        btnFunc: () => setOpenNew(true),
        color: "primary"
      }}
    >
      <Table
        toolbar={<Toolbar __={__} module={module} />}
        headTable={headTable}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
      />

      <Popover
        id={"menu-inventario-activo"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        elevation={1}
      >
        <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
          {getOptions(get(selected, "status"))}
        </MenuList>
      </Popover>
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <NewInventory __={__} open={openNew} setOpen={setOpenNew} module={module} />
    </Layout>
  )
}

export default ActiveInventory;