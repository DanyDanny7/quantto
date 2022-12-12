/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace, toString } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover,
  Pagination,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "../../components/layout/Layout"
import Table from "../../components/form/Table";
import Notification from "../../components/form/Notification";
import Toolbar from "./component/Toolbar"
import NewInventory from "./component/NewInventory";
import NewInventaryAlert from "./component/NewInventaryAlert";

import { getInventary } from "../../store/inventary/thunk/getInventary";


// function createData(code, create_at, quantity, status, counts, file, onHand, counted, difference) {
//   return { code, create_at, quantity, status, counts, file, onHand, counted, difference };
// }

// const ∂∂ = [
//   createData('19283', "04/09/22", 100, "Creado", 10, "Example.csv", 5, 6, 7),
//   createData('19283', "04/09/22", 40, "Activo", 5, "Example.csv", 5, 6, 7),
//   createData('19283', "04/09/22", 100, "Pagado", 10, "Example.csv", 5, 6, 7),
//   createData('19283', "04/09/22", 40, "Creado", 5, "Example.csv", 5, 6, 7),
//   createData('19283', "04/09/22", 100, "Finalizado", 10, "Example.csv", 5, 6, 7),
// ];

const ActiveInventory = () => {
  const navegate = useNavigate();
  const dispatch = useDispatch();

  const [__] = useTranslation("inve");
  const module = "inventaries"
  const code = "#Asq937614"
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState({});
  const [showNoti, setShowNoti] = useState({ open: false, variant: "", msg: "" })
  const open = Boolean(anchorEl);
  const [openNew, setOpenNew] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);

  const titles = __(`${module}.table`, { returnObjects: true });

  const inventaryState = useSelector(state => state.inventary.inventary.data.data);
  const state = useSelector(state => state);


  const getData = (page) => {
    dispatch(getInventary({ page }))
  }

  useEffect(() => {
    getData(1)
  }, [dispatch])

  const handleClick = (item) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelected(item)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = () => {
    setTimeout(() => {
      setOpenAlert(true)
    }, 500);
  }

  const onActivePay = () => {
    setOpenAlert(false)
    setTimeout(() => {
      window.alert("Acá se activaría el metodo de pago")
    }, 500);
  }

  const onChangePagination = (e, page) => {
    getData(page)
  }

  // ---------- Table ---------------
  const headTable = [
    {
      key: "inventoryId",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "name",
      label: "Nombre",
      align: "left",
      width: 200,
    },
    {
      key: "create_at",
      label: get(titles, "[1]"),
      align: "center"
    },
    {
      key: "itemsQty",
      label: get(titles, "[2]"),
      align: "center"
    },
    {
      key: "status",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "countsUsers",
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

  const dataTable = map(get(inventaryState, "data", []), (row) => ({
    ...row,
    create_at: moment(row.date).format("DD-MM-YYYY"),
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

  const onDetail = () => navegate(toString(get(selected, "inventoryId")))

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
      <Stack sx={{ mt: 2 }} alignItems="flex-end">
        <Pagination
          count={get(inventaryState, "totalPage", 1)}
          page={get(inventaryState, "currentPage", 1)}
          onChange={onChangePagination}
          color="primary"
        />
      </Stack>


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
      <NewInventory __={__} open={openNew} setOpen={setOpenNew} module={module} onSubmit={onSubmit} />
      <NewInventaryAlert
        title={__(`${module}.modal.alert.title`)}
        subtitle={__(`${module}.modal.alert.sub-title`)}
        btn1={{ label: __(`${module}.modal.alert.btn-1`), func: onActivePay }}
        btn2={{ label: __(`${module}.modal.alert.btn-2`), func: () => setOpenAlert(false) }}
        openAlert={openAlert}
        closeAlert={() => setOpenAlert(false)}
      />
    </Layout>
  )
}

export default ActiveInventory;