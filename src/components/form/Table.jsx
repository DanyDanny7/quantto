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
    Box
} from "@mui/material"
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { get, map } from "lodash";

const TableComponent = ({ headTable, dataTable, __, module, filter, loading, toolbar, propsTable = {}, propsTableCell = {} }) => {

    const CircularProgressCustom = (props) => (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: "secondary",
                    animationDuration: '750ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round', }
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );

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
                        <CircularProgressCustom />
                    </Box>
                }
            </TableContainer>
        </Paper >
    );
}
export default TableComponent
