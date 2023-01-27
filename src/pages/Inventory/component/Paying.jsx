/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { get } from "lodash";
import { useNavigate } from 'react-router-dom';

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
    FormControl,
    TextField,
    Paper,
    CardMedia,
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from "react-redux";

import { postInventaryPayRequest } from "../../../store/inventary/actions/inventary/detail/postInventaryPay";
import { getInventaryDetailPaying } from "../../../store/inventary/thunk/getInventary/detail/getDetailsPaying";

const InputNumberCustom = React.forwardRef(function InputNumberCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="0000 0000 0000 0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputDateCustom = React.forwardRef(function InputDateCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00/00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const InputCvvCustom = React.forwardRef(function InputCvvCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const NewInventory = ({ open, setOpen, __, module, inventaryId, setError, setSuccess, getData, closeAlert }) => {
    const navegate = useNavigate();
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [loadPay, setLoadPay] = useState(false);
    const [cvvFocus, setCvvFocus] = useState(false);
    const [mount, setMount] = useState(false);
    const [values, setValues] = useState({
        number: '',
        date: '',
        cvv: '',
    });

    useEffect(() => {
        setMount(true)
        dispatch(getInventaryDetailPaying({ inventoryid: inventaryId }))
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const userState = useSelector(state => state.auth.login.dataUser);
    const getPaying = useSelector(state => state.inventary.inventary.paying.data);
    const getState = useSelector(state => state);

    const handleClose = () => {
        setOpen(false);
        setName("")
        setValues({
            number: '',
            date: '',
            cvv: '',
        })
        setLoadPay(false)
    };

    const onSubmit = () => {
        const body = {
            language: get(userState, "language", "es"),
            userid: get(userState, "userId"),
            companyid: Number(get(userState, "companyId")),
            correoelectronico: get(userState, "email", "es"),
            inventoryid: inventaryId,
            primernombre: name,
            tarjetanumero: get(values, "number", "")?.replaceAll(" ", ""),
            tarjetacvv2: get(values, "cvv", ""),
            tarjetavigencia: get(values, "date", ""),
        }
        setLoadPay(true)
        postInventaryPayRequest(body, () => getState)
            .then(({ data }) => {
                if (get(data, "success")) {
                    const success = {
                        title: __(`${module}.actions.pay.success.title`),
                        subtitle: __(`${module}.actions.pay.success.subtitle`),
                        btn: __(`${module}.actions.pay.success.btn-1`),
                        func: () => navegate(`/inventory/${inventaryId}`),
                        btn2: __(`${module}.actions.pay.success.btn-2`),
                        func2: closeAlert
                    }
                    setSuccess(success, inventaryId)
                    setLoadPay(false)
                    handleClose()
                    getData()
                } else {
                    const err = {
                        response: {
                            data: {
                                Message: get(data, "returnCode"),
                                ValidationError: [get(data, "message"),]
                            }
                        }
                    }
                    setError(err);
                    setLoadPay(false);
                }

            })
            .catch((err) => { setError(err, "pay"); setLoadPay(false) })
    }

    const disabledBtn = () => {
        if (
            name.length > 5
            && get(values, "number").length === 19
            && get(values, "date").length === 5
            && get(values, "cvv", "").length === 3
        ) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="modal-new-inventory"
                open={open}
                maxWidth="lg"
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
                    {__(`${module}.actions.title`)}
                </DialogTitle>
                <DialogContent dividers sx={{ m: 0, p: 0 }}>
                    <Box className='p-4 flex-1'>
                        <Stack direction="column" spacing={3} >
                            <Typography variant="bodyMedium">{__(`${module}.actions.subtitle`)}</Typography>
                        </Stack>
                    </Box>
                    <Divider />
                    <Box className='p-4 flex-1'>
                        <Stack direction="row" spacing={3} >
                            <Stack direction="column" spacing={3} >
                                <FormControl sx={{ width: 305 }}  >
                                    <Typography className='pb-2' component="label" htmlFor="name" >
                                        {__(`${module}.actions.pay.input.name.label`)}
                                    </Typography>
                                    <TextField
                                        id="name"
                                        name="name"
                                        placeholder={__(`${module}.actions.pay.input.name.placeholder`)}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        color="secondary"
                                        size="small"
                                    />
                                </FormControl>
                                <FormControl sx={{ width: 305 }}  >
                                    <Typography className='pb-2' component="label" htmlFor="number" >
                                        {__(`${module}.actions.pay.input.number.label`)}
                                    </Typography>
                                    <TextField
                                        value={values.number}
                                        onChange={handleChange}
                                        name="number"
                                        id="number"
                                        placeholder={__(`${module}.actions.pay.input.number.placeholder`)}
                                        InputProps={{
                                            inputComponent: InputNumberCustom,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                    />
                                </FormControl>
                                <FormControl sx={{ width: 305 }}  >
                                    <Typography className='pb-2' component="label" htmlFor="date" >
                                        {__(`${module}.actions.pay.input.date.label`)}
                                    </Typography>
                                    <TextField
                                        value={values.date}
                                        onChange={handleChange}
                                        name="date"
                                        id="date"
                                        placeholder={__(`${module}.actions.pay.input.date.placeholder`)}
                                        InputProps={{
                                            inputComponent: InputDateCustom,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                    />
                                </FormControl>
                                <FormControl sx={{ width: 305 }}  >
                                    <Typography className='pb-2' component="label" htmlFor="cvv" >
                                        {__(`${module}.actions.pay.input.cvv.label`)}
                                    </Typography>
                                    <TextField
                                        value={values.cvv}
                                        onChange={handleChange}
                                        name="cvv"
                                        id="cvv"
                                        placeholder={__(`${module}.actions.pay.input.cvv.placeholder`)}
                                        InputProps={{
                                            inputComponent: InputCvvCustom,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onFocus={() => setCvvFocus(true)}
                                        onBlur={() => setCvvFocus(false)}
                                    />
                                </FormControl>
                            </Stack>
                            <Box p={2} className="flex-1 flex" >
                                <Box className='flex justify-center items-center flex-1' sx={{ bgcolor: theme => theme.palette.color.neutral[100], borderRadius: 4 }}>
                                    <Stack direction="row" spacing={3}>
                                        <Box class="boxesContainer"
                                            style={{
                                                float: "left",
                                                fontSize: "1.2em",
                                                perspective: "800px",
                                                transition: "all 0.3s ease 0s",
                                                "@keyframes giro": {
                                                    from: {
                                                        transform: "rotateY(180deg)",
                                                    },
                                                    "to": {
                                                        transform: "rotateY(0deg)",
                                                    },
                                                },
                                                "@-webkit-keyframes giro": {
                                                    from: {
                                                        transform: "rotateY(180deg)",
                                                    },
                                                    to: {
                                                        transform: "rotateY(0deg)",
                                                    }
                                                },
                                            }}
                                        >
                                            <Box class="cardBox">
                                                <Box class="card"
                                                    style={{
                                                        cursor: "default",
                                                        transform: cvvFocus ? "rotateY(180deg)" : "rotateY(0deg)",
                                                        transformStyle: "preserve-3d",
                                                        transition: mount && "transform 0.4s ease 0s",
                                                        "-webkit-animation": "giro 1s 1",
                                                        animation: "giro 1s 1",
                                                        width: 182,
                                                        height: 264,
                                                        borderRadius: 4,
                                                        position: "relative"
                                                    }}
                                                >
                                                    <Box class="front"
                                                        style={{
                                                            backfaceVisibility: "hidden",
                                                            boxSizing: "border-box",
                                                            display: "block",
                                                            fontSize: "1.2em",
                                                            height: "100%",
                                                            position: "absolute",
                                                            top: 0,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Box sx={{ width: 182, height: 264, borderRadius: 4, position: "relative" }}>
                                                            <CardMedia
                                                                component="img"
                                                                src="/images/card.svg"
                                                                alt="card-type"
                                                                sx={{ width: 182, height: 264, position: "absolute", top: 0, left: 0, zIndex: 1 }}
                                                            />
                                                            <Box sx={{
                                                                height: "100%",
                                                                width: "100%",
                                                                position: "relative",
                                                                zIndex: 2,
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: "flex-end",
                                                                px: 2,
                                                                pt: 2,
                                                                pb: 4
                                                            }}>
                                                                <Typography variant="bodyXtraSmall" color="text.dark" gutterBottom>{name || __(`${module}.actions.pay.input.name.label`)}</Typography>
                                                                <Typography variant="bodyXtraSmall" color="text.lite" gutterBottom>{get(values, "number") || __(`${module}.actions.pay.input.number.placeholder`)}</Typography>
                                                                <Typography variant="bodyXtraSmall" color="text.lite" gutterBottom>{get(values, "date") || __(`${module}.actions.pay.input.date.placeholder`)}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    <Box class="back"
                                                        style={{
                                                            backfaceVisibility: "hidden",
                                                            boxSizing: "border-box",
                                                            display: "block",
                                                            fontSize: "1.2em",
                                                            height: "100%",
                                                            position: "absolute",
                                                            top: 0,
                                                            width: "100%",
                                                            transform: "rotateY( 180deg)",
                                                        }}
                                                    >
                                                        <Box sx={{ width: 182, height: 264, borderRadius: 4, position: "relative" }}>
                                                            <Box sx={{ width: 182, height: 264, borderRadius: 4, position: "relative" }}>
                                                                <CardMedia
                                                                    component="img"
                                                                    src="/images/card-2.svg"
                                                                    alt="card-type"
                                                                    sx={{ width: 182, height: 264, position: "absolute", top: 0, left: 0, zIndex: 1 }}
                                                                />
                                                                <Box sx={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                    position: "relative",
                                                                    zIndex: 2,
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "flex-end",
                                                                    px: 2,
                                                                    pt: 2,
                                                                    pb: 4
                                                                }}>
                                                                    <Typography variant="bodyXtraSmall" color="text.lite" gutterBottom>{get(values, "cvv") || "CVV"}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Paper component={Box} elevation={0} sx={{ width: 310, bgcolor: "transparent", pl: 1 }} >
                                            <Box py={2}>
                                                <Typography variant="heading4">{__(`${module}.actions.data.title`)}</Typography>
                                            </Box>
                                            <Divider />
                                            <table className='my-2' >
                                                <tr>
                                                    <td className='py-2'><Typography variant="buttonSmall">{__(`${module}.actions.data.name`)}</Typography></td>
                                                    <td className='py-2 pl-2'><Typography variant="bodySmall">{get(getPaying, "data.inventoryname", "-")}</Typography></td>
                                                </tr>
                                                <tr>
                                                    <td className='py-2'><Typography variant="buttonSmall">{__(`${module}.actions.data.products`)}</Typography></td>
                                                    <td className='py-2 pl-2'><Typography variant="bodySmall">{get(getPaying, "data.totalitems", "-")}</Typography></td>
                                                </tr>
                                                <tr>
                                                    <td className='py-2'><Typography variant="buttonSmall">{__(`${module}.actions.data.counters`)}</Typography></td>
                                                    <td className='py-2 pl-2'><Typography variant="bodySmall">{get(getPaying, "data.counters", "-")}</Typography></td>
                                                </tr>
                                            </table>
                                            <Divider />
                                            <Box py={1}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Typography variant="buttonSmall">Monto total a pagar:</Typography>
                                                    <Box
                                                        sx={{
                                                            borderRadius: 1,
                                                            p: 1,
                                                            color: theme => theme.palette.color.success[400],
                                                            bgcolor: theme => theme.palette.color.success[50],
                                                        }}
                                                    >
                                                        <Typography variant="bodySmall">{`$ ${get(getPaying, "data.amount", "-")} USD`}</Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Paper>

                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent >
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={handleClose}
                            sx={{ color: (theme) => theme.palette.color.neutral[800] }}
                        >
                            {__(`${module}.actions.cancel`)}
                        </Button>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            loading={loadPay}
                            disabled={disabledBtn()}

                        >
                            {__(`${module}.actions.submit`)}
                        </LoadingButton>
                    </Stack>
                </DialogActions>
            </Dialog >
        </div >
    );
}

export default NewInventory;