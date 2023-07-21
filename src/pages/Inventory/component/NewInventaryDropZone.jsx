/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react'
import { isEmpty, get, includes, sumBy } from 'lodash';
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx';

import {
    Paper,
    Box,
    Typography,
    SvgIcon,
    Button,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import Notification from "../../../components/form/Notification"
import { getInventaryDetail } from "../../../store/inventary/thunk/getInventary/detail/getDetails";

const NewInventaryDropZone = ({ __, module, getFile, type = 1, edit }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState({});
    const [showNoti, setShowNoti] = useState({ open: false, msg: "", variant: "" })
    const [products, setProducts] = useState([])
    const [oldProducts, setOldProducts] = useState([])

    const inventaryDetailState = useSelector(state => state.inventary.inventary.detail);

    useEffect(() => {
        if (inventaryDetailState.isSuccess) {
            console.log(get(inventaryDetailState, "data.data"))
            setOldProducts(get(inventaryDetailState, "data.data.countsTemplate"))
        } else {
            setOldProducts([])
        }
    }, [inventaryDetailState.isLoading])



    const getData = ({ page }) => {
        const filters = { page, inventoryid: get(edit, "item.inventoryId") }
        dispatch(getInventaryDetail(filters))
    }

    useEffect(() => {
        if (type === 2) {
            getData({ page: 1 })
        }
    }, [dispatch])


    const onDrop = useCallback((acceptedFiles, e) => {
        try {
            const newFile = acceptedFiles[0];

            if (includes(get(newFile, "name"), ".csv")) {

                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(newFile);

                fileReader.onload = (e) => {
                    try {
                        const bufferArray = e.target.result;
                        const wb = XLSX.read(bufferArray, { type: 'buffer' });
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        setProducts(XLSX.utils.sheet_to_json(ws))
                    } catch (error) {
                        fileReader.onerror = (error) => {
                            console.log(error)
                        };
                    }
                };

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
        setProducts([])
    }

    return (
        <Stack direction="row" justifyContent="space-between" spacing={2}>
            {(isEmpty(file) || type === 2) &&
                <Box flex={1}>
                    <input {...getInputProps()} />
                    <Box {...getRootProps()} >
                        <Box
                            sx={{
                                height: 250,
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
                                <g clipPath="url(#clip0_266_22168)">
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
                        <Stack justifyContent="center" alignItems="center" minHeight="100px">
                            <Box dangerouslySetInnerHTML={{ __html: __(`${module}.modal.descriptions.overwrite`) }} />
                        </Stack>
                    </Box>
                    <Notification showNoti={showNoti} setShowNoti={setShowNoti} />
                </Box >
            }
            {(!isEmpty(file) || type === 2) &&
                <Box minHeight={250} flex={1}  >
                    <Paper elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.color.neutral[300]}`, overflow: "hidden", p: 1, height: "100%" }}>

                        {!isEmpty(oldProducts) &&
                            <>
                                <Typography variant="button">{__(`${module}.modal.dropzone.current`)}</Typography>
                                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                    <Table stickyHeader size="small" aria-label="a dense table">
                                        <TableHead sx={{ "& .MuiTableCell-root": { bgcolor: ({ palette }) => palette.color.neutral[500] } }}>
                                            <TableRow >
                                                <TableCell className='truncate' >#</TableCell>
                                                <TableCell className='truncate' >Id</TableCell>
                                                <TableCell className='truncate' sx={{ maxWidth: 100 }} align="left">Name</TableCell>
                                                <TableCell className='truncate' sx={{ maxWidth: 80 }} align="center">Category</TableCell>
                                                <TableCell className='truncate' align="center">Stock ({sumBy(oldProducts, "stock")})</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {oldProducts.map((row, i) => (
                                                <TableRow
                                                    key={row.itemId}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell className='truncate' align="center">{i + 1}</TableCell>
                                                    <TableCell className='truncate' component="th" scope="row">
                                                        {row.itemId}
                                                    </TableCell>
                                                    <TableCell className='truncate' sx={{ maxWidth: 100 }} align="left" title={row.itemName}>{row.itemName}</TableCell>
                                                    <TableCell className='truncate' sx={{ maxWidth: 80 }} align="center" title={row.category}>{row.category}</TableCell>
                                                    <TableCell className='truncate' align="center">{row.stock}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br />
                            </>
                        }
                        {!isEmpty(products) &&
                            <>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" >
                                    <Typography variant="button">{__(`${module}.modal.dropzone.preload`)}</Typography>
                                    {!isEmpty(products) &&
                                        <Button sx={{ mb: 1 }} variant="contained" color="secondary" size='small' onClick={deleteFile}>{ __(`${module}.modal.dropzone.clean`)}</Button>
                                    }
                                </Stack>
                                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                    <Table stickyHeader size="small" aria-label="a dense table">
                                        <TableHead sx={{ "& .MuiTableCell-root": { bgcolor: ({ palette }) => palette.color.neutral[500] } }}>
                                            <TableRow>
                                                <TableCell className='truncate' >#</TableCell>
                                                <TableCell className='truncate'>Id</TableCell>
                                                <TableCell className='truncate' sx={{ maxWidth: 100 }} align="left" >Name</TableCell>
                                                <TableCell className='truncate' sx={{ maxWidth: 80 }} align="center">Category</TableCell>
                                                <TableCell className='truncate' align="center">Stock ({sumBy(products, "Stock")})</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {products.map((row, i) => (
                                                <TableRow
                                                    key={row.ItemId}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell className='truncate' align="center">{i + 1}</TableCell>
                                                    <TableCell className='truncate' component="th" scope="row">
                                                        {row.ItemId}
                                                    </TableCell>
                                                    <TableCell className='truncate' sx={{ maxWidth: 100 }} align="left" title={row.ItemName}>{row.ItemName}</TableCell>
                                                    <TableCell className='truncate' sx={{ maxWidth: 80 }} align="center" title={row.Category}>{row.Category}</TableCell>
                                                    <TableCell className='truncate' align="center">{row.Stock}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        }
                    </ Paper>
                </Box>
            }
        </Stack>
    )
}

export default NewInventaryDropZone
