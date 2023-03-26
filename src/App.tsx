import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Center } from '@mantine/core';
import { ThemeProvider } from './ThemeProvider';
import { LoginButton } from './LoginButton';
import { SheetsLoader } from './SheetsLoader';
import { useAccessToken } from './hooks/useAccessToken';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

const App = () => {
  const { accessToken, handleSuccess } = useAccessToken();

  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            {accessToken ? (
              <Routes>
                <Route path="/" element={<SheetsLoader accessToken={accessToken} />} />
                <Route
                  path="/sheet/:sheetTitle"
                  element={<SheetsLoader accessToken={accessToken} />}
                />
              </Routes>
            ) : (
              <Center h="100vh">
                <LoginButton handleError={console.log} handleSuccess={handleSuccess} />
              </Center>
            )}
          </BrowserRouter>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};
export default App;
