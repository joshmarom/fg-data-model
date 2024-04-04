import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginScreen } from './components/LoginScreen';
import { useAccessToken } from './hooks/useAccessToken';
import { ThemeProvider } from './ThemeProvider';
import { Content } from './Content';
import { FunGuard } from './funguard/FunGuard';
import { Shop } from './Shop/Shop';

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
            <Shop />
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                    {accessToken ? (
                        <Content accessToken={accessToken} />
                    ) : (
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<FunGuard />} />
                                <Route
                                  path="/login"
                                  element={<LoginScreen handleSuccess={handleSuccess} />}
                                />
                            </Routes>
                        </BrowserRouter>
                    )}
                </GoogleOAuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
export default App;
