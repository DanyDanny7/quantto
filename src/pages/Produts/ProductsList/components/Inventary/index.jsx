/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace, toString } from "lodash";
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
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// import Layout from "../../../components/layout/Layout"
import Table from "../../../../../components/form/Table";
import Toolbar from "./ToolbarList";
// import Modal from "./components/Modal";
import AlertDelete from "../../../../../components/form/AlertQuestion";

import { getInventoryProduct } from "../../../../../store/product/thunk/productinventory/get"

const ProductsList = ({ setBtnFunc }) => {

  const [__] = useTranslation("prod");
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [filterSearch, setFilterSearch] = useState("0");
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  const [edit, setEdit] = useState({ item: {}, value: false });
  const [selected, setSelected] = useState({});

  // const [selected, setSelected] = useState({})

  const module = "list"
  const titles = __(`${module}.tableInventary`, { returnObjects: true })

  const product = useSelector(state => state.product.product.inventory);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { itemid: filterSearch }) }
    dispatch(getInventoryProduct(filters))
  }

  useEffect(() => {
    if (!!filterSearch) {
      getData({ page: 1, filterSearch })
    }
  }, [dispatch, filterSearch])


  const headTable = [
    {
      key: "itemId",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "itemCode",
      label: get(titles, "[1]"),
      align: "left",
    },
    {
      key: "location",
      label: get(titles, "[2]"),
      align: "left",
      sx: {
        width: 200,
        maxWidth: 200,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }
    },
    {
      key: "estado",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "expiration",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "lot",
      label: get(titles, "[5]"),
      align: "left"
    },
    {
      key: "quantityReserved",
      label: get(titles, "[6]"),
      align: "center"
    },
    {
      key: "quantityTotal",
      label: get(titles, "[7]"),
      align: "center"
    },
  ]

  const dataTable = map(get(product, "data", []), (row, i) => ({
    ...row,
    expiration: get(row, "expirationDate") ? moment(get(row, "expirationDate")).format("L") : "",
    total: `$ ${get(row, "cost")}`,
  }))

  // const onChangePagination = (e, page) => {
  //   getData({ page, filterSearch })
  // }

  const onDetail = () => { closePoop(); navegate(toString(get(selected, "inventoryId"))) }
  const onEdit = () => {
    setEdit({ item: selected, value: true });
    closePoop()
  }
  const onDelete = () => {
    closePoop()
    onDeleteConfirm()
  }

  const closePoop = () => {
    setAnchorEl(null);
  };

  //  --------- Delete -------------
  const onDeleteConfirm = () => {
    const msg = replace(__(`${module}.actions.delete.question`), "[[number]]", `#${get(selected, "inventoryId")}`)
    setAlertDelete({ open: true, title: __(`${module}.actions.delete.title`), subtitle: msg })
  }
  const onDeleteElement = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
    // const body = {
    //   userid: get(userState, "userId"),
    //   companyid: Number(get(userState, "companyId")),
    //   language: localStorage.getItem("lang"),
    //   inventoryid: get(selected, "inventoryId")
    // }
    setLoadDelete(true)
    // deleteInventaryRequest(body, () => getState)
    //   .then(({ data }) => {
    //     const msg = __(`${module}.actions.delete.success`);
    //     setShowNoti({ open: true, msg, variant: "success" })
    //     setSelected([])
    //     getData({ page: 1, filterSearch })
    //     setLoadDelete(false)
    //   })
    //   .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
  }

  useEffect(() => {
    setBtnFunc(<div />)
  }, [])


  return (
    // <Layout
    //   propsToolbar={{
    //     title: __(`${module}.header.title`),
    //     label: __(`${module}.header.sub-title`),
    //     code: null,
    //     btnLabel: __(`${module}.btn`),
    //     btnFunc: () => navegate("new"),
    //     color: "primary",
    //   }}
    // >
    <div className='min-h-[300px]'>
      <Table
        toolbar={<Toolbar setFilterSearch={setFilterSearch} __={__} module={module} />}
        headTable={headTable}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(product, "isLoading", false)}
        propsPaper={{ elevation: 0 }}
        propsTable={{ size: "small" }}
        empty="inventary"
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
        id={"menu-inventario-activo"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePoop}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        elevation={1}
      >
        <MenuList autoFocusItem={Boolean(anchorEl)} id="composition-menu" aria-labelledby="composition-button">
          <MenuItem onClick={onDetail}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.detail`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem loading={true} onClick={onEdit}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.edit`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={onDelete}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
        </MenuList>
      </Popover>
      {/* <Modal
        open={open}
        cancel={() => { setOpen(false); setSelected({}) }}
        maxWidth="md"
        fullWidth
        selected={selected}
        __={__}
        module={module}
      /> */}
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.delete.title`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
      />
    </div>
    // </Layout>
  )
}

export default ProductsList;