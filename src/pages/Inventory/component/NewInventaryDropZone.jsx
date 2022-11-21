/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import { isEmpty, get, includes, lowerCase } from 'lodash';
import { useDropzone } from 'react-dropzone'
// import { makeStyles } from '@material-ui/core/styles';
// import * as XLSX from 'xlsx';
// import Grid from '@material-ui/core/Grid';
import {
    Grid,
    Paper,
    Container,
    Box,
    Link as LinkUi,
    Typography,
    SvgIcon,
    Stack,
    Divider,
    IconButton
    // Modal
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import Notification from "../../../components/form/Notification"
// import { useTheme } from '@material-ui/core/styles';
// import { useTheme } from '@mui/material';

// import Swal from "sweetalert2";
import { Form, Formik } from "formik";
// import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';

// import Button, { DownloadPost } from "../../../../components/form/Button"
// import Modal from "../../../../components/modal/standard/Modal";
// import { isFulledDetail } from "../../../../utils/isFulled";
// import { postUploadMasive } from "../../../../services/Operations/Guides";

// const useStyles = makeStyles((theme) => ({
//     rootModal: {
//         '& .MuiDialog-paper': {
//             overflowY: 'visible !important',
//         },
//         '& .MuiDialogContent-dividers': {
//             overflowY: 'visible !important',
//         }
//     },
//     root: {
//         padding: theme.spacing(0, 2, 3)
//     },
//     contain: {
//         height: 200,
//         width: '100%',
//         border: '3px dashed #ccc',
//         borderRadius: 20,
//         padding: theme.spacing(3),
//         cursor: 'pointer',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     icon: {
//         height: 50,
//         width: 50,
//     }

// }));

// estos son los nombres del encabezado del xls

const ENVIO = '*Codigo Viñeta';
const DESTINATARIO = '*Destinatario';
const DIRECCION_ENTREGA = '*Direccion';
const TELEFONO = 'Telefonos';
const DESCRIPCION = '*Descripcion';
const CENTRO_COSTO = 'Centro Costo destino';

const NewInventaryDropZone = ({ __, module }) => {
    // const classes = useStyles();
    // const theme = useTheme();
    const [file, setFile] = useState();
    const [jsonArchive, setJsonArchive] = useState([]);
    const [error, setError] = useState({ value: false, message: false, index: "" });
    const [criticalError, setCriticalError] = useState(false);
    const [guiasCreadas, setGuiasCreadas] = useState([])
    const [nameFile] = useState([]);
    const [loadingFile, setLoadingFile] = useState(false);

    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" })

    // const errorMessage = (message = 'Surgió un error, intentelo más tarde') => {
    //     Swal.fire({
    //         title: message,
    //         icon: "error",
    //         confirmButtonColor: theme.palette.secondary.main,
    //         confirmButtonText: "Aceptar",
    //     });
    // }


    const uploadMasive = () => {
        try {
            const clientid = localStorage.getItem("client_id");
            const storeid = localStorage.getItem("store_id");

            const body = {
                origin: "excel",
                client_id: clientid,
                store_id: storeid,
                shipments: jsonArchive.map((item) => ({
                    // base
                    store_to_id: storeid,

                    // obligatorios
                    tracking_number: get(item, ENVIO).toString(),
                    recipient_name: get(item, DESTINATARIO).toString(),
                    recipient_address: get(item, DIRECCION_ENTREGA).toString(),
                    description: get(item, DESCRIPCION).toString(),
                    // opcionales
                    ...(!!(get(item, TELEFONO, false)) ? { recipient_phone: get(item, TELEFONO).toString() } : {}),
                    ...(!!(get(item, CENTRO_COSTO, false)) ? { store_to_code: get(item, CENTRO_COSTO).toString() } : {}),
                }))
            }

            setLoadingFile(true)
            // postUploadMasive(body)
            //     .then(({ data: { data } }) => {
            //         refrech()
            //         setGuiasCreadas(data.map((guia) => guia.id))
            //         setLoadingFile(false)
            //     })
            //     .catch((error) => {
            //         // errorMessage(error.response?.data?.error)
            //         onCancel()
            //         setLoadingFile(false)
            //     })

        } catch (error) {
            console.log("4", error)
            // setCriticalError(true)
            // setError({ value: true, message: "", index: "" })
            // setJsonArchive([]);
        }
    }

    const validateJson = (json) => {
        try {
            let flag = true

            for (let index = 0; index < json.length; index++) {

                // const validation = isFulledDetail(
                //     json[index],
                //     [
                //         ENVIO,
                //         DESTINATARIO,
                //         DIRECCION_ENTREGA,
                //         DESCRIPCION,
                //     ]
                // )

                // if (validation.flag) {
                //     flag = true;
                // } else {
                //     flag = false;
                //     setError({ value: !validation.flag, message: validation.validate, index })
                // }
            }

            if (flag) {
                console.log(json)
                setJsonArchive(json)
            }

        } catch (error) {
            console.log("3", error)
        }
    }

    const onDrop = useCallback((acceptedFiles, e) => {
        try {

            const newFile = acceptedFiles[0];
            console.log(newFile)

            if (includes(get(newFile, "name"), ".xlsx") || includes(get(newFile, "name"), ".xls") || includes(get(newFile, "name"), ".csv")) {

                setFile(newFile)

                // const fileReader = new FileReader();
                // fileReader.readAsArrayBuffer(file);

                // fileReader.onload = (e) => {

                //     try {
                //         const bufferArray = e.target.result;
                //         const wb = XLSX.read(bufferArray, { type: 'buffer' });
                //         const wsname = wb.SheetNames[0];
                //         const ws = wb.Sheets[wsname];
                //         const data = XLSX.utils.sheet_to_json(ws);
                //         validateJson(data)
                //     } catch (error) {
                //         fileReader.onerror = (error) => {
                //             console.log(error)
                //         };
                //         console.log("1", error)

                //     }
                // };

                // setCriticalError(false)
                // setError({ value: false, message: "", index: "" })
            } else {
                setShowNoti({ open: true, msg: __(`${module}.modal.error.file`), variant: "error" })
            }
        } catch (error) {
            // setCriticalError(true)
            // setError({ value: true, message: "", index: "" })
            // console.log("2", error)
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const deleteFile = () => {
        setFile(null)
    }

    return (
        <>
            {!isEmpty(file)
                ? (
                    <Box minHeight={150}>
                        <Paper elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.color.neutral[300]}`, overflow: "hidden" }}>
                            <Box className='p-4'>
                                <Box className='flex'>
                                    <Typography variant="buttonSmall">
                                        {__(`${module}.modal.dropzone.text-head`)}
                                    </Typography>
                                    <Typography className='pl-2' variant="buttonSmall" color="text.lite" >{`(${lowerCase(__(`${module}.modal.dropzone.complement`))})`}</Typography>
                                </Box>
                            </Box>
                            <Divider flexItem fullWidth sx={{ color: "red" }} />
                            <Box className='py-2 px-4 flex justify-between items-center' bgcolor={(theme) => theme.palette.color.neutral[100]}>
                                <Typography className='underline' variant="buttonSmall" color="secondary.main"  >{get(file, "name")}</Typography>
                                <IconButton aria-label="delete" size="small" sx={{ mr: 2 }} onClick={deleteFile}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </ Paper>
                    </Box>
                ) : (
                    <div>
                        <input {...getInputProps()} />
                        <div {...getRootProps()} >
                            <Box
                                sx={{
                                    height: 300,
                                    width: '100%',
                                    border: (theme) => `2px dashed ${theme.palette.color.neutral[500]}`,
                                    borderRadius: 2,
                                    padding: 10,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <SvgIcon viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ width: "112px", height: "112px", mb: 2 }}>
                                    <rect width="112" height="112" rx="56" fill="#EDFFFD" />
                                    <g clip-path="url(#clip0_266_22168)">
                                        <path d="M61.3334 29.3333H40.0001C37.0667 29.3333 34.6934 31.7333 34.6934 34.6666L34.6667 77.3333C34.6667 80.2666 37.0401 82.6666 39.9734 82.6666H72.0001C74.9334 82.6666 77.3334 80.2666 77.3334 77.3333V45.3333L61.3334 29.3333ZM72.0001 77.3333H40.0001V34.6666H58.6667V48H72.0001V77.3333ZM45.3334 64.0266L49.0934 67.7866L53.3334 63.5733V74.6666H58.6667V63.5733L62.9067 67.8133L66.6667 64.0266L56.0267 53.3333L45.3334 64.0266Z" fill="#13BFA8" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_266_22168">
                                            <rect width="64" height="64" fill="white" transform="translate(24 24)" />
                                        </clipPath>
                                    </defs>
                                </SvgIcon>

                                {isDragActive
                                    ? <>
                                        <Typography variant="bodyMedium" gutterBottom>{__(`${module}.modal.dropzone.text-active`)}</Typography>
                                        <br />
                                    </>
                                    : <>
                                        <Typography variant="bodyMedium" gutterBottom>{__(`${module}.modal.dropzone.text-start`)}</Typography>
                                        <Typography variant="bodyMedium" color={(theme) => theme.palette.color.neutral[500]}>
                                            {__(`${module}.modal.dropzone.complement`)}
                                        </Typography>
                                    </>
                                }
                            </Box>
                        </div>
                        <Notification showNoti={showNoti} setShowNoti={setShowNoti} timer={10000} />
                    </div >
                )

            }
        </>
    )
}

export default NewInventaryDropZone
