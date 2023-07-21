import { createTheme } from '@mui/material/styles';

import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from "./typography";
import shadows from "./shadows";

export default createTheme({
    palette,
    breakpoints,
    typography,
    shadows,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    "&:disabled": {
                        background: palette.color.neutral[600],
                        color: palette.color.neutral[50],
                    }
                },
            }
        }
    }
});

