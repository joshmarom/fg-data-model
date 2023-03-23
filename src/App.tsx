import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Container } from '@mantine/core';
import { ThemeProvider } from './ThemeProvider';
import { LoginButton } from './LoginButton';
// import { useGoogleSheets } from './API/googleSheetsAPI';

const App = () => (
  //const { sheets, selectedSheet, sheetData, error, updateSheetData, setSelectedSheet } = useGoogleSheets();
  <ThemeProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Container ta="center" mt="xl">
        <LoginButton />
      </Container>
      {/*
      <Button onClick={() => login()}>Sign in with Google 🚀 </Button>;
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
export default App;
