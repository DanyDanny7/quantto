import React from 'react';

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import auth_en from "../../assets/traslations/en/auth.json";
import auth_es from "../../assets/traslations/es/auth.json";

import global_en from "../../assets/traslations/en/global.json";
import global_es from "../../assets/traslations/es/global.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "es",
    resources: {
        en: {
            auth: auth_en,
            global: global_en
        },
        es: {
            auth: auth_es,
            global: global_es
        },
    }
})

const I18n = ({ children }) => {
    return (
        <I18nextProvider i18n={i18next} >
            {children}
        </I18nextProvider>
    )
}

export default I18n