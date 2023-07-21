import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
// import { useDispatch, useSelector } from "react-redux";
// import { get } from 'lodash';

// import { updateData } from "../../store/auth/actions/login"

const BtnLanguage = ({ active, onClickEn, onClickEs }) => {
    // const dispatch = useDispatch()
    // const login = useSelector(state => state.auth.login);

    const onClick = (lang) => () => {
        localStorage.setItem("lang", lang)
        switch (lang) {
            case "es": onClickEs(lang); break;
            default: onClickEn(lang); break;
        }

        // try {
        //     const dataUser = get(login, "dataUser")
        //     dataUser.language = lang;
        //     const dataLogin = { ...login, dataUser, allResp: { ...login.allResp, data: dataUser } }
        //     dispatch(updateData(dataLogin))
        // } catch (error) {

        // }
    }

    return (
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="selected-language"
            name="language"
            color="primary"
        >
            <Button color={active === "es" ? "primary" : "disabled"} onClick={onClick("es")} sx={{ width: 40 }}>ES</Button>
            <Button color={active === "en" ? "primary" : "disabled"} onClick={onClick("en")} sx={{ width: 40 }}>EN</Button>
        </ButtonGroup>
    )
}

export default BtnLanguage