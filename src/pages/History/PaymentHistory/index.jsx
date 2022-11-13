import React from 'react';
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import Toolbar from "./Toolbar";

function createData(date, name, inventary, attached, amount, card, voucher) {
  return { date, name, inventary, attached, amount, card, voucher };
}

const rows = [
  createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
  createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
  createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
  createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
  createData('04/09/22', "Name of person", "Ejemplo de inventario", "Example.csv", 45.58, "**** 7013", ""),
];

const PaymentHistory = () => {
  const [__] = useTranslation("hist");
  const module = "payment"
  const titles = __(`${module}.table`, { returnObjects: true })

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

  const dataTable = map(rows, (row) => ({
    ...row,
    amount: `$ ${get(row, "amount")}`,
    voucher: <IconButton aria-label="download" size="small"><DownloadIcon fontSize="inherit" /></IconButton>
  }))

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
        module="payment" sizeFilters={125}
      />
      {/* <Table headTable={headTable} dataTale={dataTable} __={__} module={module} sizeFilters={125} /> */}
    </Layout>
  )
}

export default PaymentHistory;