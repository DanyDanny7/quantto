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
    },
    warning: {
        main: alert[300]
    },
    success: {
        main: success[300]
    },
    text: {
        lite: neutral[500],
        main: neutral[800],
    },
    color: { alert, blue, error, green, greenlight, neutral, orange, pink, purple, purplelight, skyblue, success }
};

export default palette;