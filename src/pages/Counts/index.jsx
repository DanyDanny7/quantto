import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { get } from "lodash";

import Layout from "../../components/layout/Layout"

const Counts = () => {
  const [__] = useTranslation("global");

  return (
    <Layout
      propsToolbar={{
        title: get(__('layout.menus', { returnObjects: true }), "[2]"),
        code: null,
        btnLabel: __('header.btn-1')
      }}
    >
      <Typography variant='body1'>
        {get(__('layout.menus', { returnObjects: true }), "[2]")}
      </Typography>
    </Layout>
  )
}

export default Counts