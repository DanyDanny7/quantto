
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from "lodash";
import { blue } from '@mui/material/colors';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    Divider,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    Stack,
    Collapse,
    Link,
    FormControl,
    TextField,
    Avatar
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import UploadFileModal from "./DropZoneComponent"



const NewInventory = ({ open, setOpen, __, module }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState("")

    const handleClose = () => {
        setOpen(false);
        setName("")
        setActiveStep(0)
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            handleClose()
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            label: __(`${module}.modal.option-1`),
            key: 1,
        },
        {
            label: __(`${module}.modal.option-2`),
            key: 2,
        },
    ];

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="modal-new-inventory"
                open={open}
                maxWidth="xl"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {__(`${module}.modal.title`)}
                </DialogTitle>
                <DialogContent dividers sx={{ m: 0, p: 0 }}>
                    <Box className='flex'>
                        <Box className='w-40 p-6'>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Avatar sx={{ bgcolor: (theme) => theme.palette.color.blue[300], width: 32, height: 32 }} >
                                    {get(steps, "[0]key") === activeStep
                                        ? <CheckIcon fontSize='inhert' />
                                        : <Typography variant="bodySmall">{get(steps, "[0]key")}</Typography>
                                    }
                                </Avatar>
                                <Typography variant="bodyMedium" {...(get(steps, "[0]key") > activeStep + 1 ? { sx: { color: "text.lite" } } : { sx: { color: (theme) => theme.palette.color.blue[300] } })}>{get(steps, "[0]label")}</Typography>
                            </Stack>
                            <Box sx={{ height: 34, borderLeft: "1px dashed", mx: 1.9 }} />
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Avatar
                                    {...(get(steps, "[1]key") > activeStep + 1
                                        ? { sx: { bgcolor: "common.white", color: "text.lite", border: "1px solid", width: 32, height: 32 } }
                                        : { sx: { bgcolor: (theme) => theme.palette.color.blue[300], width: 32, height: 32 } }
                                    )}
                                >
                                    {get(steps, "[1]key") === activeStep
                                        ? <CheckIcon fontSize='inhert' />
                                        : <Typography variant="bodySmall">{get(steps, "[1]key")}</Typography>
                                    }
                                </Avatar>
                                <Typography variant="bodyMedium" {...(get(steps, "[1]key") > activeStep + 1 ? { sx: { color: "text.lite" } } : { sx: { color: (theme) => theme.palette.color.blue[300] } })} >{get(steps, "[1]label")}</Typography>
                            </Stack>
                        </Box>
                        <Divider orientation="vertical" flexItem fullWidth />
                        <Box className='p-4 flex-1'>
                            <Collapse in={activeStep === 0}>
                                <Stack direction="column" spacing={3} >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                        <Typography variant="bodyMedium">{__(`${module}.modal.sub-title-1`)}</Typography>
                                        <Button
                                            color="secondary"
                                            endIcon={<ArrowDropDownIcon />}
                                            component={Link}
                                            href={`/files/example.xlsx`}
                                            download={`${__(`${module}.modal.download-file-name`)}.xlsx`}
                                        >
                                            <Typography variant="bodyMedium">{__(`${module}.modal.download-file`)}</Typography>
                                        </Button>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" spacing={2} >
                                        <FormControl fullWidth sx={{ maxWidth: 360 }}  >
                                            <Typography className='pb-2' component="label" htmlFor="name" >
                                                {__(`${module}.modal.input.name`)}
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                id="name"
                                                name="name"
                                                placeholder={__(`${module}.modal.input.placeholder`)}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                color="secondary"
                                            />
                                        </FormControl>
                                        <Divider orientation="vertical" flexItem fullWidth />
                                        <Box flex={1} >
                                            <UploadFileModal __={__} module={module} />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Collapse>
                            <Collapse in={activeStep === 1}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                    <Typography variant="bodyMedium">{__(`${module}.modal.sub-title-1`)}</Typography>
                                    <Button color="secondary" endIcon={<ArrowDropDownIcon />}>
                                        {/* <Typography variant="bodyMedium">{__(`${module}.modal.download-file`)}</Typography> */}
                                        otro contenido
                                    </Button>
                                </Stack>
                            </Collapse>
                        </Box>
                    </Box>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )}

                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleBack}
                            sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                        >
                            {activeStep > 0 ? __(`${module}.modal.btn-2`) : __(`${module}.modal.btn-3`)}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={!name}
                        // sx={{ bgcolor: (theme) => theme.palette.color.neutral[600], color: "common.white", "&:hover": { bgcolor: (theme) => theme.palette.color.neutral[700] } }}
                        >
                            {__(`${module}.modal.btn-1`)}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default NewInventory;