/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
    Dialog,
    Box,
    Button,
    IconButton,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Stack
} from '@mui/material';
import { get, isEmpty, upperCase } from "lodash";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { pdfFromReact } from "generate-pdf-from-react-html";
import moment from "moment";
import CircularProgress from "../../../../../components/form/CircularProgress"


import { getHistoryPaymentId } from "../../../../../store/history/thunk/historyPaymentId"


const AlertQuestion = ({
    open,
    cancel,
    selected,
    __,
    module
}) => {
    const dispatch = useDispatch();

    const userState = useSelector(state => state.auth.login.dataUser);
    const historyDetailState = useSelector(state => state.history.historyPayment.detail);

    useEffect(() => {
        if (!isEmpty(selected)) {
            const filters = {
                paymentid: get(selected, "historyid"),
                userid: get(userState, "userId"),
                companyid: Number(get(userState, "companyId")),
                language: localStorage.getItem("lang"),
            }
            dispatch(getHistoryPaymentId(filters))
        }
    }, [get(selected, "historyid")])

    return (
        <div>
            <Dialog
                onClose={cancel}
                open={open}
                aria-labelledby="alert-dialog-voucher"
                aria-describedby="alert-dialog-voucher"
                width="640px"
            >
                <Box>
                    <IconButton
                        aria-label="close"
                        onClick={cancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent sx={{ m: 0, px: 1 }}>
                    {get(historyDetailState, "isLoading", false)
                        ? (
                            <Box sx={{
                                display: 'flex',
                                height: 540,
                                width: 600,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <DialogContentText id="alert-dialog-description" sx={{ m: 0, p: 0, width: 600, }}>
                                <Box id="element-to-paint">
                                    <Box className="element-to-paint" color="text.dark" sx={{ py: 2, px: 3 }}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Stack>
                                                <Stack direction="column" justifyContent="center" sx={{ height: 150 }}>
                                                    <Typography variant="heading1" sx={{ fontSize: 40, lineHeight: "1.3" }} gutterBottom >{__(`${module}.voucher.labels.company`)}</Typography>
                                                    <Typography variant="bodyXtraSmall" color="text.light">{`${__(`${module}.voucher.labels.email`)} ${__(`${module}.voucher.values.email`)}`}</Typography>
                                                </Stack>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="bodyXtraSmall">{__(`${module}.voucher.labels.billto`)}</Typography>
                                                    <Typography variant="bodyLarge">{upperCase(get(historyDetailState, "data.billto"))}</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack sx={{ height: 150 }} >
                                                    <Typography variant="heading3">Invoice</Typography>
                                                    <table>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.no`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{get(historyDetailState, "data.paymentid")}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.billed`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{moment(get(historyDetailState, "data.paymentdate")).format("on LL")}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.terms`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{__(`${module}.voucher.values.terms`)}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.refcode`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{get(historyDetailState, "data.refcode", "--")}</Typography>
                                                        </tr>
                                                    </table>
                                                </Stack>
                                                <Stack>
                                                    <Stack>
                                                        <Stack direction="row" fullWidth sx={{ height: 45, border: theme => `2px solid ${theme.palette.color.neutral[500]}` }}>
                                                            <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", width: 100, bgcolor: theme => theme.palette.color.green[500], color: "common.white", borderRight: theme => `2px solid ${theme.palette.color.neutral[500]}` }}><Typography >{__(`${module}.voucher.values.paid`)}</Typography></Stack>
                                                            <Stack justifyContent="center" alignItems="flex-start" sx={{ height: "100%", flex: 1, bgcolor: theme => theme.palette.color.neutral[300], color: "text.light", px: 1 }}><Typography >{moment(get(historyDetailState, "data.paymentdate")).format("on LL")}</Typography></Stack>
                                                        </Stack>
                                                        <Stack justifyContent="center" alignItems="center" sx={{ marginTop: "-2px", border: theme => `2px solid ${theme.palette.color.neutral[500]}` }} >
                                                            <Box component="td" style={{ padding: "12px" }}><Typography variant="heading1" sx={{ fontSize: 40, fontWeight: 300 }} gutterBottom >{`$ ${get(historyDetailState, "data.total")}`}</Typography></Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Box component="table" sx={{ mt: 2, width: "100%", border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                            <Box component="tr" bgcolor={theme => theme.palette.color.neutral[400]} width="100%">
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.date`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.description`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.quantity`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.price`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.subtotal`)}</Typography></Box>
                                            </Box>
                                            <Box component="tr" sx={{ border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                                <Box component="td" style={{ padding: "8px" }}><Typography className='whitespace-nowrap' variant="bodySmall" >{moment(get(historyDetailState, "data.paymentdate")).format("MMM DD")}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="bodySmall" >{get(historyDetailState, "data.description")}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="bodySmall" >{get(historyDetailState, "data.qty")}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="bodySmall" >{`$ ${get(historyDetailState, "data.price")}`}</Typography></Box>
                                                <Box component="td" style={{ padding: "8px" }}><Typography variant="bodySmall" >{`$ ${get(historyDetailState, "data.subtotal")}`}</Typography></Box>
                                            </Box>
                                        </Box>

                                        <Box component="table" sx={{ mt: 3, marginLeft: "auto" }}>
                                            <Box component="tr" >
                                                <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.subtotal`)}</Typography></Box>
                                                <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`$ ${get(historyDetailState, "data.subtotal")}`}</Typography></Box>
                                            </Box>
                                            <Box component="tr">
                                                <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.total`)}</Typography></Box>
                                                <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`$ ${get(historyDetailState, "data.total")}`}</Typography></Box>
                                            </Box>
                                            <Box component="tr">
                                                <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.paid`)}</Typography></Box>
                                                <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`($ ${get(historyDetailState, "data.paid")})`}</Typography></Box>
                                            </Box>
                                            <Box component="tr" sx={{ borderTop: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                                <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.labels.amount`)}</Typography></Box>
                                                <Box component="th" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="buttonSmall" >{`$ ${get(historyDetailState, "data.amountdue")}`}</Typography></Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box id="element-to-print" width="100%" height={0} overflow="hidden" >
                                    <Box className="element-to-print" color="text.dark" sx={{ py: 2, px: 3 }}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Stack>
                                                <Stack direction="column" justifyContent="center" sx={{ height: 150 }}>
                                                    <Typography variant="heading1" sx={{ fontSize: 40, lineHeight: "1.3" }} gutterBottom >{__(`${module}.voucher.labels.company`)}</Typography>
                                                    {/* <Typography variant="bodyXtraSmall" color="text.light">{__(`${module}.voucher.labels.country`)}</Typography> */}
                                                    <Typography variant="bodyXtraSmall" color="text.light">{`${__(`${module}.voucher.labels.email`)} ${__(`${module}.voucher.values.email`)}`}</Typography>
                                                </Stack>
                                                <Stack spacing={0.5}>
                                                    <Typography variant="bodyXtraSmall">{__(`${module}.voucher.labels.billto`)}</Typography>
                                                    <Typography variant="bodyLarge">{upperCase(get(historyDetailState, "data.billto"))}</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack sx={{ height: 150 }} >
                                                    <Typography variant="heading3">Invoice</Typography>
                                                    <table>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.no`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{get(historyDetailState, "data.paymentid")}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.billed`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{moment(get(historyDetailState, "data.paymentdate")).format("on LL")}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.terms`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{__(`${module}.voucher.values.terms`)}</Typography>
                                                        </tr>
                                                        <tr>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>{__(`${module}.voucher.labels.refcode`)}</Typography>
                                                            <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>{get(historyDetailState, "data.refcode", "--")}</Typography>
                                                        </tr>
                                                    </table>
                                                </Stack>
                                                <Stack>
                                                    <Stack>
                                                        <Stack direction="row" fullWidth sx={{ height: 45, border: theme => `2px solid ${theme.palette.color.neutral[500]}` }}>
                                                            <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", width: 120, bgcolor: theme => theme.palette.color.green[500], color: "common.white", borderRight: theme => `2px solid ${theme.palette.color.neutral[500]}`, pt: 0, px: 2, pb: 1 }}><Typography >{__(`${module}.voucher.values.paid`)}</Typography></Stack>
                                                            <Stack justifyContent="center" alignItems="flex-start" sx={{ height: "100%", flex: 1, bgcolor: theme => theme.palette.color.neutral[300], color: "text.light", pt: 0, px: 2, pb: 1 }}><Typography >{moment(get(historyDetailState, "data.paymentdate")).format("on LL")}</Typography></Stack>
                                                        </Stack>
                                                        <Stack justifyContent="center" alignItems="center" sx={{ marginTop: "-2px", border: theme => `2px solid ${theme.palette.color.neutral[500]}` }} >
                                                            <Box component="td" style={{ padding: "0px 12px 30px" }}><Typography variant="heading1" sx={{ fontSize: 40, fontWeight: 300 }} gutterBottom >{`$ ${get(historyDetailState, "data.total")}`}</Typography></Box>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Box component="table" sx={{ mt: 2, width: "100%", border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                            <Box component="tr" bgcolor={theme => theme.palette.color.neutral[400]} width="100%">
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.date`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.description`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.quantity`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.price`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.table.subtotal`)}</Typography></Box>
                                            </Box>
                                            <Box component="tr" sx={{ border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography className='whitespace-nowrap' variant="bodySmall" >{moment(get(historyDetailState, "data.paymentdate")).format("MMM DD")}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodySmall" >{get(historyDetailState, "data.description")}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodySmall" >{get(historyDetailState, "data.qty")}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodySmall" >{`$ ${get(historyDetailState, "data.price")}`}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodySmall" >{`$ ${get(historyDetailState, "data.subtotal")}`}</Typography></Box>
                                            </Box>
                                        </Box>
                                        <Box component="table" sx={{ mt: 3, marginLeft: "auto" }}>
                                            <Box component="tr" >
                                                <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.subtotal`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`$ ${get(historyDetailState, "data.subtotal")}`}</Typography></Box>
                                            </Box>
                                            <Box component="tr">
                                                <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.total`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`$ ${get(historyDetailState, "data.total")}`}</Typography></Box>
                                            </Box>
                                            <Box component="tr">
                                                <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >{__(`${module}.voucher.labels.paid`)}</Typography></Box>
                                                <Box component="td" style={{ padding: "0px 8px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >{`($ ${get(historyDetailState, "data.paid")})`}</Typography></Box>
                                            </Box>
                                            <Box component="tr" sx={{ borderTop: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                                <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="buttonSmall" >{__(`${module}.voucher.labels.amount`)}</Typography></Box>
                                                <Box component="th" style={{ padding: "0px 8px 8px", textAlign: "right" }}><Typography variant="buttonSmall" >{`$ ${get(historyDetailState, "data.amountdue")}`}</Typography></Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </DialogContentText>
                        )
                    }


                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            pdfFromReact(".element-to-print", `quanttoinvoice#${get(historyDetailState, "data.paymentid")}`, "p", false, false)
                        }
                    >
                        {__(`${module}.voucher.labels.download`)}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AlertQuestion