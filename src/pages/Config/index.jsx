/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {
    Divider,
    Button,
    Box,
    Paper,
    ButtonGroup
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import get from "lodash/get"

import Layout from "../../components/layout/Layout"
import Uom from "./Uom"
import Category from "./Category"
import SubCategories from "./SubCategory"
import StateProducts from "./StateProducts"
import InBoundType from "./InBoundType"
import OutBoundType from "./OutBoundType"

const CustomTabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ py: 2 }}>
                {children}
            </Box>
        )}
    </div>
);

const Config = () => {
    const [__] = useTranslation("conf");
    const location = useLocation();
    const navigate = useNavigate();

    const module = get(get(location, "pathname")?.split("/"), "[2]", "uom");
    const [btnFunc, setBtnFunc] = useState(() => { });

    const changeTab = (tab) => () => {
        navigate(`/config/${tab}`)
    }

    return (
        <Layout
            propsToolbar={{
                title: __(`${module}.header.title`),
                label: __(`${module}.header.subTitle`),
                code: null,
                btnLabel: __(`${module}.btn`),
                btnFunc: btnFunc,
                color: "primary",
            }}
        >
            <Paper id="details" className='mt-8' >
                <div className='p-4 overflow-auto'>
                    <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group" disableElevation>
                        <Button className='whitespace-nowrap' variant={module === "uom" ? "contained" : "outlined"} onClick={changeTab("uom")}>{__(`menu.uom`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "category" ? "contained" : "outlined"} onClick={changeTab("category")}>{__(`menu.category`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "subCategory" ? "contained" : "outlined"} onClick={changeTab("subCategory")}>{__(`menu.subCategory`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "stateProducts" ? "contained" : "outlined"} onClick={changeTab("stateProducts")}>{__(`menu.stateProducts`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "inBoundType" ? "contained" : "outlined"} onClick={changeTab("inBoundType")}>{__(`menu.inBoundType`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "outBoundType" ? "contained" : "outlined"} onClick={changeTab("outBoundType")}>{__(`menu.outBoundType`)}</Button>
                    </ButtonGroup>
                </div>
                <Divider />
                <div>
                    <CustomTabPanel value={module} index={"uom"}>
                        <Uom setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"category"}>
                        <Category setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"subCategory"}>
                        <SubCategories setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"stateProducts"}>
                        <StateProducts setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"inBoundType"}>
                        <InBoundType setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"outBoundType"}>
                        <OutBoundType setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                </div>
            </Paper>
        </Layout>
    )
}

export default Config;