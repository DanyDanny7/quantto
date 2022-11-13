import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ showNoti, setShowNoti, }) => {

    const handleClose = () => {
        setShowNoti({ open: false, msg: "", variant: "" });
    };

    const getVariant = () => {
        const variant = showNoti.variant;
        switch (variant) {
            case "error": return { severity: variant, sx: { width: '100%', color: "error.contrastText", bgcolor: "error.main" } }
            case "warning": return { severity: variant, sx: { width: '100%', color: "warning.contrastText", bgcolor: "warning.main" } }
            case "info": return { severity: variant, sx: { width: '100%', color: "info.contrastText", bgcolor: "info.main" } }
            case "success": return { severity: variant, sx: { width: '100%', color: "success.contrastText", bgcolor: "success.main" } }
            default: return { severity: variant, sx: { width: '100%', color: "common.white", bgcolor: "common.white" } }
        }
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'button', horizontal: "right" }}
                open={showNoti.open}
                onClose={handleClose}
                key={"msg"}
                autoHideDuration={5000}
            >
                <Alert onClose={handleClose} {...getVariant()} >
                    <Typography variant="bodySmall" >
                        {showNoti.msg}
                    </Typography>
                </Alert>
            </Snackbar>
        </div >
    );
}

export default Notification