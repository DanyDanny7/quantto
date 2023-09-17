/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import {
  SvgIcon,
  Grid,
  Button,
  Paper,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import map from "lodash/map";
import get from "lodash/get";

import Layout from "../../../components/layout/Layout"
import Paying from "./Paying"

import { getHistoryPayment } from "../../../store/history/thunk/historyPayment"

const PaymentHistory = () => {
  const [__] = useTranslation("pay");
  const dispatch = useDispatch();

  const [filterSearch, setFilterSearch] = useState("");
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState({})
  const [openPay, setOpenPay] = useState(false)

  const module = "plans"
  const titles = __(`${module}.table`, { returnObjects: true })

  const historyState = useSelector(state => state.history.historyPayment);

  const IcoCheck = ({ hover }) => <svg className='w-[20px] h-[20px] min-w-[20px]' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1843_40325)"><path d="M7.50013 13.475L4.02513 9.99999L2.8418 11.175L7.50013 15.8333L17.5001 5.83333L16.3251 4.65833L7.50013 13.475Z" fill={hover ? "#FFFFFF" : "#FFB086"} /></g><defs><clipPath id="clip0_1843_40325"><rect width="20" height="20" fill="white" /></clipPath></defs></svg>

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


  const listplans = [
    {
      key: 1,
      ico: (hover) => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill={hover ? "transparent" : "#F2F2F2"} /><g clip-path="url(#clip0_1843_40316)"><path d="M25.2077 16.3334L20.6243 13.6834C20.241 13.4584 19.7577 13.4584 19.3743 13.6834L14.791 16.3334C14.4077 16.5584 14.166 16.9667 14.166 17.4167V22.7084C14.166 23.1584 14.4077 23.5667 14.791 23.7917L19.3743 26.4417C19.7577 26.6667 20.241 26.6667 20.6243 26.4417L25.2077 23.7917C25.591 23.5667 25.8327 23.1584 25.8327 22.7084V17.4167C25.8327 16.9667 25.591 16.5584 25.2077 16.3334ZM15.8327 22.4667V18.6167L19.166 20.55V24.3917L15.8327 22.4667ZM19.9993 19.1084L16.666 17.175L19.9993 15.25L23.3327 17.175L19.9993 19.1084ZM20.8327 24.3917V20.55L24.166 18.6167V22.4667L20.8327 24.3917ZM15.8327 11.6667H12.916C12.2243 11.6667 11.666 12.225 11.666 12.9167V15.8334H13.3327V13.3334H15.8327V11.6667ZM24.166 11.6667H27.0827C27.7743 11.6667 28.3327 12.225 28.3327 12.9167V15.8334H26.666V13.3334H24.166V11.6667ZM15.8327 28.3334H12.916C12.2243 28.3334 11.666 27.775 11.666 27.0834V24.1667H13.3327V26.6667H15.8327V28.3334ZM24.166 28.3334H27.0827C27.7743 28.3334 28.3327 27.775 28.3327 27.0834V24.1667H26.666V26.6667H24.166V28.3334Z" fill={hover ? "#FFFFFF" : "#686868"} /></g><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke={hover ? "#FFFFFF" : "#686868"} /><defs><clipPath id="clip0_1843_40316"><rect width="20" height="20" fill="white" transform="translate(10 10)" /></clipPath></defs></svg>,
      title: "Básico",
      sumary: "Listo para empezar",
      sign: "",
      cost: "Gratis",
      by: "",
      items: [
        {
          id: 1,
          name: "3 documentos de Lucichart editables",
        },
        {
          id: 2,
          name: "80 figuras por documentos de Lucidchart",
        },
        {
          id: 3,
          name: "100 plantillas",
        },
      ],
      btn1: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 1 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comprar ahora!
          </Button>
        </div>
      ),
      btn2: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="contained" color={hover === 1 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important", bgcolor: "#FFFFFF", color: ({ palette }) => palette.color.orange[700] }} size="large">
            ¡Comienza ahora!
          </Button>
        </div>
      ),
      btn3: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 1 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comunicate con ventas!
          </Button>
        </div>
      ),
    },
    {
      key: 2,
      ico: (hover) => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill={hover ? "transparent" : "#F2F2F2"} /><g clip-path="url(#clip0_1843_40338)"><path d="M20.0007 15C20.9211 15 21.6673 14.2538 21.6673 13.3334C21.6673 12.4129 20.9211 11.6667 20.0007 11.6667C19.0802 11.6667 18.334 12.4129 18.334 13.3334C18.334 14.2538 19.0802 15 20.0007 15Z" fill={hover ? "#FFFFFF" : "#686868"} /><path d="M23.2423 16.7584C22.9173 16.4334 22.359 15.8334 21.2757 15.8334C21.1007 15.8334 20.0923 15.8334 19.159 15.8334C16.8673 15.825 15.0007 13.9584 15.0007 11.6667H13.334C13.334 14.3 15.0923 16.5334 17.5007 17.2584V28.3334H19.1673V23.3334H20.834V28.3334H22.5007V18.375L25.7923 21.6667L26.9673 20.4917L23.2423 16.7584Z" fill={hover ? "#FFFFFF" : "#686868"} /></g><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke={hover ? "#FFFFFF" : "#686868"} /><defs><clipPath id="clip0_1843_40338"><rect width="20" height="20" fill="white" transform="translate(10 10)" /></clipPath></defs></svg>,
      title: "Individual",
      sumary: "Solo para ti",
      sign: "$",
      cost: "7.95",
      by: "/ Mes",
      items: [
        {
          id: 1,
          name: "Funciones del pago gratuito",
        },
        {
          id: 2,
          name: "Documentos editables ilimitados",
        },
        {
          id: 3,
          name: "Objetos ilimitados por documentos",
        },
        {
          id: 4,
          name: "1 GB de almacenamiento",
        },
        {
          id: 5,
          name: "Importar y exportar",
        },
      ],
      btn1: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 2 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comprar ahora!
          </Button>
        </div>
      ),
      btn2: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="contained" color={hover === 2 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important", bgcolor: "#FFFFFF", color: ({ palette }) => palette.color.orange[700] }} size="large">
            ¡Comienza ahora!
          </Button>
        </div>
      ),
      btn3: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 2 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comunicate con ventas!
          </Button>
        </div>
      ),
    },
    {
      key: 3,
      ico: (hover) => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill={hover ? "transparent" : "#F2F2F2"} /><g clip-path="url(#clip0_1843_40369)"><path d="M20 20.625C21.3583 20.625 22.5583 20.95 23.5333 21.375C24.4333 21.775 25 22.675 25 23.65V25H15V23.6583C15 22.675 15.5667 21.775 16.4667 21.3833C17.4417 20.95 18.6417 20.625 20 20.625ZM13.3333 20.8333C14.25 20.8333 15 20.0833 15 19.1667C15 18.25 14.25 17.5 13.3333 17.5C12.4167 17.5 11.6667 18.25 11.6667 19.1667C11.6667 20.0833 12.4167 20.8333 13.3333 20.8333ZM14.275 21.75C13.9667 21.7 13.6583 21.6667 13.3333 21.6667C12.5083 21.6667 11.725 21.8417 11.0167 22.15C10.4 22.4167 10 23.0167 10 23.6917V25H13.75V23.6583C13.75 22.9667 13.9417 22.3167 14.275 21.75ZM26.6667 20.8333C27.5833 20.8333 28.3333 20.0833 28.3333 19.1667C28.3333 18.25 27.5833 17.5 26.6667 17.5C25.75 17.5 25 18.25 25 19.1667C25 20.0833 25.75 20.8333 26.6667 20.8333ZM30 23.6917C30 23.0167 29.6 22.4167 28.9833 22.15C28.275 21.8417 27.4917 21.6667 26.6667 21.6667C26.3417 21.6667 26.0333 21.7 25.725 21.75C26.0583 22.3167 26.25 22.9667 26.25 23.6583V25H30V23.6917ZM20 15C21.3833 15 22.5 16.1167 22.5 17.5C22.5 18.8833 21.3833 20 20 20C18.6167 20 17.5 18.8833 17.5 17.5C17.5 16.1167 18.6167 15 20 15Z" fill={hover ? "#FFFFFF" : "#686868"} /></g><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke={hover ? "#FFFFFF" : "#686868"} /><defs><clipPath id="clip0_1843_40369"><rect width="20" height="20" fill="white" transform="translate(10 10)" /></clipPath></defs></svg>,
      title: "Básico",
      sumary: "Listo para empezar",
      sign: "$",
      cost: "9.00",
      by: "/ Usuario",
      items: [
        {
          id: 1,
          name: "Funciones del plan individual",
        },
        {
          id: 2,
          name: "Comentarios",
        },
        {
          id: 3,
          name: "Historial de revisiones con control de versiones",
        },
        {
          id: 4,
          name: "Compartir mi vista",
        },
      ],
      btn1: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 3 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comprar ahora!
          </Button>
        </div>
      ),
      btn2: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="contained" color={hover === 3 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important", bgcolor: "#FFFFFF", color: ({ palette }) => palette.color.orange[700] }} size="large">
            ¡Comienza ahora!
          </Button>
        </div>
      ),
      btn3: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 3 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comunicate con ventas!
          </Button>
        </div>
      ),
    },
    {
      key: 4,
      ico: (hover) => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill={hover ? "transparent" : "#F2F2F2"} /><g clip-path="url(#clip0_1843_40397)"><path d="M22.5 19.1667V14.1667L20 11.6667L17.5 14.1667V15.8334H12.5V27.5H27.5V19.1667H22.5ZM15.8333 25.8334H14.1667V24.1667H15.8333V25.8334ZM15.8333 22.5H14.1667V20.8334H15.8333V22.5ZM15.8333 19.1667H14.1667V17.5H15.8333V19.1667ZM20.8333 25.8334H19.1667V24.1667H20.8333V25.8334ZM20.8333 22.5H19.1667V20.8334H20.8333V22.5ZM20.8333 19.1667H19.1667V17.5H20.8333V19.1667ZM20.8333 15.8334H19.1667V14.1667H20.8333V15.8334ZM25.8333 25.8334H24.1667V24.1667H25.8333V25.8334ZM25.8333 22.5H24.1667V20.8334H25.8333V22.5Z" fill={hover ? "#FFFFFF" : "#686868"} /></g><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke={hover ? "#FFFFFF" : "#686868"} /><defs><clipPath id="clip0_1843_40397"><rect width="20" height="20" fill="#white" transform="translate(10 10)" /></clipPath></defs></svg>,
      title: "Básico",
      sumary: "Listo para empezar",
      sign: "$",
      cost: "18.25",
      by: "/ Usuario",
      items: [
        {
          id: 1,
          name: "Funciones del plan equipo",
        },
        {
          id: 2,
          name: "Acceso a Lucidchart para colaborar en una pizarra virtual",
        },
        {
          id: 3,
          name: "Estado del documento personalizable",
        }
      ],
      btn1: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 4 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comprar ahora!
          </Button>
        </div>
      ),
      btn2: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="contained" color={hover === 4 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important", bgcolor: "#FFFFFF", color: ({ palette }) => palette.color.orange[700] }} size="large">
            ¡Comienza ahora!
          </Button>
        </div>
      ),
      btn3: (
        <div className='mt-auto pt-2 hover:text-[#FFFFFF]'>
          <Button onClick={()=> setOpenPay(true)} variant="outlined" color={hover === 4 ? "inherit" : "primary"} fullWidth sx={{ transition: "0s !important" }} size="large">
            ¡Comunicate con ventas!
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Layout
      propsToolbar={{
        title: __(`${module}.header.title`),
        label: __(`${module}.header.sub-title`),
        code: null,
        btnLabel: null
      }}
    >

      <div className='text-center'>
        <Typography variant="display5" component="h1">
          ¡Unete a Quantto!
        </Typography>
        <Typography className='py-2 tracking-[13.5px] !text-[18px]' variant="heading3" component="h3">
          ADQUIERE UNO DE NUESTROS PLANES
        </Typography>
      </div>
      <div className='w-full py-4 my-4'>
        <Grid container spacing={2}>
          {map(listplans, ({ key, ...item }) => (
            <Grid item xs={6} lg={3}>
              <Paper
                className={`w-full h-full p-4 !rounded-lg flex flex-col cursor-pointer hover:text-[#FFFFFF]`}
                sx={{ transition: "0.3s", bgcolor: ({ palette }) => hover === key ? palette.color.orange[700] : "#FFFFFF" }}
                component="div"
                onMouseLeave={() => setHover(null)}
                onMouseOver={() => setHover(key)}
              >
                <div className='min-h-[170px] flex flex-col'>
                  <div className='flex flex-row flex-1'>
                    <div className='h-[40px] w-[40px]'>
                      {item?.ico(hover === key)}
                    </div>
                    <div className='flex flex-col pl-4'>
                      <div>{get(item, "title")}</div>
                      <div>{get(item, "sumary")}</div>
                    </div>
                  </div>
                  <div className='py-2 text-[32px] leading-1 flex flex-row items-center'>
                    {get(item, "sign")}
                    {get(item, "cost")}
                    {<div className={`text-[16px] text-[${hover === key ? "#FFFFFF" : "#686868"}]`}>{get(item, "by", "")}</div>}
                  </div>
                </div>
                <hr />
                <div className='py-4'>
                  <div>Incluye:</div>
                  <ol>
                    {map(get(item, "items", []), ({ id, name }) => (
                      <li>
                        <div className='flex flex-row'>
                          <IcoCheck hover={hover === key} />
                          <div className='pl-2'>{name}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className='mt-auto pt-4 h-[130px] flex flex-col justify-start'>
                  {hover !== key && get(item, "btn1")}
                  {hover === key && get(item, "btn2")}
                  {hover === key && get(item, "btn3")}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {openPay &&
          <Paying
            open={openPay}
            setOpen={setOpenPay}
            __={__}
          module={module}
          // inventaryId={detailId}
          // setError={setError}
          // setSuccess={setSuccess}
          // getData={() => getData({ page: 1, filterSearch })}
          // closeAlert={closeAlert}
          // onDetail={true}
          // setIsLoading={setLoadToPay}
          />
        }
      </div>
    </Layout>
  )
}

export default PaymentHistory;