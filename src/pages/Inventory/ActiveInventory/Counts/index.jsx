import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Divider,
    IconButton,
    Typography,
    MenuList,
    MenuItem,
    Popover,
    Checkbox
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import Layout from "../../../../components/layout/Layout"
import Table from "../../../../components/form/Table";
import Notification from "../../../../components/form/Notification";
import Toolbar from "./components/Toolbar"

function createData(id, create_at, hour, product, count, location, quantity) {
    return { id, create_at, hour, product, count, location, quantity };
}

const rows = [
    createData("1", '09/08/22', "10:00 AM", "Nombre 1", "Nombre Apellido", "Almacen 1", 2834),
    createData("2", '09/08/22', "10:00 AM", "Nombre 1", "Nombre Apellido", "Almacen 1", 2834),
    createData("3", '09/08/22', "10:00 AM", "Nombre 1", "Nombre Apellido", "Almacen 1", 2834),
    createData("4", '09/08/22', "10:00 AM", "Nombre 1", "Nombre Apellido", "Almacen 1", 2834),
    createData("5", '09/08/22', "10:00 AM", "Nombre 1", "Nombre Apellido", "Almacen 1", 2834),
];

const ActiveInventory = () => {
    const theme = useTheme();
    const [__] = useTranslation("inve");
    const module = "counts"
    const code = "#Asq937614"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selected, setSelected] = React.useState([]);
    const [showNoti, setShowNoti] = React.useState({ open: false, msg: "", variant: "" });

    const titles = __(`${module}.table`, { returnObjects: true });


    //  --------- Tabla -------------

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        setShowNoti({ open: open, msg: __(`${module}.menu.delete-success`), variant: "success" })
        handleClose()
    }

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1
    }

    const handleChecked = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const headTable = [
        {
            key: "checkbox",
            label: (
                <Checkbox
                    color="secondary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                        'aria-label': 'select all desserts',
                    }}
                />
            ),
            align: "center",
            width: 70,
        },
        {
            key: "create_at",
            label: get(titles, "[0]"),
            align: "center",
        },
        {
            key: "hour",
            label: get(titles, "[1]"),
            align: "center"
        },
        {
            key: "product",
            label: get(titles, "[2]"),
            align: "center"
        },
        {
            key: "count",
            label: get(titles, "[3]"),
            align: "center"
        },
        {
            key: "location",
            label: get(titles, "[4]"),
            align: "center"
        },
        {
            key: "quantity",
            label: get(titles, "[5]"),
            align: "center"
        },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const dataTable = map(rows, (row, i) => {

        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${i}`;
        return ({
            ...row,
            options: (
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
            ),
            checkbox: (
                <Checkbox
                    color="secondary"
                    checked={isItemSelected}
                    onChange={(e, v) => handleChecked(e, row.id)}
                    inputProps={{ 'aria-labelledby': labelId, }}
                />
            )
        })
    })


    const countFinish = () => {
        console.log("finish")
    }

    return (
        <Layout
            propsToolbar={{
                title: replace(__(`${module}.header.title`), "[[code]]", code),
                label: replace(__(`${module}.header.sub-title`), "[[code]]", code),
                btnLabel: __(`${module}.btn`),
                btnFunc: countFinish
            }}
        >

            <Table
                toolbar={<Toolbar __={__} module={module} selected={selected} setSelected={setSelected} />}
                headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                propsTableCell={{ padding: "checkbox" }}
            />

            <Popover
                id={"menu-inventario-activo"}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                elevation={1}
            >
                <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                    <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall"><strong>{__(`${module}.menu.recount`)}</strong></Typography></MenuItem>
                    <Divider />
                    <MenuItem onClick={handleDelete}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>{__(`${module}.menu.delete`)}</strong></Typography></MenuItem>
                </MenuList>
            </Popover>
            <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
        </Layout>
    )
}

export default ActiveInventory;