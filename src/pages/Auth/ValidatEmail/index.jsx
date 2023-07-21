/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get, replace } from "lodash"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";

import Layout from "../../../components/layout/Layout";
import ValidateEmail from "../../../assets/icons/ValidateEmail"
import Quanto from "../../../assets/icons/Quanto"
import Notification from "../../../components/form/Notification";

import { getValidateEmailRequest } from "../../../store/auth/actions/getValidateResend"
import { postValidateEmail } from "../../../store/auth/thunk/validate-email"

const Profile = () => {
  const [__] = useTranslation("auth");
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

  const auth = useSelector(state => state.auth.login);
  const getState = useSelector(state => state);

  const [showNoti, setShowNoti] = useState({ open: false, variant: "", msg: "" })

  if (get(auth, "userState.active") === "True") {
    setIsActive(true)
  }

  const validateToken = (token) => {
    dispatch(postValidateEmail({ token }))
  }

  useEffect(() => {
    const search = window.location.search
    const p = new URLSearchParams(search);
    const token = p.get("token")

    if (!!token) {
      validateToken(token)
    }
  }, [])

  const handleClick = () => {
    getValidateEmailRequest({}, () => getState)
      .then(({ data }) => {
        setShowNoti({ open: true, msg: replace(__("validate_email.resend"), "[[email]]", get(auth, "userState.email")), variant: "success" })
        setIsActive(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Layout disableLayout={!get(auth, "isLogged", false)} propsToolbar={{ title: __("validate_email.name") }}>
      <Box className='flex flex-1 flex-col justify-center items-center'>
        {isActive
          ? (
            <>
              <Quanto className="mb-0" style={{ height: 147, width: 500 }} />
              <Typography variant="heading2" gutterBottom>{__('validate_email.isActive.active')}</Typography>
              <Typography variant="bodyMedium">{__('validate_email.isActive.description')}</Typography>
              <Box className='my-14'>
                <Button component={Link} to={__('validate_email.isActive.to')} variant="contained" color="primary" >{__('validate_email.isActive.btn')}</Button>
              </Box>
            </>
          ) : (
            <>
              <ValidateEmail className="mb-12" style={{ height: 147, width: 256 }} />
              <Typography variant="heading2" gutterBottom>{__('validate_email.title')}</Typography>
              <Typography variant="bodyMedium">{__('validate_email.sub-title-1')}</Typography>
              <Box className='my-14'>
                <Button onClick={handleClick} variant="contained" color="primary" >{__('validate_email.button.name')}</Button>
              </Box>
            </>
          )}
        <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
      </Box >
    </Layout >
  )
}

export default Profile
