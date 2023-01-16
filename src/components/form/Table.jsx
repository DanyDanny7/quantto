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
    Box,
    Stack
} from "@mui/material"

import { get, map, isEmpty } from "lodash";

import CircularProgress from "./CircularProgress"

const TableComponent = ({
    headTable,
    dataTable,
    __,
    module,
    filter,
    loading,
    toolbar,
    propsTable = {},
    propsContainer = {},
    propsTableCell = {},
    action = <></>
}) => {

    return (
        <Paper>
            {toolbar}
            <TableContainer {...propsContainer} >
                <Table aria-label="table" {...propsTable}>
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
                                            <>
                                                {!loading &&
                                                    <Typography variant="bodySmall" component="div" >{get(row, `${[key]}`)}</Typography>
                                                }
                                            </>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {loading &&
                    <Box sx={{
                        display: 'flex',
                        height: 300,
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress />
                    </Box>
                }
                {(isEmpty(dataTable) && !loading) &&
                    <Box sx={{
                        display: 'flex',
                        height: 300,
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Stack justifyContent="center" alignItems="center" spacing={1} >
                            <Typography variant="heading2">{__(`${module}.empty.title`)}</Typography>
                            <Typography variant="bodySmall">{__(`${module}.empty.description`)}</Typography>
                            <Box pt={2}>
                                {action}
                            </Box>
                        </Stack>
                    </Box>
                }
            </TableContainer>
        </Paper >
    );
}
export default TableComponent
