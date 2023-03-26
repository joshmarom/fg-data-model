import React from 'react';

export const useAccessToken = () => {
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

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
  };

  return { accessToken, handleSuccess, logout };
};
