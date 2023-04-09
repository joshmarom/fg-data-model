import React from 'react';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = import.meta.env.VITE_SPREADSHEET_ID;
const apiKey = import.meta.env.VITE_API_KEY;

export const useSheetData = (accessToken: string) => {
  const [activeSheet, setActiveSheet] = React.useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['FG_DATA_MODEL'],
    queryFn: () =>
      fetch(`${BASE_URL}/${sheetId}/?key=${apiKey}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
  });
  const { data: sheetData } = useQuery({
    queryKey: ['SHEET_DATA', activeSheet],
    enabled: !!activeSheet,
    queryFn: () =>
      fetch(`${BASE_URL}/${sheetId}/values/${activeSheet}/?key=${apiKey}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => res.json()),
  });

  return { activeSheet, data, isLoading, error, setActiveSheet, sheetData };
};
