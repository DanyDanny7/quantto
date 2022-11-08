import { ThemeProvider } from '@mui/material/styles';

import theme from "./config/theme";
import RouterApp from "./config/routes/Provider";
import ProviderI18n from "./config/i18n";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProviderI18n>
        <RouterApp />
      </ProviderI18n>
    </ThemeProvider>
  );
}

export default App;
