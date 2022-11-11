import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";



import Layout from "../../../components/layout/Layout";
import ValidateEmail from "../../../assets/icons/ValidateEmail"

// import { logout } from "../../../store/thunk/auth/logout"


const Profile = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [__] = useTranslation("auth");


  const handleClick = () => {

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
      </Box >
    </Layout >
  )
}

export default Profile