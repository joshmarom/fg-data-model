import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginScreen } from './components/LoginScreen';
import { useAccessToken } from './hooks/useAccessToken';
import { ThemeProvider } from './ThemeProvider';
import { Content } from './Content';

const App = () => {
  const { accessToken, handleSuccess } = useAccessToken();
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        {accessToken ? (
          <Content accessToken={accessToken} />
        ) : (
          <LoginScreen handleSuccess={handleSuccess} />
        )}
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};
export default App;
