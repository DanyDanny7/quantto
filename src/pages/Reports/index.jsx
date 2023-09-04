/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import {
    Divider,
    Button,
    Box,
    Paper,
    ButtonGroup,
    Tabs,
    Tab
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import get from "lodash/get"

import Layout from "../../components/layout/Layout"
import StockProducts from "./StockProducts"
import InventoryMovements from "./InventoryMovements"
import InMovements from "./InMovements"
import OutMovements from "./OutMovements"

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
    const [__] = useTranslation("repo");
    const location = useLocation();
    const navigate = useNavigate();

    const module = get(get(location, "pathname")?.split("/"), "[2]", "stockProducts");
    const [btnFunc, setBtnFunc] = useState(() => { });
    const [value, setValue] = useState(0);

    const changeTab = (tab) => () => {
        navigate(`/report/${tab}`)
    }

    const handleChange = (a, b) => {
        setValue(b)
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
                        <Button className='whitespace-nowrap' variant={module === "stockProducts" ? "contained" : "outlined"} onClick={changeTab("stockProducts")}>{__(`menu.stockProducts`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "inventoryMovements" ? "contained" : "outlined"} onClick={changeTab("inventoryMovements")}>{__(`menu.inventoryMovements`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "inMovements" ? "contained" : "outlined"} onClick={changeTab("inMovements")}>{__(`menu.inMovements`)}</Button>
                        <Button className='whitespace-nowrap' variant={module === "outMovements" ? "contained" : "outlined"} onClick={changeTab("outMovements")}>{__(`menu.outMovements`)}</Button>
                    </ButtonGroup>
                </div>
                <Divider />
                <div>
                    <CustomTabPanel value={module} index={"stockProducts"}>
                        <StockProducts setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"inventoryMovements"}>
                        <InventoryMovements setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"inMovements"}>
                        <InMovements setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                    <CustomTabPanel value={module} index={"outMovements"}>
                        <OutMovements setBtnFunc={setBtnFunc} />
                    </CustomTabPanel>
                </div>
            </Paper>
        </Layout>
    )
}

export default Config;