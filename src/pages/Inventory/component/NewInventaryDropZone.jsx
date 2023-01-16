/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import { isEmpty, get, includes, lowerCase } from 'lodash';
import { useDropzone } from 'react-dropzone'
import {
    Paper,
    Box,
    Typography,
    SvgIcon,
    Divider,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Notification from "../../../components/form/Notification"

const NewInventaryDropZone = ({ __, module, getFile }) => {
    const [file, setFile] = useState();
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" })

    const onDrop = useCallback((acceptedFiles, e) => {
        try {
            const newFile = acceptedFiles[0];

            if (includes(get(newFile, "name"), ".csv")) {
                getFile(newFile) // este llena el submit
                setFile(newFile) // este llena la vista previa.
            } else {
                setShowNoti({ open: true, msg: __(`${module}.modal.error.file`), variant: "error" })
            }
        } catch (error) {
            console.log(error)
            setShowNoti({ open: true, msg: __(`${module}.modal.error.file`), variant: "error" })
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const deleteFile = () => {
        setFile(null)
        getFile(null)
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
