import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material"
import { get, map } from "lodash";

const TableComponent = ({ headTable, dataTable, __, module, filter, toolbar, propsTable = {}, propsTableCell = {} }) => {

    return (
        <Paper>
            {toolbar}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" {...propsTable}>
                    <TableHead>
                        <TableRow >
                            {map(headTable, ({ key, label, align, width = "auto" }, i) => (
                                <TableCell key={i} align={align} {...propsTableCell} sx={{ width }} >
                                    <Typography variant="buttonSmall" component="div" >{label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((row, i) => {
                            return (
                                <TableRow
                                    key={i}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        "&:nth-of-type(odd)": { bgcolor: "background.base" }
                                    }}
                                >
                                    {map(headTable, ({ key, align, width = "auto" }, i) => (
                                        <TableCell key={i} align={align} {...propsTableCell} sx={{ width }} >
                                            <Typography variant="bodySmall" component="div" >{get(row, `${[key]}`)}</Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );
}
export default TableComponent
