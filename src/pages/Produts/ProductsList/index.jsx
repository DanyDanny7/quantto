/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import {
  // Pagination,
  // Stack,
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
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import Notification from "../../../components/form/Notification";
import Toolbar from "./Toolbar";
import AlertDelete from "../../../components/form/AlertQuestion";

import { getListProduct } from "../../../store/product/thunk/productlist/get";
import { deleteListProductRequest } from "../../../store/product/actions/productlist/delete";

const ProductsList = () => {

  const [__] = useTranslation("prod");
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [filterSearch, setFilterSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [active, setActive] = useState({});
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState({})

  const module = "list"
  const titles = __(`${module}.table`, { returnObjects: true })

  const product = useSelector(state => state.product.product);
  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getListProduct(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])

  const handleClick = (e) => (event) => {
    setAnchorEl(event.currentTarget);
    setActive(e)
  };

  const closePoop = () => {
    setAnchorEl(null);
  };

 
  // const onChangePagination = (e, page) => {
  //   getData({ page, filterSearch })
  // }

  // const onDetail = () => { closePoop(); navegate(toString(get(selected, "inventoryId"))) }
  const onEdit = () => {
    // setEdit({ item: selected, value: true });
    // closePoop()
    navegate(`${get(active, "itemId")}`)
  }
  const onDelete = () => {
    closePoop()
    onDeleteConfirm()
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

  //  --------- Delete -------------
  const onDeleteConfirm = () => {
    const msg = __(`${module}.actions.delete.question`)
    setAlertDelete({ open: true, title: __(`${module}.actions.delete.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    const body = {
      userid: get(userState, "userId"),
      companyid: Number(get(userState, "companyId")),
      language: localStorage.getItem("lang"),
      itemid: get(active, "itemId")
    }
    setLoadDelete(true)
    deleteListProductRequest(body, () => getState)
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
      key: "date",
      label: get(titles, "[2]"),
      align: "left"
    },
    {
      key: "status",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "category",
      label: get(titles, "[4]"),
      align: "left"
    },
    {
      key: "subCategory",
      label: get(titles, "[5]"),
      align: "left"
    },
    {
      key: "total",
      label: get(titles, "[6]"),
      align: "left"
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const dataTable = map(get(product, "data.data", []), (row, i) => ({
    ...row,
    date: moment(get(row, "create_at")).format("DD/MM/YYYY"),
    total: `$ ${get(row, "cost")}`,
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
    )
  }))


  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: __(`${module}.header.sub-title`),
        code: null,
        btnLabel: __(`${module}.btn`),
        btnFunc: () => navegate("new"),
        color: "primary",
      }}
    >
      <Table headTable={headTable}
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(product, "isLoading", false)}
      />
      {/* <Stack sx={{ mt: 2 }} alignItems="flex-end">
        <Pagination
          count={get(product, "totalPage", 1)}
          page={get(product, "currentPage", 1)}
          onChange={onChangePagination}
          color="primary"
        />
      </Stack> */}
      <Popover
        id={"menu-products-activo"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePoop}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
        elevation={1}
      >
        <MenuList autoFocusItem={Boolean(anchorEl)} id="composition-menu" aria-labelledby="composition-button">
          <MenuItem loading={true} onClick={onEdit}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.actions.edit`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.actions.delete.title`)}</strong></Typography></MenuItem>
        </MenuList>
      </Popover>
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.delete.title`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
      />
    </Layout>
  )
}

export default ProductsList;