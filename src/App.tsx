import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Container } from '@mantine/core';
import useGoogleSheets from 'use-google-sheets';
import { ThemeProvider } from './ThemeProvider';
import { LoginButton } from './LoginButton';
//import { useGoogleSheets } from './API/googleSheetsAPI';

console.log(import.meta.env.VITE_CLIENT_ID);
const App = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: 'AIzaSyAI_BguFhFXwdpO57wGXduM3mYpAvFfSB4',
    sheetId: '17Iw05GqKoKwwzcZomiU4U6flMLC3J08jRlDhVsIhrkc',
  });

  //const { sheets, selectedSheet, sheetData, error, updateSheetData, setSelectedSheet } = useGoogleSheets();
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Container ta="center" mt="xl">
          <LoginButton handleError={console.log} handleSuccess={console.log} />
        </Container>
        {loading && <div>Loading...</div>}
        {error && <div>{error.response.statusText}</div>}
        {data && <div>{JSON.stringify(data)}</div>}
        {/*
      {selectedSheet && <div>{selectedSheet}</div>}
      {error && <div>{error}</div>}
      {sheets &&
        sheets.map(({ properties }) => {
          const title = properties?.title;
          return title ? <div key={title}>{title}</div> : null;
        })}
      )
        */}
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};
export default App;
