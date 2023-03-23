import { google, sheets_v4 } from 'googleapis';
import { useEffect, useState } from 'react';

const googleSheets = google.sheets('v4');
const spreadsheetId = import.meta.env.VITE_SPREADSHEET_ID;

const getGoogleAuth = async () => {
  const auth = new google.auth.OAuth2(
    import.meta.env.VITE_CLIENT_ID,
    import.meta.env.VITE_CLIENT_SECRET,
    import.meta.env.VITE_REDIRECT_URI
  );

  console.log(import.meta.env.VITE_CLIENT_ID);

  // Retrieve the stored access token and refresh token (if you have them)
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return auth;
};

type Sheets = sheets_v4.Schema$Sheet[] | undefined;
type SheetData = any[][] | null | undefined;

export const useGoogleSheets = () => {
  const [sheets, setSheets] = useState<Sheets>(undefined);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetData, setSheetData] = useState<SheetData>(undefined);
  const [error, setError] = useState<string | null>(null);
  const fetchSheets = async () => {
    const auth = await getGoogleAuth();
    try {
      const response = await googleSheets.spreadsheets.get({
        spreadsheetId,
        auth,
      });

      setSheets(response.data.sheets);
    } catch (err) {
      setError(`Error getting sheets: ${err}`);
    }
  };
  const readSheetData = async () => {
    if (!selectedSheet) return;
    try {
      const auth = await getGoogleAuth();
      const response = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: selectedSheet,
        auth,
      });
      setSheetData(response.data.values);
    } catch (err) {
      setError(`Error reading sheet data for ${selectedSheet}: ${err}`);
    }
  };
  const updateSheetData = async (
    cell: string,
    value: string | number | undefined | null | boolean
  ) => {
    try {
      const auth = await getGoogleAuth();

      const updateObject = {
        spreadsheetId,
        range: `${selectedSheet}!${cell}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[value]],
        },
        auth,
      };
      await googleSheets.spreadsheets.values.update(updateObject);
    } catch (err) {
      setError(`Error updating sheet data for ${selectedSheet}: ${err}`);
    }
  };

  useEffect(() => {
    if (!sheets) fetchSheets();
  }, [sheets]);

  useEffect(() => {
    if (selectedSheet) readSheetData();
  }, [selectedSheet]);

  return {
    sheets,
    selectedSheet,
    sheetData,
    error,
    updateSheetData,
    setSelectedSheet,
  };
};
