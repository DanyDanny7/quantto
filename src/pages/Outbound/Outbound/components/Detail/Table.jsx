import React, { Fragment, useEffect } from 'react';
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
    Stack,
    Collapse,
    IconButton
} from "@mui/material"
import { get, map, isEmpty } from "lodash";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment"

import Load from "../../../../../components/form/Load";

const TableComponent = ({
    headTable,
    dataTable,
    headTableDetail,
    __,
    module,
    loading,
    toolbar,
    propsTable = {},
    propsContainer = {},
    propsTableCell = {},
    propsPaper = {},
    action = <></>,
    empty,
    details,
    load,
    getSdetail,
    onDeleteDetail,
    act,
    setAct
}) => {

    useEffect(() => {
        if (!!act) {
            getSdetail(act)
        }
    }, [act])

    const dataTableDetail = map(details, (row, i) => ({
        ...row,
        expiration: get(row, "expirationDate") ? moment(get(row, "expirationDate")).format("L") : "",
        options: (
            <IconButton
                className='!p-0'
                aria-label="more"
                id="long-button"
                aria-controls={'long-delete'}
                aria-expanded={'true'}
                aria-haspopup="true"
                onClick={() => onDeleteDetail(row)}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        ),
    }))

    return (
        <Paper {...propsPaper} >
            {toolbar}
            <TableContainer {...propsContainer} >
                <Table aria-label="table" {...propsTable} >
                    <TableHead>
                        <TableRow >
                            <TableCell></TableCell>
                            {map(headTable, ({ key, label, align, width = "auto", sx = {} }, i) => (
                                <TableCell key={i} align={align} {...propsTableCell} sx={{ width, ...sx }} >
                                    <Typography variant="buttonSmall" component="div" >{label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {!loading &&
                        <TableBody>
                            {dataTable.map((row, i) => {
                                return (
                                    <Fragment key={i}>
                                        <TableRow
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                "&:nth-of-type(odd)": { bgcolor: "background.base" }
                                            }}
                                        >
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setAct(act !== row.outbounddetailid ? row.outbounddetailid : null)}
                                                >
                                                    <KeyboardArrowDownIcon sx={{ transform: act === row.outbounddetailid ? "rotate(-180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
                                                </IconButton>
                                            </TableCell>
                                            {map(headTable, ({ key, align, width = "auto", sx = {} }, ii) => (
                                                <TableCell key={ii} align={align} {...propsTableCell} sx={{ width }} >
                                                    <>
                                                        {!loading &&
                                                            <Typography variant="bodySmall" component="div" sx={sx} >{get(row, `${[key]}`)}</Typography>
                                                        }
                                                    </>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={act === row.outbounddetailid} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    {load
                                                        ? (
                                                            <Load height={100} />
                                                        ) : (
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        {map(headTableDetail, ({ key, label, align, width = "auto", sx = {} }, j) => (
                                                                            <TableCell key={j} align={align} {...propsTableCell} sx={{ width, ...sx }} >
                                                                                <Typography variant="buttonSmall" component="div" >{label}</Typography>
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {dataTableDetail?.map((row, ii) => (
                                                                        <TableRow
                                                                            sx={{
                                                                                '&:last-child td, &:last-child th': { border: 0 },
                                                                                "&:nth-of-type(odd)": { bgcolor: "background.base" }
                                                                            }}
                                                                        >
                                                                            {map(headTableDetail, ({ key, align, width = "auto", sx = {} }, ii) => (
                                                                                <TableCell key={ii} align={align} {...propsTableCell} sx={{ width }} >
                                                                                    <>
                                                                                        <Typography variant="bodySmall" component="div" sx={sx} >{get(row, `${[key]}`)}</Typography>
                                                                                    </>
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        )}
                                                    {(isEmpty(dataTableDetail) && !load) &&
                                                        <Box sx={{
                                                            display: 'flex',
                                                            height: 100,
                                                            width: '100%',
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}>
                                                            <Load height={100} >
                                                                <Stack justifyContent="center" alignItems="center" spacing={1}  >
                                                                    <Typography variant="heading2">{__(`${module}.empty.detail.title`)}</Typography>
                                                                    <Typography variant="bodySmall">{__(`${module}.empty.detail.description`)}</Typography>
                                                                    <Box pt={2}>
                                                                        {action}
                                                                    </Box>
                                                                </Stack>
                                                            </Load>
                                                        </Box>
                                                    }
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    }
                </Table>
                {loading && <Load />}
                {(isEmpty(dataTable) && !loading) &&
                    <Box sx={{
                        display: 'flex',
                        height: 300,
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {!!empty
                            ? (
                                <Load >
                                    <Stack justifyContent="center" alignItems="center" spacing={1}  >
                                        <Typography variant="heading2">{__(`${module}.empty.${empty}.title`)}</Typography>
                                        <Typography variant="bodySmall">{__(`${module}.empty.${empty}.description`)}</Typography>
                                        <Box pt={2}>
                                            {action}
                                        </Box>
                                    </Stack>
                                </Load>
                            ) : (
                                <Load >
                                    <Stack justifyContent="center" alignItems="center" spacing={1} >
                                        <Typography variant="heading2">{__(`${module}.empty.title`)}</Typography>
                                        <Typography variant="bodySmall">{__(`${module}.empty.description`)}</Typography>
                                        <Box pt={2}>
                                            {action}
                                        </Box>
                                    </Stack>
                                </Load>
                            )}
                    </Box>
                }
            </TableContainer>
        </Paper >
    );
}
export default TableComponent
