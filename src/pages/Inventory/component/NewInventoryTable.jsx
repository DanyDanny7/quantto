import React, { useState } from 'react';
import { Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import { get, map, replace, join } from "lodash";

import { useDispatch, useSelector } from "react-redux";

import Table from "../../../components/form/Table";
import NewInventoryToolbar from "./NewInventoryToolbar"
import NewCounters from "../../Counts/components/NewCounters";


const NewInventoryTable = ({ __, module, selected, setSelected }) => {
    const [__2] = useTranslation("count");
    const module2 = "counts"
    const [openNew, setOpenNew] = useState(false);

    const countsState = useSelector(state => state.counts);

    const closeNewCouter = () => {
        setOpenNew(false)
    }

    const newCounter = () => {
        setOpenNew(true)
    }

    // ---------- Table ---------------
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = map(get(countsState, "data.data"), (n) => n.counterId);
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
                    indeterminate={selected.length > 0 && selected.length < get(countsState, "data.data", []).length}
                    checked={get(countsState, "data.data", []).length > 0 && selected.length === get(countsState, "data.data", []).length}
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
            key: "userName",
            label: __(`${module}.modal.table-title`),
            align: "left",
        },
    ]

    const dataTable = map(get(countsState, "data.data", []), (row, i) => {
        const isItemSelected = isSelected(get(row, "counterId"));
        const labelId = `enhanced-table-checkbox-${i}`;
        return ({
            id: get(row, "counterId"),
            ...row,
            checkbox: (
                <Checkbox
                    color="secondary"
                    checked={isItemSelected}
                    onChange={(e, v) => handleChecked(e, get(row, "counterId"))}
                    inputProps={{ 'aria-labelledby': labelId, }}
                />
            ),
        })
    })


    return (
        <div>
            <Table
                toolbar={<NewInventoryToolbar __={__} module={module} newCounter={newCounter} />}
                headTable={headTable}
                dataTable={dataTable}
                __={__}
                module={module}
                sizeFilters={125}
                propsTableCell={{ padding: "checkbox" }}
            />
            {openNew &&
                <NewCounters
                    open={openNew}
                    onClose={closeNewCouter}
                    isEdit={false}
                    toEdit={{}}
                    __={__2}
                    module={module2}
                    maxWidth="lg"
                />
            }
        </div>
    )
}

export default NewInventoryTable