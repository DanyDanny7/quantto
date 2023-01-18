/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get } from "lodash"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import Layout from "../../../components/layout/Layout";
import ValidateEmail from "../../../assets/icons/ValidateEmail"
import Notification from "../../../components/form/Notification";

// import { postValidateEmailRequest } from "../../../store/auth/actions/postValidate"
import { postValidateEmail } from "../../../store/auth/thunk/validate-email"

const Profile = () => {
  const [__] = useTranslation("auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector(state => state.auth.login.dataUser);
  // const navegate = useNavigate();
  const [showNoti, setShowNoti] = useState({ open: false, variant: "", msg: "" })

  if (get(userState, "active") === "True") {
    navigate("/")
  }

  // const onFocus = () => {
  //   var answer = window.confirm("Esto se detonará al hacer foco de nuevo. y acá me falta endpoint con respuesta identica a login para refrescar la data interna y saber que ya se validó, pendiente back");
  //   if (answer) {
  //     navegate("/profile")
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('focus', onFocus);
  //   return () => {
  //     window.removeEventListener('focus', onFocus);
  //   };
  // }, [])


  const validateToken = (token) => {
    dispatch(postValidateEmail({ token }))
  }

  useEffect(() => {
    const search = window.location.search
    const p = new URLSearchParams(search);
    const token = p.get("token")

    if (!!token) {
      validateToken(token)
      console.log(token)
    }
  }, [])


  const handleClick = () => {
    //   postValidateEmailRequest({}, () => getState)
    //     .then(({ data }) => {
    //       setShowNoti({ open: true, msg: replace(__("validate_email.resend"), "[[email]]", get(userState, "email")), variant: "success" })
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
  }

  return (
    <Layout propsToolbar={{ title: __("validate_email.name") }}>
      <Box className='flex flex-1 flex-col justify-center items-center'>
        <ValidateEmail className="mb-12" style={{ height: 147, width: 256 }} />
        <Typography variant="heading2" gutterBottom>{__('validate_email.title')}</Typography>
        <Typography variant="bodyMedium">{__('validate_email.sub-title-1')}</Typography>
        <Box className='my-14'>
          <Button onClick={handleClick} variant="contained" color="primary" >{__('validate_email.button.name')}</Button>
        </Box>
        <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      </Box >
    </Layout >
  )
}

export default Profile
