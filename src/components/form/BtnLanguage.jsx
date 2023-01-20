import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const BtnLanguage = ({ active, onClickEn, onClickEs }) => {
    return (
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="selected-language"
            name="language"
            color="primary"
        >
            <Button color={active === "es" ? "primary" : "disabled"} onClick={onClickEs} sx={{ width: 40 }}>ES</Button>
            <Button color={active === "en" ? "primary" : "disabled"} onClick={onClickEn} sx={{ width: 40 }}>EN</Button>
        </ButtonGroup>
    )
}

export default BtnLanguage