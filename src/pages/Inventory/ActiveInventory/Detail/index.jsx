import React from 'react';
import { useTranslation } from "react-i18next";
import { get, map, replace } from "lodash";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Divider,
    IconButton,
    Typography,
    MenuList,
    MenuItem,
    Popover
} from '@mui/material';
import { useTheme } from "@mui/material/styles";

import Layout from "../../../../components/layout/Layout"
import Table from "../../../../components/form/Table";

function createData(code, product, category, barcode, onHand, counted, difference) {
    return { code, product, category, barcode, onHand, counted, difference };
}

const rows = [
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
    createData('AJHG623645', "Ejemplo 1", "Téoricos", "12947561498750928", 5, 6, 7),
];

const ActiveInventory = () => {
    const theme = useTheme();
    const [__] = useTranslation("inve");
    const module = "active"
    const code = "#Asq937614"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const titles = __(`${module}.table`, { returnObjects: true });

    const headTable = [
        {
            key: "code",
            label: get(titles, "[0]"),
            align: "left",
        },
        {
            key: "product",
            label: get(titles, "[1]"),
            align: "center"
        },
        {
            key: "category",
            label: get(titles, "[2]"),
            align: "center"
        },
        {
            key: "barcode",
            label: get(titles, "[3]"),
            align: "center"
        },
        {
            key: "onHand",
            label: get(titles, "[4]"),
            align: "center"
        },
        {
            key: "counted",
            label: get(titles, "[5]"),
            align: "center"
        },
        {
            key: "difference",
            label: get(titles, "[6]"),
            align: "center"
        },
        {
            key: "options",
            label: "",
            align: "center"
        },
    ]

    const card1 = {
        "count-name": "Nombre",
        "start": "09/10/22 - 9:00 AM",
        "end": "------",
        "progress": "75%",
        "units-counted": "100",
        "elapsed-time": "8:00:00",
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dataTable = map(rows, (row) => ({
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
        )
    }))

    return (
        <Layout
            propsToolbar={{
                title: __(`${module}.header.title`),
                label: replace(__(`${module}.header.sub-title`), "[[code]]", code),
                code: null,
                btnLabel: null
            }}
        >
           
            <Table headTable={headTable} dataTale={dataTable} __={__} module={module} sizeFilters={125} />

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
                    <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall"><strong>Recontar</strong></Typography></MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}><Typography className='text-center w-full ' variant="bodySmall" color="error.main"><strong>Eliminar</strong></Typography></MenuItem>
                </MenuList>
            </Popover>
        </Layout>
    )
}

export default ActiveInventory;