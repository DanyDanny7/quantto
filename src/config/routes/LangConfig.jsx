import moment from "moment";
import { useTranslation } from "react-i18next";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const LangConfig = ({ children }) => {
    const [__, i18n] = useTranslation("auth");
    moment.locale(i18n.language);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
            {children}
        </LocalizationProvider>
    )
};

export default LangConfig;
