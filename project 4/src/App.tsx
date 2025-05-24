import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import ScanPage from './pages/ScanPage';
import HistoryPage from './pages/HistoryPage';
import EducationPage from './pages/EducationPage';
import SettingsPage from './pages/SettingsPage';

// Context providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AlertProvider } from './contexts/AlertContext';
import { ScanProvider } from './contexts/ScanContext';

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <ScanProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="scan" element={<ScanPage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </Router>
        </ScanProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;