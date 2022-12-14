/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, isNull, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Divider,
  IconButton,
  Paper,
  Grid,
  Box,
  Typography,
  MenuList,
  MenuItem,
  Popover,
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment/moment';

import Layout from "../../../components/layout/Layout"
import Table from "../../../components/form/Table";
import CircularProgress from "../../../components/form/CircularProgress";
import Alert from "../../../components/form/Alert";
import PieChart from "../component/PieChart";
import BarChart from "../component/BarChart";
import Toolbar from "./Toolbar";

import { getInventaryDetail } from "../../../store/inventary/thunk/getInventary/detail/getDetails";

const LoadingData = () => (
  <Box sx={{
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  }}>
    <CircularProgress />
  </Box>
)

const ActiveInventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const params = useParams();
  const [__] = useTranslation("inve");
  const module = "detail"
  const code = `#${get(params, "detailId")}`

  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState({});
  const open = Boolean(anchorEl);
  const [alertActive, setAlertActive] = useState(false);
  const [filterSearch, setFilterSearch] = useState("")

  const titles = __(`${module}.table`, { returnObjects: true });

  const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);


  const getData = ({ page, filterSearch }) => {
    const filters = { page, inventoryid: get(params, "detailId"), ...(!!filterSearch && { search: filterSearch }) }
    dispatch(getInventaryDetail(filters))
  }

  useEffect(() => {
    getData({ page: 1, filterSearch })
  }, [dispatch, filterSearch])


  // ---------- Table ---------------

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
    // {
    //   key: "category",
    //   label: get(titles, "[2]"),
    //   align: "center"
    // },
    {
      key: "barCode",
      label: get(titles, "[3]"),
      align: "center"
    },
    {
      key: "inventory",
      label: get(titles, "[4]"),
      align: "center"
    },
    {
      key: "stock",
      label: get(titles, "[5]"),
      align: "center"
    },
    {
      key: "diference",
      label: get(titles, "[6]"),
      align: "center"
    },
    {
      key: "options",
      label: "",
      align: "center"
    },
  ]

  const card1 = {
    "count-name": get(inventaryDetailState, "data.data.name", "- -"),
    "start": isNull(get(inventaryDetailState, "data.data.startDate")) ? "- -" : moment(get(inventaryDetailState, "data.data.startDate")).format("DD/MM/YY - HH:mm A"),
    "end": isNull(get(inventaryDetailState, "data.data.endDate")) ? "- -" : moment(get(inventaryDetailState, "data.data.endDate")).format("DD/MM/YY - HH:mm A"),
    "progress": get(inventaryDetailState, "data.data.percentage", "- -"),
    "units-counted": get(inventaryDetailState, "data.data.itemsQty", "- -"),
    "elapsed-time": get(inventaryDetailState, "data.data.time", "- -"),
  }

  const handleClick = (e) => (event) => {
    setAnchorEl(event.currentTarget);
    setActive(e)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMore = () => {
    navegate(`count/${get(active, "inventoryDetailId")}`)
  }

  const dataTable = map(get(inventaryDetailState, "data.data.countsTemplate", []), (row) => ({
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

  return (
    <Layout
      propsToolbar={{
        title: replace(__(`${module}.header.title-1`), "[[code]]", code),
        label: replace(__(`${module}.header.sub-title-1`), "[[code]]", code),
        btnLabel: __(`${module}.btn-3`),
        btnFunc: () => { setAlertActive(true) },
        // color: "warning"
        color: "success"
      }}
      goBack
    >
      <Box className='mb-6'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <Paper elevation={[1]} className='py-8 px-6 overflow-auto h-full'>
              {get(inventaryDetailState, "isLoading", false)
                ? (
                  <LoadingData />
                ) : (
                  <>
                    <Typography className='pb-8' component={Box} variant="heading4">{__(`${module}.cards.card-1.title`)}</Typography>
                    <Box className='mb-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.count-name`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "count-name")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.start`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "start")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.end`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "end")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.progress`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "progress")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.units-counted`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "units-counted")}</Typography>
                    </Box>
                    <Box className='my-3'>
                      <Typography variant="heading4">{__(`${module}.cards.card-1.elapsed-time`)}</Typography>
                      <Typography className='pl-2' variant="bodyMedium">{get(card1, "elapsed-time")}</Typography>
                    </Box>
                  </>
                )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <Paper elevation={[1]} className='py-8 px-6 h-full'>
              <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-2.title`)}</Typography>
              <Box className='m-auto my-6' maxWidth={250} >
                <PieChart values={[get(inventaryDetailState, "data.data.getCountsPieChart.counted", 0), get(inventaryDetailState, "data.data.getCountsPieChart.notCounted", 0)]} />
              </Box>
              <Box className='flex items-center justify-around'>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.skyblue[500]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-2.counted`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.purplelight[300]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-2.not-counted`)}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} xl={5}>
            <Paper elevation={[1]} className='py-8 px-6 h-full'>
              <Typography className='mb-4' variant="heading4">{__(`${module}.cards.card-3.title`)}</Typography>
              <Box className='m-auto my-6 px-6' overflow="auto">
                <BarChart minWidth={350} countsBarChart={get(inventaryDetailState, "data.data.getCountsBarChart")} />
              </Box>
              <Box className='flex items-center justify-around'>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.greenlight[400]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.on-hand`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.orange[400]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.counted-units`)}</Typography>
                </Box>
                <Box className='flex items-center'>
                  <Box className='h-4 w-4 rounded-full mr-2' bgcolor={theme.palette.color.pink[300]} />
                  <Typography variant="bodySmall">{__(`${module}.cards.card-3.diference`)}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid >
      </Box >

      <Table
        toolbar={<Toolbar setFilterSearch={setFilterSearch} />}
        headTable={headTable}
        dataTable={dataTable}
        __={__}
        module={module}
        sizeFilters={125}
        loading={get(inventaryDetailState, "isLoading", false)}
      />

      <Popover
        id={"menu-inventario-activo"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        elevation={[1]}
      >
        <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
          <MenuItem onClick={showMore}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.details`)}</strong></Typography></MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
        </MenuList>
      </Popover>
      <Alert
        title={__(`${module}.alert.alert-1.title`)}
        subtitle={__(`${module}.alert.alert-1.subtitle`)}
        btn1={{ label: __(`${module}.alert.alert-1.btn-1`), func: () => { navegate("/inventory/active") } }}
        btn2={{ label: __(`${module}.alert.alert-1.btn-2`), func: () => setAlertActive(false) }}
        openAlert={alertActive}
        closeAlert={() => setAlertActive(false)}
      />
    </Layout >
  )
}

export default ActiveInventory;