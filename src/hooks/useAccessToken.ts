import React from 'react';

const seed = `${import.meta.env.VITE_SPREADSHEET_ID}${import.meta.env.VITE_API_KEY}`;

const encryptDecrypt = (token: string, encrypt: boolean = true) =>
  token
    .split('')
    .map((char, i) =>
      String.fromCharCode(
        char.charCodeAt(0) + (encrypt ? 1 : -1) * seed.charCodeAt(i % seed.length)
      )
    )
    .join('');

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  const handleSuccess = (token: string, expiresIn: number) => {
    setAccessToken(token);
    const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('accessToken', encryptDecrypt(token));
    localStorage.setItem('expiresIn', expirationTime.getTime().toString());
  };

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expiresIn = localStorage.getItem('expiresIn');
    if (!token || !expiresIn) return;
    const now = new Date().getTime();
    const expirationTime = new Date(Number(expiresIn)).getTime();
    if (now < expirationTime) setAccessToken(encryptDecrypt(token, false));
  }, []);

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
  };

  return { accessToken, handleSuccess, logout };
};
