import React from 'react';
import {
    Dialog,
    Box,
    Button,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import { get } from "lodash";
import CloseIcon from '@mui/icons-material/Close';

const Alert = ({
    title,
    subtitle,
    cancel = { label: "", func: () => { } },
    submit = { label: "", func: () => { } },
    openAlert,
}) => {

    return (
        <div>
            <Dialog
                onClose={get(cancel, "func")}
                open={openAlert}
                aria-labelledby="alert-dialog-delete"
                aria-describedby="alert-dialog-delete"
                maxWidth="sm"
            >
                <Box>
                    <IconButton
                        aria-label="close"
                        onClick={get(cancel, "func")}
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
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {subtitle}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={get(cancel, "func")}>
                        {get(cancel, "label")}
                    </Button>
                    <Button variant="contained" color="primary" onClick={get(submit, "func")} autoFocus>
                        {get(submit, "label")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Alert