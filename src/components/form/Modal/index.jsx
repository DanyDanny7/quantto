import React from 'react';
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
import { get } from "lodash";
import CloseIcon from '@mui/icons-material/Close';

import { pdfFromReact } from "generate-pdf-from-react-html";

const AlertQuestion = ({
    open,
    cancel,
}) => {


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
                    <DialogContentText id="alert-dialog-description" sx={{ m: 0, p: 0, width: 600, }}>
                        <Box id="element-to-paint">
                            <Box component="strong" color="error.main" >Aún en proceso...</Box>
                            <Box className="element-to-paint" color="text.dark" sx={{ py: 2, px: 3 }}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack>
                                        <Stack direction="column" justifyContent="center" sx={{ height: 150 }}>
                                            <Typography variant="heading1" sx={{ fontSize: 40, lineHeight: "1.3" }} gutterBottom >Quantto Inc.</Typography>
                                            <Typography variant="bodyXtraSmall" color="text.light">United States</Typography>
                                            <Typography variant="bodyXtraSmall" color="text.light">Email: support@getquantto.com</Typography>
                                        </Stack>
                                        <Stack spacing={0.5}>
                                            <Typography variant="bodyXtraSmall">Bill To</Typography>
                                            <Typography variant="bodyLarge">HORACIO RIOS</Typography>
                                            <Typography variant="bodySmall">0000000</Typography>
                                            <Typography variant="bodySmall">El Salvador</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack>
                                        <Stack sx={{ height: 150 }} >
                                            <Typography variant="heading3">Invoice</Typography>
                                            <table>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Invoice #</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>939393939</Typography>
                                                </tr>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Billed On</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>Oct 18, 2021</Typography>
                                                </tr>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Terms</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>On-Receipt</Typography>
                                                </tr>
                                            </table>
                                        </Stack>
                                        <Stack>
                                            <Stack>
                                                <Stack direction="row" fullWidth sx={{ height: 45, border: theme => `2px solid ${theme.palette.color.neutral[500]}` }}>
                                                    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", width: 100, bgcolor: theme => theme.palette.color.green[500], color: "common.white", borderRight: theme => `2px solid ${theme.palette.color.neutral[500]}` }}><Typography >PAID</Typography></Stack>
                                                    <Stack justifyContent="center" alignItems="flex-start" sx={{ height: "100%", flex: 1, bgcolor: theme => theme.palette.color.neutral[300], color: "text.light", px: 1 }}><Typography >on Oct 18, 2021</Typography></Stack>
                                                </Stack>
                                                <Stack justifyContent="center" alignItems="center" sx={{ marginTop: "-2px", border: theme => `2px solid ${theme.palette.color.neutral[500]}` }} >
                                                    <Box component="td" style={{ padding: "12px" }}><Typography variant="heading1" sx={{ fontSize: 40, fontWeight: 300 }} gutterBottom >$ 5.00</Typography></Box>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Box component="table" sx={{ mt: 2, width: "100%", border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                    <Box component="tr" bgcolor={theme => theme.palette.color.neutral[400]} width="100%">
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >Date</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >Description</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >Qty</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >Price</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="buttonSmall" >Subtotal</Typography></Box>
                                    </Box>
                                    <Box component="tr" sx={{ border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="bodyMedium" >Oct 18</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="bodyMedium" >Inventory: Inventario de prueba 03</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="bodyMedium" >1</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                        <Box component="td" style={{ padding: "8px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                </Box>

                                <Box component="table" sx={{ mt: 3, marginLeft: "auto" }}>
                                    <Box component="tr" >
                                        <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >Sub Total</Typography></Box>
                                        <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                    <Box component="tr">
                                        <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >Total</Typography></Box>
                                        <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                    <Box component="tr">
                                        <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="bodyMedium" >Paid</Typography></Box>
                                        <Box component="td" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="bodyMedium" >($ 5.00)</Typography></Box>
                                    </Box>
                                    <Box component="tr" sx={{ borderTop: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                        <Box component="td" sx={{ padding: "4px 8px" }}><Typography variant="buttonSmall" >Amount Due</Typography></Box>
                                        <Box component="th" sx={{ padding: "4px 8px", textAlign: "right" }}><Typography variant="buttonSmall" >$ 0.00</Typography></Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box id="element-to-print" width="100%" height={0} overflow="hidden" >
                            <Box className="element-to-print" color="text.dark" sx={{ py: 2, px: 3 }}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack>
                                        <Stack direction="column" justifyContent="center" sx={{ height: 150 }}>
                                            <Typography variant="heading1" sx={{ fontSize: 40, lineHeight: "1.3" }} gutterBottom >Quantto Inc.</Typography>
                                            <Typography variant="bodyXtraSmall" color="text.light">United States</Typography>
                                            <Typography variant="bodyXtraSmall" color="text.light">Email: support@getquantto.com</Typography>
                                        </Stack>
                                        <Stack spacing={0.5}>
                                            <Typography variant="bodyXtraSmall">Bill To</Typography>
                                            <Typography variant="bodyLarge">HORACIO RIOS</Typography>
                                            <Typography variant="bodySmall">0000000</Typography>
                                            <Typography variant="bodySmall">El Salvador</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack>
                                        <Stack sx={{ height: 150 }} >
                                            <Typography variant="heading3">Invoice</Typography>
                                            <table>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Invoice #</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>939393939</Typography>
                                                </tr>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Billed On</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>Oct 18, 2021</Typography>
                                                </tr>
                                                <tr>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 100 }}>Terms</Typography>
                                                    <Typography component="td" variant="bodyXtraSmall" sx={{ minWidth: 120 }}>On-Receipt</Typography>
                                                </tr>
                                            </table>
                                        </Stack>
                                        <Stack>
                                            <Stack>
                                                <Stack direction="row" fullWidth sx={{ height: 45, border: theme => `2px solid ${theme.palette.color.neutral[500]}` }}>
                                                    <Stack justifyContent="center" alignItems="center" sx={{ height: "100%", width: 120, bgcolor: theme => theme.palette.color.green[500], color: "common.white", borderRight: theme => `2px solid ${theme.palette.color.neutral[500]}`, pt: 0, px: 2, pb: 1 }}><Typography gutterBottom >PAID</Typography></Stack>
                                                    <Stack justifyContent="center" alignItems="flex-start" sx={{ height: "100%", flex: 1, bgcolor: theme => theme.palette.color.neutral[300], color: "text.light", pt: 0, px: 2, pb: 1 }}><Typography gutterBottom >on Oct 18, 2021</Typography></Stack>
                                                </Stack>
                                                <Stack justifyContent="center" alignItems="center" sx={{ marginTop: "-2px", border: theme => `2px solid ${theme.palette.color.neutral[500]}` }} >
                                                    <Box component="td" style={{ padding: "0px 12px 30px" }}><Typography variant="heading1" sx={{ fontSize: 40, fontWeight: 300 }} gutterBottom >$ 5.00</Typography></Box>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Box component="table" sx={{ mt: 2, width: "100%", border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                    <Box component="tr" bgcolor={theme => theme.palette.color.neutral[400]} width="100%">
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >Date</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >Description</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >Qty</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >Price</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="buttonSmall" >Subtotal</Typography></Box>
                                    </Box>
                                    <Box component="tr" sx={{ border: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodyMedium" >Oct 18</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodyMedium" >Inventory: Inventario de prueba 03</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodyMedium" >1</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 16px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                </Box>

                                <Box component="table" sx={{ mt: 3, marginLeft: "auto" }}>
                                    <Box component="tr" >
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >Sub Total</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                    <Box component="tr">
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >Total</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >$ 5.00</Typography></Box>
                                    </Box>
                                    <Box component="tr">
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >Paid</Typography></Box>
                                        <Box component="td" style={{ padding: "0px 8px 8px" }}><Typography variant="bodyMedium" >($ 5.00)</Typography></Box>
                                    </Box>
                                    <Box component="tr" sx={{ borderTop: theme => `1px solid ${theme.palette.color.neutral[500]}` }}>
                                        <Box component="th" style={{ padding: "0px 8px 8px" }}><Typography variant="buttonSmall" >Amount Due</Typography></Box>
                                        <Box component="th" style={{ padding: "0px 8px 8px" }}><Typography variant="buttonSmall" >$ 0.00</Typography></Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            pdfFromReact(".element-to-print", "Voucher #--", "p", false, false)
                        }
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AlertQuestion