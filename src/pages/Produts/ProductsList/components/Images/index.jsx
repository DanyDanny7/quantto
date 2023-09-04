/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import { useParams, useNavigate } from 'react-router-dom';
import {
  // Pagination,
  // Stack,
  IconButton,
  Stack,
  Box,
  Modal,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoadingButton } from '@mui/lab';

import Notification from "../../../../../components/form/Notification";
import Alert from "../../../../../components/form/Alert";
import Load from "../../../../../components/form/Load"
// import Modal from "./components/Modal";
import AlertDelete from "../../../../../components/form/AlertQuestion";
import { SampleNextArrow, SamplePrevArrow } from "./Arrows"

import { getListProduct } from "../../../../../store/product/thunk/productlist/get"
import { postImgProductRequest } from "../../../../../store/product/actions/productimg/post"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  height: "80vw",
  maxWidth: "80vw !important",
  maxHeight: "80vh !important",
  bgcolor: 'black',
  boxShadow: 24,
  overflow: "hidden"
};

const ProductsList = ({ list, loading, getData, setBtnFunc }) => {
  const [__] = useTranslation("prod");
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [filterSearch, setFilterSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDelete, setAlertDelete] = useState({ open: false, title: "", subtitle: "" })
  const [loadDelete, setLoadDelete] = useState(false);
  // const [edit, setEdit] = useState({ item: {}, value: false });
  const [selected, setSelected] = useState(null);
  const [preparePt, setPreparePt] = useState([])
  const [open, setOpen] = useState(false);
  const [pictShow, setPictShow] = useState(null);
  const [loadPhoto, setLoadPhoto] = useState(false);
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

  const { id } = useParams();

  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState({})

  const module = "list"
  const titles = __(`${module}.table`, { returnObjects: true })

  // const product = useSelector(state => state.product.product);
  const userState = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  // const getData = ({ page, filterSearch }) => {
  //   const filters = { page, ...(!!filterSearch && { search: filterSearch }) }
  //   dispatch(getListProduct(filters))
  // }

  useEffect(() => {
    setPreparePt(list)
  }, [list.length])


  // useEffect(() => {
  //   getData({ page: 1, filterSearch })
  // }, [dispatch, filterSearch])

  // const onChangePagination = (e, page) => {
  //   getData({ page, filterSearch })
  // }

  // const onDetail = () => { closePoop(); navegate(toString(get(selected, "inventoryId"))) }
  // const onEdit = () => {
  //   setEdit({ item: selected, value: true });
  //   closePoop()
  // }
  const onDelete = (element) => () => {
    setSelected(element)
    closePoop()
    onDeleteConfirm()
  }

  const closePoop = () => {
    setAnchorEl(null);
  };

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
      id: selected
    }
    setLoadDelete(true)
    // deleteInventaryRequest(body, () => getState)
    //   .then(({ data }) => {
    setTimeout(() => {
      const msg = __(`${module}.actions.delete.success`);
      setShowNoti({ open: true, msg, variant: "success" })
      setSelected(null)
      getData()
      setLoadDelete(false)
    }, 3000);
    //   })
    //   .catch((err) => { setError(err); setLoadDelete(false) })
  }
  const onDeleteCancel = () => {
    setAlertDelete({ open: false, title: "", subtitle: "" })
  }

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleOpen = (pict) => () => { setOpen(true); setPictShow(pict) };
  const handleClose = () => { setOpen(false); setPictShow(null) };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]

    if (isEmpty(file)) {
      const body = {
        language: localStorage.getItem("lang"),
        userid: get(userState, "userId"),
        companyid: Number(get(userState, "companyId")),
        imagen: file,
        itemId: id,
      }

      const formData = new FormData();
      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          if (!!body[key]) {
            formData.append(`${key}`, body[key])
          }
        }
      }
      setLoadPhoto(true)
      await postImgProductRequest(body, () => getState)
        .then(({ data }) => {
          setLoadPhoto(false);
          getData();
          setShowNoti({ open: true, msg: __(`${module}.msg.image.create`), variant: "success", action: "post" })
        })
        .catch((err) => { setError(err.response.data); setLoadPhoto(false) })
    }
  }

  useEffect(() => {
    setBtnFunc(
      <LoadingButton className='whitespace-nowrap' color="primary" variant="contained" component="label" onChange={uploadPhoto} loading={loadPhoto}>
        {__(`${module}.actions.add`)}
        <input type="file" hidden />
      </LoadingButton>
    )
  }, [])

  return (
    <div>
      <div className='min-h-[300px] h-[300px] w-full px-10'>
        {loading
          ? <Load height={300} />
          : <Box className='w-full'>

            {isEmpty(preparePt)
              ? <Load >
                <Stack justifyContent="center" alignItems="center" spacing={1}  >
                  <Typography variant="heading2">{__(`${module}.empty.image.title`)}</Typography>
                  <Typography variant="bodySmall">{__(`${module}.empty.image.description`)}</Typography>
                </Stack>
              </Load>
              : <Slider {...settings}>
                {preparePt.map(({ id, url }, i) => (
                  <div key={id} className='p-2 h-[250px] !w-full !max-w-[250px] min-w-[100px] relative'>
                    <img className='rounded-md object-contain w-full h-full' alt={`img_${id}`} src={url} />
                    <Stack className='absolute top-[15px] right-[15px]' direction="row" color="white" spacing={1}>
                      <IconButton aria-label="show" size="small" color="inherit" sx={{ bgcolor: "rgba(0,0,0,0.5)", ":hover": { bgcolor: "rgba(0,0,0,0.8)", } }} onClick={handleOpen(url)}>
                        <RemoveRedEyeIcon fontSize="inherit" color="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" color="inherit" sx={{ bgcolor: "rgba(0,0,0,0.5)", ":hover": { bgcolor: "rgba(0,0,0,0.8)", } }} onClick={onDelete(id)}>
                        <DeleteOutlineIcon fontSize="inherit" color="inherit" />
                      </IconButton>
                    </Stack>
                  </div>
                ))}
              </Slider>
            }
          </Box>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-img-product"
        aria-describedby="modal-img-product"
      >
        <Box sx={style}>
          <div className='relative w-full'>
            {!!pictShow &&
              <IconButton className='!absolute top-[5px] right-[5px]' aria-label="close" size="small" color="inherit" sx={{ bgcolor: "rgba(255,255,255,0.5)", color: "black", ":hover": { bgcolor: "rgba(255,255,255,0.8)", } }} onClick={handleClose}>
                <CloseIcon fontSize="inherit" color="inherit" />
              </IconButton>
            }
          </div>
          {!!pictShow && <img className='rounded-md object-contain w-full h-full' alt={`modal_pict`} src={pictShow} />}
        </Box>
      </Modal>
      <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      <AlertDelete
        title={alertDelete.title}
        subtitle={alertDelete.subtitle}
        cancel={{ label: __(`${module}.actions.cancel`), func: onDeleteCancel }}
        submit={{ label: __(`${module}.actions.deleteImage.title`), func: onDeleteElement }}
        openAlert={alertDelete.open}
        loading={loadDelete}
      />
      <Alert
        title={get(alert, "title")}
        subtitle={get(alert, "subtitle")}
        btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
        btn2={{ label: get(alert, "btn2", ""), func: get(alert, "func2", () => { }) }}
        type={get(alert, "type")}
        openAlert={get(alert, "open")}
        closeAlert={closeAlert}
      />
    </div>
  )
}

export default ProductsList;