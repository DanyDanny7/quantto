import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { get } from "lodash";

import Layout from "../../../components/layout/Layout";

const Profile = () => {
  const [__, i18n] = useTranslation("global");

  const onHeadBtn = () => {
    let selectLanguage = "es";
    if (i18n.resolvedLanguage === "es") {
      selectLanguage = "en"
    }
    i18n.changeLanguage(selectLanguage);
    localStorage.setItem("lang", selectLanguage)
  }

  return (
    <Layout
      propsToolbar={{
        title: get(__('layout.menus', { returnObjects: true }), "[4]"),
        code: null,
        btnLabel: __('change'),
        btnFunc: onHeadBtn,
      }}
    >
      <Typography variant='body1'>
        {get(__('layout.menus', { returnObjects: true }), "[4]")}
      </Typography>
    </Layout>
  )
}

export default Profile