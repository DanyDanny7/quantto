import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import 'moment/locale/es'

import theme from "./config/theme";
import RouterApp from "./config/routes/Provider";
import LangConfig from "./config/routes/LangConfig";
import ProviderI18n from "./config/i18n";
import * as GA from "./config/GA/config";

const App = () => {

  useEffect(() => {
    GA.initGA();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ProviderI18n>
          <LangConfig>
            <RouterApp />
          </LangConfig>
      </ProviderI18n>
    </ThemeProvider>
  );
}

export default App;
