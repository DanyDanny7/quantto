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

const TableComponent = ({ headTable, dataTable, __, module, filter, toolbar }) => {

    return (
        <Paper>
            {toolbar}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            {map(headTable, ({ key, label, align }, i) => (
                                <TableCell key={i} align={align} >
                                    <Typography variant="buttonSmall">{label}</Typography>
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
                                    {map(headTable, ({ key, align }, i) => (
                                        <TableCell key={i} align={align} >
                                            <Typography variant="bodySmall">{get(row, `${[key]}`)}</Typography>
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
