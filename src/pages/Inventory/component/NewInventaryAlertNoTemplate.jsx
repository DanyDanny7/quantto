import React from 'react';
import {
    Dialog,
    Box,
    Typography,
    Button,
    IconButton,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';

const Alert = ({
    __,
    module,
    openAlert,
    closeAlert,
    submit,
}) => {

    return (
        <div>
            <Dialog onClose={closeAlert} open={openAlert}>
                <Box>
                    <IconButton
                        aria-label="close"
                        onClick={closeAlert}
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
                <Box className='flex flex-col justify-center m-10'>
                    <Typography className='text-center' variant="heading2" gutterBottom >
                        {__(`${module}.actions.alert.template.title`)}
                    </Typography>
                    <Typography className='text-center' variant="bodyMedium" gutterBottom sx={{ my: 1 }}>
                        {__(`${module}.actions.alert.template.question`)}
                    </Typography>
                    <Stack alignItems="center">
                        <ErrorIcon sx={{ width: 75, height: 75, color: theme => theme.palette.color.alert[300] }} />
                    </Stack>
                    <Typography className='text-center' variant="buttonLarge" sx={{ mt: 2 }} gutterBottom>
                        {__(`${module}.actions.alert.template.subtitle`)}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                        <Button variant="outlined" color="primary" onClick={closeAlert}>
                            {__(`${module}.actions.cancel`)}
                        </Button>
                        <Button variant="contained" color="primary" onClick={submit} autoFocus >
                            {__(`${module}.actions.acept`)}
                        </Button>
                    </Stack>
                </Box>
            </Dialog>
        </div >
    );
}

export default Alert