import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  IconButton,
  Paper,
  Avatar,
  Grid,
  Fade
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import { get, words, map, join, upperCase, slice } from "lodash";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from '@mui/lab';

import CloseSession from "../../../assets/icons/CloseSession"
import Layout from "../../../components/layout/Layout";
import validator from "./validator";
import Notification from "../../../components/form/Notification";
import BtnLanguage from "../../../components/form/BtnLanguage";
import Alert from "../../../components/form/Alert";

import { logout } from "../../../store/auth/thunk/logout";
import { putProfileRequest } from "../../../store/auth/actions/putProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const [__, i18n] = useTranslation("auth");

  const [showPass, setShowPass] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" });
  const [alert, setAlert] = useState({ open: false, title: "", subtitle: "", type: "" })

  const dataUser = useSelector(state => state.auth.login.dataUser);
  const getState = useSelector(state => state);

  const module = "profile"
  const inputs = __(`${module}.input`, { returnObjects: true })
  const sections = __(`${module}.section`, { returnObjects: true })

  const handleClickShowPassword = () => {
    setShowPass(state => !state)
  }

  const onHeadBtn = (lang) => {
    let selectLanguage = lang;
    i18n.changeLanguage(selectLanguage);
    localStorage.setItem("lang", selectLanguage)
  }

  const closeAlert = () => {
    setAlert({ open: false, title: "", subtitle: "", type: "", btn: "" })
  }


  const setError = (err) => {
    if (!!get(err, "response.data") && (get(err, "response.status") !== 500)) {
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

  const formik = useFormik({
    initialValues: {
      name: get(dataUser, "username"),
      // phone: get(dataUser, "phone"),
      email: get(dataUser, "email"),
      company: get(dataUser, "companyname"),
      password: "",
      confirmation: "",
    },
    validationSchema: validator(inputs),
    onSubmit: (values) => {
      const body = {
        companyid: Number(get(dataUser, "companyId")),
        // phone: get(values, "phone"),
        username: get(values, "name"),
        language: i18n.resolvedLanguage,
        userid: get(dataUser, "userId"),
        ...(!!get(values, "password") && { pass: get(values, "password") }),
      }

      if (isEdit) {
        setLoadingEdit(true)
        putProfileRequest(body, () => getState)
          .then(({ data }) => {
            setShowNoti({ open: true, msg: __(`${module}.msg.update`), variant: "success" })
            setLoadingEdit(false)
          })
          .catch((err) => { setError(err); setLoadingEdit(false) })
      }
    }
  });

  const onEdit = () => {
    if (!isEdit) {
      setIsEdit(true)
    }
  }
  const onLogout = () => {
    const body = {
      companyid: Number(get(dataUser, "companyId")),
      userid: get(dataUser, "userId"),
      language: localStorage.getItem("lang"),
    }
    dispatch(logout(body))
  }

  const short = (text) => {
    return (upperCase(join(slice(map(words(text), (w) => get(w, "[0]")), 0, 2), "")))
  }

  return (
    <Layout propsToolbar={{ customBtn: <BtnLanguage active={i18n.resolvedLanguage} onClickEn={onHeadBtn} onClickEs={onHeadBtn} /> }}    >
      <Box>
        <Paper className='flex justify-between items-center py-6 px-8 w-full mb-6' elevation={3}  >
          <Box className='flex'>
            <Avatar alt={short(get(dataUser, "username"))} src={"/"} sx={{ height: 80, width: 80 }} >{short(get(dataUser, "username"))}</Avatar>
            <Box className='pl-8'>
              <Typography variant="buttonXtra">{get(dataUser, "username", "- -")}</Typography>
              <Box className='flex'>
                <Typography variant="bodyLarge">{get(dataUser, "email", "- -")}</Typography>
                <Typography className='px-2' variant="bodyLarge" color="text.slite">|</Typography>
                <Typography variant="bodyLarge">{get(dataUser, "companyname", "- -")}</Typography>
              </Box>
            </Box>
          </Box>
          <Button color="primary" startIcon={<CloseSession />} onClick={onLogout}>
            <Typography variant="buttonMedium" >{__(`${module}.button.logout`)}</Typography>
          </Button>
        </Paper>
        <Paper className='w-full mb-8' elevation={3} >
          <Box component="form" onSubmit={get(formik, "handleSubmit")}>
            <Box className='py-6 px-8 w-full'>

              <Typography className='pb-4' component={Box} variant="buttonXtra">{__(`${module}.title`)}</Typography>

              <Typography className='py-3' component={Box} variant="bodySmall">{get(sections, "[0]")}</Typography>
              <Divider />

              <Grid className='pt-4' container spacing={3}>
                <Grid item xs={6} md={6}>
                  <Box className='mb-8'>
                    <FormControl fullWidth >
                      <Typography className='pb-2' component="label" htmlFor="email" >
                        {get(inputs, "[2].name")}
                      </Typography>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        placeholder={get(inputs, "[2].placeholder")}
                        value={get(formik, "values.email")}
                        onChange={get(formik, "handleChange")}
                        error={get(formik, "touched.email") && Boolean(get(formik, "errors.email"))}
                        helperText={get(formik, "touched.email") && get(formik, "errors.email")}
                        // disabled={!isEdit}
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box className='mb-8'>
                    <FormControl fullWidth  >
                      <Typography className='pb-2' component="label" htmlFor="name" >
                        {get(inputs, "[0].name")}
                      </Typography>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        placeholder={get(inputs, "[0].placeholder")}
                        value={get(formik, "values.name")}
                        onChange={get(formik, "handleChange")}
                        error={get(formik, "touched.name") && Boolean(get(formik, "errors.name"))}
                        helperText={get(formik, "touched.name") && get(formik, "errors.name")}
                        disabled={!isEdit}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                {/* <Grid item xs={6} md={4}>
                  <Box className='mb-8'>
                    <FormControl fullWidth  >
                      <Typography className='pb-2' component="label" htmlFor="phone" >
                        {get(inputs, "[5].name")}
                      </Typography>
                      <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        placeholder={get(inputs, "[5].placeholder")}
                        value={get(formik, "values.phone")}
                        onChange={get(formik, "handleChange")}
                        error={get(formik, "touched.phone") && Boolean(get(formik, "errors.phone"))}
                        helperText={get(formik, "touched.phone") && get(formik, "errors.phone")}
                        disabled={!isEdit}
                      />
                    </FormControl>
                  </Box>
                </Grid> */}
              </Grid>

              <Typography className='py-3' component={Box} variant="bodySmall">{get(sections, "[1]")}</Typography>
              <Divider />

              <Grid className='pt-4' container spacing={3}>
                <Grid item xs={6} md={4}>
                  <Box className='mb-8'>
                    <FormControl fullWidth >
                      <Typography className='pb-2' component="label" htmlFor="company" >
                        {get(inputs, "[1].name")}
                      </Typography>
                      <TextField
                        fullWidth
                        id="company"
                        name="company"
                        placeholder={get(inputs, "[1].placeholder")}
                        value={get(formik, "values.company")}
                        onChange={get(formik, "handleChange")}
                        error={get(formik, "touched.company") && Boolean(get(formik, "errors.company"))}
                        helperText={get(formik, "touched.company") && get(formik, "errors.company")}
                        // disabled={!isEdit}
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <Typography className='py-3' component={Box} variant="bodySmall">{get(sections, "[2]")}</Typography>
              <Divider />

              <Grid className='pt-4' container spacing={3}>
                <Grid item xs={6} md={4}>
                  <Box className='mb-8'>
                    <FormControl fullWidth >
                      <Typography className='pb-2' component="label" htmlFor="password" >
                        {get(inputs, "[3].name")}
                      </Typography>
                      <TextField
                        id="password"
                        name="password"
                        placeholder={get(inputs, "[3].placeholder")}
                        type={showPass ? 'text' : 'password'}
                        value={get(formik, "values.password")}
                        onChange={get(formik, "handleChange")}
                        error={get(formik, "touched.password") && Boolean(get(formik, "errors.password"))}
                        helperText={get(formik, "touched.password") && get(formik, "errors.password")}
                        disabled={!isEdit}
                        InputProps={{
                          autoComplete: 'new-password',
                          endAdornment:
                            <InputAdornment position="end" className='mr-2'>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                disabled={!isEdit}
                              >
                                {showPass ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Fade in={isEdit}>
                    <Box className='mb-8'>
                      <FormControl fullWidth >
                        <Typography className='pb-2' component="label" htmlFor="password" >
                          {get(inputs, "[4].name")}
                        </Typography>
                        <TextField
                          id="confirmation"
                          name="confirmation"
                          placeholder={get(inputs, "[4].placeholder")}
                          type={showPass ? 'text' : 'password'}
                          value={get(formik, "values.confirmation")}
                          onChange={get(formik, "handleChange")}
                          error={get(formik, "touched.confirmation") && Boolean(get(formik, "errors.confirmation"))}
                          helperText={get(formik, "touched.confirmation") && get(formik, "errors.confirmation")}
                          InputProps={{
                            autoComplete: 'new-password',
                            endAdornment:
                              <InputAdornment position="end" className='mr-2'>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleClickShowPassword}
                                  edge="end"
                                  disabled={!isEdit}
                                >
                                  {showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Fade>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box className='p-10 w-full flex justify-end'>
              <Fade in={isEdit}>
                <Box className='mr-6'>
                  <Button
                    variant="text"
                    type="button"
                    size='large'
                    onClick={() => setIsEdit(false)}
                    sx={{ color: "text.main" }}
                  >
                    {__(`${module}.button.cancel`)}
                  </Button>
                </Box>
              </Fade>
              {isEdit
                ? (
                  <LoadingButton
                    color={"success"}
                    variant="contained"
                    type="submit"
                    size='large'
                    startIcon={<LockOpenIcon />}
                    loading={loadingEdit}
                  >
                    {__(`${module}.button.is-edit`)}
                  </LoadingButton>
                ) : (
                  <Button
                    color={"primary"}
                    variant="contained"
                    type="button"
                    onClick={onEdit}
                    size='large'
                    startIcon={<LockIcon />}
                  >
                    {__(`${module}.button.name`)}
                  </Button>
                )}
            </Box>

          </Box>
        </Paper>
        <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        <Alert
          title={get(alert, "title")}
          subtitle={get(alert, "subtitle")}
          btn1={{ label: get(alert, "btn"), func: get(alert, "func") }}
          btn2={{ label: get(alert, "btn2", ""), func: get(alert, "func2", () => { }) }}
          type={get(alert, "type")}
          openAlert={get(alert, "open")}
          closeAlert={closeAlert}
        />
      </Box >
    </Layout >
  )
}

export default Profile