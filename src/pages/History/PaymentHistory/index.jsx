/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map } from "lodash";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Pagination, Stack, SvgIcon, Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import Toolbar from "./Toolbar";

import { getHistoryPayment } from "../../../store/history/thunk/historyPayment"

const PaymentHistory = () => {
  const [__] = useTranslation("hist");
  const dispatch = useDispatch();
  const [filterSearch, setFilterSearch] = useState("")

  const module = "payment"
  const titles = __(`${module}.table`, { returnObjects: true })

  const historyState = useSelector(state => state.history.historyPayment);

  const getData = ({ page, filterSearch }) => {
    const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getHistoryPayment(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])

  const selectImgCard = (key) => {
    switch (key) {
      case "MC": return <SvgIcon sx={{ width: 34, height: 22, fill: "none" }} viewBox="0 0 34 22" xmlns="http://www.w3.org/2000/svg"><path d="M19.4338 6.6759H14.5665V15.3241H19.4338V6.6759Z" fill="#FF5F00" /><path d="M14.8755 11C14.8748 10.1671 15.0657 9.34497 15.4338 8.59582C15.8018 7.84666 16.3375 7.19012 17.0001 6.6759C16.1795 6.03815 15.194 5.64155 14.1562 5.53141C13.1184 5.42128 12.0702 5.60206 11.1315 6.0531C10.1927 6.50414 9.40116 7.20724 8.84741 8.08202C8.29366 8.95681 8 9.968 8 11C8 12.032 8.29366 13.0432 8.84741 13.918C9.40116 14.7928 10.1927 15.4959 11.1315 15.9469C12.0702 16.3979 13.1184 16.5787 14.1562 16.4686C15.194 16.3585 16.1795 15.9618 17.0001 15.3241C16.3375 14.8099 15.8019 14.1533 15.4338 13.4042C15.0657 12.655 14.8748 11.8329 14.8755 11Z" fill="#EB001B" /><path d="M26 11C26 12.032 25.7064 13.0432 25.1527 13.918C24.599 14.7927 23.8075 15.4958 22.8687 15.9469C21.9299 16.3979 20.8818 16.5787 19.844 16.4686C18.8062 16.3585 17.8207 15.9618 17.0001 15.3241C17.6622 14.8094 18.1974 14.1527 18.5655 13.4037C18.9335 12.6546 19.1247 11.8328 19.1247 11C19.1247 10.1672 18.9335 9.34536 18.5655 8.59632C18.1974 7.84728 17.6622 7.19064 17.0001 6.6759C17.8207 6.03815 18.8062 5.64154 19.844 5.53141C20.8818 5.42128 21.9299 5.60207 22.8687 6.05311C23.8075 6.50415 24.599 7.20725 25.1527 8.08204C25.7064 8.95683 26 9.96801 26 11Z" fill="#F79E1B" /><path d="M25.4693 14.4081V14.2311H25.5415V14.195H25.3576V14.2311H25.4298V14.4081H25.4693ZM25.8263 14.4081V14.1946H25.7699L25.7051 14.3415L25.6403 14.1946H25.5839V14.4081H25.6237V14.2471L25.6845 14.3859H25.7257L25.7865 14.2467V14.4081H25.8263Z" fill="#F79E1B" /><rect x="0.5" y="0.5" width="33" height="21" rx="1.5" stroke="#D1D1D1" /></SvgIcon>;
      case "VISA": return <SvgIcon sx={{ width: 35, height: 22, fill: "none" }} viewBox="0 0 35 22" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5659 13.9541H10.9854L9.80016 9.2995C9.74391 9.08539 9.62446 8.8961 9.44876 8.80689C9.01028 8.58269 8.5271 8.40426 8 8.31427V8.13507H10.5461C10.8975 8.13507 11.1611 8.40426 11.205 8.7169L11.8199 12.0744L13.3997 8.13507H14.9363L12.5659 13.9541ZM15.8146 13.9541H14.3219L15.551 8.13507H17.0437L15.8146 13.9541ZM18.9755 9.74626C19.0194 9.43285 19.283 9.25365 19.5905 9.25365C20.0736 9.20865 20.6 9.29864 21.0392 9.52206L21.3028 8.26919C20.8635 8.08999 20.3804 8 19.9419 8C18.4931 8 17.4389 8.80603 17.4389 9.92469C17.4389 10.7757 18.1856 11.2226 18.7127 11.4917C19.283 11.7602 19.5026 11.9394 19.4587 12.2078C19.4587 12.6104 19.0194 12.7896 18.581 12.7896C18.0539 12.7896 17.5268 12.6554 17.0444 12.4312L16.7808 13.6849C17.3079 13.9083 17.8782 13.9983 18.4053 13.9983C20.0297 14.0425 21.0392 13.2372 21.0392 12.0286C21.0392 10.5065 18.9755 10.4173 18.9755 9.74626ZM26.2623 13.9541L25.0771 8.13507H23.804C23.5405 8.13507 23.2769 8.31427 23.1891 8.58269L20.9944 13.9541H22.531L22.8377 13.1039H24.7257L24.9014 13.9541H26.2623ZM24.0239 9.70154L24.4624 11.8946H23.2332L24.0239 9.70154Z" fill="#172B85" /><rect x="0.5" y="0.5" width="33.2623" height="21" rx="1.5" stroke="#D1D1D1" /></SvgIcon>;
      default: return <></>;
    }
  }

  const headTable = [
    {
      key: "date",
      label: get(titles, "[0]"),
      align: "left",
    },
    {
      key: "paymentName",
      label: get(titles, "[1]"),
      align: "center"
    },
    {
      key: "inventoryName",
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
      key: "creditcard",
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
    date: moment(get(row, "paydate")).format("DD/MM/YYYY"),
    amount: `$ ${get(row, "amount")}`,
    voucher: <IconButton aria-label="download" size="small"><DownloadIcon fontSize="inherit" /></IconButton>,
    creditcard: <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} ><Box>{selectImgCard(get(row, "cardType"))}</Box><Box>{get(row, "creditcard")}</Box></Stack>
  }))




  const onChangePagination = (e, page) => {
    getData({ page, filterSearch })
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
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
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