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

import CloseSession from "../../../assets/icons/CloseSession"
import Layout from "../../../components/layout/Layout";
import validator from "./validator";

import { logout } from "../../../store/auth/thunk/logout"

const Profile = () => {
  const dispatch = useDispatch();
  const [__, i18n] = useTranslation("auth");

  const [showPass, setShowPass] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dataUser = useSelector(state => state.auth.login.dataUser);

  const inputs = __('profile.input', { returnObjects: true })
  const sections = __('profile.section', { returnObjects: true })

  const handleClickShowPassword = () => {
    setShowPass(state => !state)
  }

  const onHeadBtn = () => {
    let selectLanguage = "es";
    if (i18n.resolvedLanguage === "es") {
      selectLanguage = "en"
    }
    i18n.changeLanguage(selectLanguage);
    localStorage.setItem("lang", selectLanguage)
  }

  const formik = useFormik({
    initialValues: {
      name: get(dataUser, "username"),
      email: get(dataUser, "email"),
      company: get(dataUser, "companyName"),
      password: "",
      confirmation: "",
    },
    validationSchema: validator(inputs),
    onSubmit: (values) => {
    }
  });

  const onEdit = () => {
    if (!isEdit) {
      setIsEdit(true)
    }
  }
  const onLogout = () => {
    dispatch(logout())
    // navigate("/login")
  }

  const short = (text) => {
    return (upperCase(join(slice(map(words(text), (w) => get(w, "[0]")), 0, 2), "")))
  }

  return (
    <Layout
      propsToolbar={{
        title: __("profile.name"),
        label: __("profile.sub-title-1"),
        code: null,
        btnLabel: __("profile.button.language"),
        btnFunc: onHeadBtn,
      }}
    >
      <Box>
        <Paper className='flex justify-between items-center py-6 px-8 w-full mb-6' elevation={3}  >
          <Box className='flex'>
            <Avatar alt={short(get(dataUser, "username"))} src={"/"} sx={{ height: 80, width: 80 }} >{short(get(dataUser, "username"))}</Avatar>
            <Box className='pl-8'>
              <Typography variant="buttonXtra">{get(dataUser, "username", "- -")}</Typography>
              <Box className='flex'>
                <Typography variant="bodyLarge">{get(dataUser, "email", "- -")}</Typography>
                <Typography className='px-2' variant="bodyLarge" color="text.slite">|</Typography>
                <Typography variant="bodyLarge">{get(dataUser, "companyName", "- -")}</Typography>
              </Box>
            </Box>
          </Box>
          <Button color="primary" startIcon={<CloseSession />} onClick={onLogout}>
            <Typography variant="buttonMedium" >{__("profile.button.logout")}</Typography>
          </Button>
        </Paper>

        <Paper className='w-full mb-8' elevation={3} >
          <Box component="form" onSubmit={get(formik, "handleSubmit")}>
            <Box className='py-6 px-8 w-full'>

              <Typography className='pb-4' component={Box} variant="buttonXtra">Detalle de perfil</Typography>

              <Typography className='py-3' component={Box} variant="bodySmall">{get(sections, "[0]")}</Typography>
              <Divider />

              <Grid className='pt-4' container spacing={3}>
                <Grid item xs={6} md={4}>
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
                <Grid item xs={6} md={4}>
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
                        disabled={!isEdit}
                      />
                    </FormControl>
                  </Box>
                </Grid>
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
                        disabled={!isEdit}
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
                          type={showPass ? 'text' : 'confirmation'}
                          value={get(formik, "values.confirmation")}
                          onChange={get(formik, "handleChange")}
                          error={get(formik, "touched.confirmation") && Boolean(get(formik, "errors.confirmation"))}
                          helperText={get(formik, "touched.confirmation") && get(formik, "errors.confirmation")}
                          InputProps={{
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
                    {__("profile.button.cancel")}
                  </Button>
                </Box>
              </Fade>
              {isEdit
                ? (
                  <Button
                    color={"success"}
                    variant="contained"
                    type="submit"
                    size='large'
                    startIcon={<LockOpenIcon />}
                  >
                    {__("profile.button.is-edit")}
                  </Button>
                ) : (
                  <Button
                    color={"primary"}
                    variant="contained"
                    type="button"
                    onClick={onEdit}
                    size='large'
                    startIcon={<LockIcon />}
                  >
                    {__("profile.button.name")}
                  </Button>
                )}
            </Box>

          </Box>
        </Paper>
      </Box >
    </Layout >
  )
}

export default Profile