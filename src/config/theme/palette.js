import { alert, blue, error, green, greenlight, neutral, orange, pink, purple, purplelight, skyblue, success } from "./colors";

const palette = {
    primary: {
        main: orange[500],
    },
    secondary: {
        main: blue[500],
    },
    error: {
        main: error[300],
        contrastText: neutral[50]
    },
    warning: {
        main: alert[300],
        contrastText: neutral[50]
    },
    success: {
        main: success[300],
        contrastText: neutral[50]
    },
    disabled: {
        main: neutral[500],
        contrastText: neutral[50]
    },
    text: {
        sslite: neutral[200],
        slite: neutral[400],
        lite: neutral[500],
        main: neutral[800],
        dark: neutral[900],
    },
    background: {
        base: neutral[100]
    },
    color: { alert, blue, error, green, greenlight, neutral, orange, pink, purple, purplelight, skyblue, success }
};

export default palette;