import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../home';
import { DEFAULT_ROUTE, MAIN_ROUTE } from '../../utils/constants';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2B3035'
    },
    background: {
      default: "#F8F9FA",
      paper: "#F1F3F5"
    }
  },
  typography: {
    fontFamily: 'Roboto',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={MAIN_ROUTE} element={<Home />} />
          <Route path={"*"} element={<Navigate to={DEFAULT_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
