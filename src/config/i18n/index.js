import React from 'react';
import { lowerCase, get } from 'lodash';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import auth_en from "../../assets/traslations/en/auth.json";
import glob_en from "../../assets/traslations/en/global.json";
import paym_en from "../../assets/traslations/en/payment.json";
import inve_en from "../../assets/traslations/en/inventary.json";
import count_en from "../../assets/traslations/en/counts.json";
import prod_en from "../../assets/traslations/en/product.json";
import tran_en from "../../assets/traslations/en/transfer.json";
import conf_en from "../../assets/traslations/en/config.json";
import ware_en from "../../assets/traslations/en/warehouse.json";
import inbo_en from "../../assets/traslations/en/inbound.json";
import outb_en from "../../assets/traslations/en/outbound.json";
import repo_en from "../../assets/traslations/en/report.json";
import home_en from "../../assets/traslations/en/home.json";

import auth_es from "../../assets/traslations/es/auth.json";
import glob_es from "../../assets/traslations/es/global.json";
import paym_es from "../../assets/traslations/es/payment.json";
import inve_es from "../../assets/traslations/es/inventary.json";
import count_es from "../../assets/traslations/es/counts.json";
import prod_es from "../../assets/traslations/es/product.json";
import tran_es from "../../assets/traslations/es/transfer.json";
import conf_es from "../../assets/traslations/es/config.json";
import ware_es from "../../assets/traslations/es/warehouse.json";
import inbo_es from "../../assets/traslations/es/inbound.json";
import outb_es from "../../assets/traslations/es/outbound.json";
import repo_es from "../../assets/traslations/es/report.json";
import home_es from "../../assets/traslations/es/home.json";


const I18n = ({ children }) => {

    const defaultLanguage = lowerCase(process.env.REACT_APP_START_LANG || "en");

    const getCurrentLang = () => {

        let startLang = defaultLanguage
        const preSelect = localStorage.getItem("lang");

        try {
            if (!!preSelect) {
                startLang = preSelect;
            } else {
                const dataUser = get(JSON.parse(get(JSON.parse(window.localStorage.getItem("persist:quanto")), "auth", "")), "login.dataUser", "")
                startLang = get(dataUser, "language", defaultLanguage)
            }
        } catch (error) {
            startLang = defaultLanguage
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
                pay: paym_en,
                inve: inve_en,
                count: count_en,
                prod: prod_en,
                tran: tran_en,
                conf: conf_en,
                ware: ware_en,
                inbo: inbo_en,
                outb: outb_en,
                repo: repo_en,
                home: home_en,
            },
            es: {
                global: glob_es,
                auth: auth_es,
                pay: paym_es,
                inve: inve_es,
                count: count_es,
                prod: prod_es,
                tran: tran_es,
                conf: conf_es,
                ware: ware_es,
                inbo: inbo_es,
                outb: outb_es,
                repo: repo_es,
                home: home_es,
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