import React from 'react';
import { map } from "lodash";
import { Checkbox } from "@mui/material";

import Table from "../../../components/form/Table";
import NewInventoryToolbar from "./NewInventoryToolbar"


function createData(id, name) {
    return { id, name };
}

const rows = [
    createData("1", 'Jane Cooper'),
    createData("2", 'Wade Warren'),
    createData("3", 'Esther Howard'),
    createData("4", 'Cameron Williamson'),
    createData("5", 'Brooklyn Simmons'),
];

const NewInventoryTable = ({ __, module, selected, setSelected }) => {

    // ---------- Table ---------------
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

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
            width: 70
        },
        {
            key: "name",
            label: __(`${module}.modal.table-title`),
            align: "left"
        },
    ]


    const dataTable = map(rows, (row, i) => {

        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${i}`;
        return ({
            ...row,
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


    return (
        <div>
            <Table
                toolbar={<NewInventoryToolbar __={__} module={module} />}
                headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                sizeFilters={125}
                propsTableCell={{ padding: "checkbox" }}
            />
        </div>
    )
}

export default NewInventoryTable