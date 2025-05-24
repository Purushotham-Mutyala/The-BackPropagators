import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AlertType = 'success' | 'warning' | 'error' | 'info' | null;

interface AlertContextProps {
  alert: {
    type: AlertType;
    message: string;
  } | null;
  showAlert: (type: AlertType, message: string, duration?: number) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showAlert = (type: AlertType, message: string, duration = 5000) => {
    // Clear any existing timeout
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    setAlert({ type, message });

    // Auto-hide alert after duration
    if (duration > 0) {
      const id = window.setTimeout(() => {
        setAlert(null);
      }, duration);
      setTimeoutId(id);
    }
  };

  const hideAlert = () => {
    setAlert(null);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};