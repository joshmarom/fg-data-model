import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Center } from '@mantine/core';
import { ThemeProvider } from './ThemeProvider';
import { LoginButton } from './LoginButton';
import { SheetsLoader } from './SheetsLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

const useAccessToken = () => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  const handleSuccess = (token: string, expiresIn: number) => {
    setAccessToken(token);
    const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expiresIn', expirationTime.getTime().toString());
  };

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expiresIn = localStorage.getItem('expiresIn');
    if (!token || !expiresIn) return;
    const now = new Date().getTime();
    const expirationTime = new Date(Number(expiresIn)).getTime();
    if (now < expirationTime) setAccessToken(token);
  }, []);

  return { accessToken, handleSuccess };
};

const App = () => {
  const { accessToken, handleSuccess } = useAccessToken();
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          {accessToken ? (
            <SheetsLoader accessToken={accessToken} />
          ) : (
            <Center h="100vh">
              <LoginButton handleError={console.log} handleSuccess={handleSuccess} />
            </Center>
          )}
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};
export default App;
