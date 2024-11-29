import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppProvider } from './contexts/AppContext';
import CombinedGradingView from './pages/CombinedGradingView';
import StudentSelect from './components/StudentSelect';
import Header from './components/layout/Header';
import { theme } from './theme/theme';
import './styles/grading.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <Box component="main" sx={{ flex: 1, py: 4 }}>
              <Container maxWidth="md">
                <Routes>
                  <Route path="/" element={<StudentSelect />} />
                  <Route
                    path="/student/:studentId"
                    element={<CombinedGradingView />}
                  />
                </Routes>
              </Container>
            </Box>
          </Box>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;