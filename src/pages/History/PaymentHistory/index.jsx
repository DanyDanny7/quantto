/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";
import DownloadIcon from '@mui/icons-material/Download';
import {
  Divider,
  IconButton,
  Typography,
  MenuList,
  MenuItem,
  Popover,
  Pagination,
  Stack,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import Toolbar from "./Toolbar";

import { getHistoryPayment } from "../../../store/history/thunk/historyPayment"


// function createData(date, name, inventary, attached, amount, card, voucher) {
//   return { date, name, inventary, attached, amount, card, voucher };
// }

// const rows = [
//   createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
//   createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
//   createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
//   createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
//   createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
// ];

const PaymentHistory = () => {
  const [__] = useTranslation("hist");
  const dispatch = useDispatch();

  const module = "payment"
  const titles = __(`${module}.table`, { returnObjects: true })

  const historyState = useSelector(state => state.history.historyPayment);

  const getData = () => {
    dispatch(getHistoryPayment())
  }

  useEffect(() => {
    getData(1)
  }, [dispatch])

  const headTable = [
    {
      key: "date",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "name",
      label: get(titles, "[1]"),
      align: "center"
    },
    {
      key: "inventary",
      label: get(titles, "[2]"),
      align: "center"
    },
    {
      key: "attached",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "amount",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "card",
      label: get(titles, "[5]"),
      align: "center"
    },
    {
      key: "voucher",
      label: get(titles, "[6]"),
      align: "center"
    },
  ]

  const dataTable = map(get(historyState, "data.data", []), (row, i) => ({
    ...row,
    amount: `$ ${get(row, "amount")}`,
    voucher: <IconButton aria-label="download" size="small"><DownloadIcon fontSize="inherit" /></IconButton>
  }))

  const onChangePagination = (e, page) => {
    getData(page)
  }

  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: __(`${module}.header.sub-title`),
        code: null,
        btnLabel: null
      }}
    >
      <Table headTable={headTable}
        toolbar={<Toolbar __={__} module={module} />}
        dataTable={dataTable}
        __={__}
        module="payment"
        sizeFilters={125}
        loading={get(historyState, "isLoading", false)}
      />
      <Stack sx={{ mt: 2 }} alignItems="flex-end">
        <Pagination
          count={get(historyState, "totalPage", 1)}
          page={get(historyState, "currentPage", 1)}
          onChange={onChangePagination}
          color="primary"
        />
      </Stack>
    </Layout>
  )
}

export default PaymentHistory;