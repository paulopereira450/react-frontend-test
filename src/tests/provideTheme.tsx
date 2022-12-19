import { ReactElement } from 'react';
import { theme } from '../components/app/App';
import { ThemeProvider } from '@mui/material';

export default (ui: ReactElement): ReactElement => {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>
};