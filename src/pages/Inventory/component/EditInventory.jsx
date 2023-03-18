
import React, { useState } from 'react';
import { get, isEmpty, replace, trim, join } from "lodash";

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
    Tabs,
    Tab,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoadingButton } from '@mui/lab';
import { useSelector } from "react-redux";

import NewInventaryDropZone from "./NewInventaryDropZone";
import NewInventoryTable from "./NewInventoryTable";
import AlertQuestion from "../../../components/form/AlertQuestion";
import { putInventaryRequest } from "../../../store/inventary/actions/inventary/putInventary"

const NewInventory = ({ open, setOpen, __, module, showNoti, setShowNoti, edit, setEdit, setError, onSuccess }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [selected, setSelected] = useState([]);
    const [file, setFile] = useState(null);
    const [alertStart, setAlertStart] = useState({ open: false, title: "", subtitle: "" });
    const [load, setLoad] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setActiveStep(0)
        setEdit({ item: {}, value: false })
        setFile(null)
    };

    const userState = useSelector(state => state.auth.login.dataUser);
    const getState = useSelector(state => state);

    const handleBack = () => {
        if (activeStep === 0) {
            handleClose()
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const submit = () => {
        const body = {
            userid: get(userState, "userId"),
            companyid: get(userState, "companyId"),
            language: localStorage.getItem("lang"),
            template: file,
            inventoryId: get(edit, "item.inventoryId")
        }

        const formData = new FormData();
        for (const key in body) {
            if (Object.hasOwnProperty.call(body, key)) {
                if (!!body[key]) {
                    formData.append(`${key}`, body[key])
                }
            }
        }
        setLoad(true)
        putInventaryRequest(formData, () => getState)
            .then(({ data }) => {
                setLoad(false)
                onSuccess()
                handleClose()
            })
            .catch((err) => { setError(err); setLoad(false) })
    }

    const onAlertCancel = () => setAlertStart({ open: false, title: "", subtitle: "" })
    const onAlertSubmit = () => {
        onAlertCancel()
        submit()
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setActiveStep(newValue);
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
                    <Box px={2}>
                        <Tabs value={activeStep} onChange={handleChange} aria-label="tab edith">
                            <Tab color="primary" label={<Typography className='normal-case'>{__(`${module}.modal.tabs.inventory`)}</Typography>} {...a11yProps(0)} />
                            <Tab color="primary" label={<Typography className='normal-case'>{__(`${module}.modal.tabs.takers`)}</Typography>} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box className='flex'>
                        <Box className='p-4 flex-1'>
                            <Collapse in={activeStep === 0}>
                                <Stack direction="column" spacing={3} >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" >
                                        <Typography variant="bodyMedium">{__(`${module}.modal.sub-title-1`)}</Typography>
                                        <Button
                                            color="secondary"
                                            endIcon={<ArrowDropDownIcon />}
                                            component={Link}
                                            href={`https://quantto.s3.amazonaws.com/InventoryTemplate.csv`}
                                            download={`${__(`${module}.modal.download-file-name`)}.csv`}
                                        >
                                            <Typography variant="bodyMedium">{__(`${module}.modal.download-file`)}</Typography>
                                        </Button>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" spacing={2} >
                                        <Box flex={1} >
                                            <NewInventaryDropZone
                                                __={__}
                                                module={module}
                                                getFile={setFile}
                                                type={2}
                                                oldProducts={[]}
                                                edit={edit}
                                            />
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
                {activeStep === 0 &&
                    <DialogActions>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={handleBack}
                                sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                            >
                                {__(`${module}.modal.btn-3`)}
                            </Button>
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                onClick={submit}
                                loading={load}
                                disabled={isEmpty(file)}
                            >
                                {__(`${module}.modal.btn-csv`)}
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