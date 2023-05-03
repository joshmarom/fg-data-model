import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { isSheetData, Sheet } from '../helpers';
import { parseSheetData } from '../helpers/sheetParser';
import { onlyValidSheets } from '../helpers/invalidSheets';
import { useStore } from '../store';

const { VITE_SPREADSHEET_ID: sheetId, VITE_API_KEY: apiKey } = import.meta.env;
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export const useSheetData = (accessToken: string, activeSheet: string | null) => {
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

  useStore.setState({ sheetDataIsValid: isSheetData(sheetData) });
  const sheetDataIsValid = useStore((state) => state.sheetDataIsValid);
  const sheets = React.useMemo(() => (data?.sheets ? onlyValidSheets(data.sheets) : []), [data]);
  const sheet = React.useMemo(
    () => sheets.find((s: Sheet) => s.properties.title === activeSheet),
    [sheets, activeSheet]
  );
  const rows = React.useMemo(
    () => (sheetDataIsValid ? parseSheetData(sheetData) : []),
    [sheetDataIsValid, sheetData]
  );
  const iframeUrl = React.useMemo(
    () =>
      !rows.length || !sheet || !data
        ? undefined
        : `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit#gid=${sheet.properties.sheetId}`,
    [rows.length, sheet, data]
  );

  return {
    activeSheet,
    data: {
      iframeUrl,
      sheets,
      sheet,
      rows,
      sheetDataIsValid,
      raw: {
        FG_DATA_MODEL: data,
        SHEET_DATA: sheetData,
      },
    },
    isLoading,
    error,
  };
};
