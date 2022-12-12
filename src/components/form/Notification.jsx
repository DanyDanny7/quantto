/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ showNoti, setShowNoti, timer = 5000 }) => {

    useEffect(() => {
      const time = setTimeout(() => {
        setShowNoti({ open: false, msg: undefined, variant: "" })
      }, timer);
    
      return () => {
        clearTimeout(time)
      }
    }, [showNoti.open])
    

    const handleClose = () => {
        setShowNoti({ open: false, msg: undefined, variant: "" });
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
                anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                open={showNoti.open}
                onClose={handleClose}
                key={"msg"}
                autoHideDuration={timer}
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