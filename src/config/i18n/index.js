import React from 'react';
import { lowerCase } from 'lodash';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import auth_en from "../../assets/traslations/en/auth.json";
import glob_en from "../../assets/traslations/en/global.json";
import hist_en from "../../assets/traslations/en/history.json";
import inve_en from "../../assets/traslations/en/inventary.json";
import count_en from "../../assets/traslations/en/counts.json";

import auth_es from "../../assets/traslations/es/auth.json";
import glob_es from "../../assets/traslations/es/global.json";
import hist_es from "../../assets/traslations/es/history.json";
import inve_es from "../../assets/traslations/es/inventary.json";
import count_es from "../../assets/traslations/es/counts.json";


const I18n = ({ children }) => {

    const getCurrentLang = () => {
        let startLang = lowerCase(process.env.REACT_APP_START_LANG || "en");
        const preSelect = localStorage.getItem("lang");

        if (!!preSelect) {
            startLang = preSelect;
        } else {
            const current = navigator.language || navigator.userLanguage
            if (!!current) {
                startLang = current;
            }
        }
        return startLang;
    }

    i18next.init({
        interpolation: { escapeValue: false },
        lng: getCurrentLang(),
        resources: {
            en: {
                global: glob_en,
                auth: auth_en,
                hist: hist_en,
                inve: inve_en,
                count: count_en,
            },
            es: {
                global: glob_es,
                auth: auth_es,
                hist: hist_es,
                inve: inve_es,
                count: count_es,
            },
        }
    })

    return (
        <I18nextProvider i18n={i18next} >
            {children}
        </I18nextProvider>
    )
}

export default I18n