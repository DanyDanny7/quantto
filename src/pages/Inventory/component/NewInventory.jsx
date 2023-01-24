
import React, { useState } from 'react';
import { get, isEmpty, replace } from "lodash";

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
    Stack,
    Collapse,
    Link,
    FormControl,
    TextField,
    Avatar
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoadingButton } from '@mui/lab';

import NewInventaryDropZone from "./NewInventaryDropZone";
import NewInventoryTable from "./NewInventoryTable";
import AlertQuestion from "../../../components/form/AlertQuestion";

const NewInventory = ({ open, setOpen, onSubmit, __, module, loading, showNoti, setShowNoti, edit, setEdit, setError }) => {
    const [activeStep, setActiveStep] = useState(get(edit, "value", false) ? 1 : 0);
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [selected, setSelected] = useState([]);
    const [file, setFile] = useState(null);
    const [alertStart, setAlertStart] = useState({ open: false, title: "", subtitle: "" })

    const handleClose = () => {
        setOpen(false);
        setName("")
        setActiveStep(0)
        setEdit({ item: {}, value: false })
    };

    const handleBack = () => {
        if (activeStep === 0) {
            handleClose()
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
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

    const isDisabled = () => {
        const inactive = isEmpty(file) || (isEmpty(selected) && activeStep === 1)
        if (inactive !== disabled) {
            setDisabled(inactive)
        }
        return !name
    }

    const submit = () => {
        if (activeStep < 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            onSubmit({ name, counters: selected, file, handleClose })
        }
    }

    const onAlertCancel = () => setAlertStart({ open: false, title: "", subtitle: "" })
    const onAlertNoTempalte = () => setAlertStart({ open: true, title: __(`${module}.actions.alert.template.title`), subtitle: __(`${module}.actions.alert.template.question`) })
    const onAlertNoCounter = () => setAlertStart({ open: true, title: __(`${module}.actions.alert.counter.title`), subtitle: __(`${module}.actions.alert.counter.question`) })
    const onAlertSubmit = () => {
        onAlertCancel()
        submit()
    }

    const handleNext = async () => {
        if (!disabled) {
            submit()
        } else {
            if (activeStep < 1) {
                onAlertNoTempalte()
            } else {
                onAlertNoCounter()
            }
        }
    };

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
                    {get(edit, "value")
                        ? replace(__(`${module}.modal.title-edit`), "[[name]]", get(edit, "item.name"))
                        : __(`${module}.modal.title`)
                    }
                </DialogTitle>
                <DialogContent dividers sx={{ m: 0, p: 0 }}>
                    <Box className='flex'>
                        {!get(edit, "value", false) &&
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
                                <Box sx={{ height: 34, borderLeft: "1px dashed", mx: 1.9, color: "secondary.main" }} />
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
                        }
                        <Divider orientation="vertical" flexItem />
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
                                            download={`${__(`${module}.modal.download-file-name`)}.csv`}
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
                                        <Divider orientation="vertical" flexItem />
                                        <Box flex={1} >
                                            <NewInventaryDropZone __={__} module={module} getFile={setFile} />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Collapse>
                            <Collapse in={activeStep === 1}>
                                <Stack direction="column" spacing={3} >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                        <Typography variant="bodyMedium">{__(`${module}.modal.sub-title-2`)}</Typography>
                                    </Stack>
                                    <Divider />
                                    <Box flex={1} >
                                        <NewInventoryTable
                                            __={__}
                                            module={module}
                                            selected={selected}
                                            setSelected={setSelected}
                                            showNoti={showNoti}
                                            setShowNoti={setShowNoti}
                                            edit={edit}
                                            setError={setError}
                                        />
                                    </Box>
                                </Stack>
                            </Collapse>
                        </Box>
                    </Box>
                </DialogContent>
                {!get(edit, "value", false) &&
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
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={isDisabled()}
                                loading={loading}
                            >
                                {activeStep < 1
                                    ? __(`${module}.modal.btn-1`)
                                    : __(`${module}.modal.btn-5`)
                                }
                            </LoadingButton>
                        </Stack>
                    </DialogActions>
                }
            </Dialog>
            <AlertQuestion
                title={alertStart.title}
                subtitle={alertStart.subtitle}
                cancel={{ label: __(`${module}.actions.cancel`), func: onAlertCancel }}
                submit={{ label: __(`${module}.actions.acept`), func: onAlertSubmit }}
                openAlert={alertStart.open}
                loading={false}
            />
        </div >
    );
}

export default NewInventory;