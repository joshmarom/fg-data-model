import { sheets_v4 } from 'googleapis';
import { MantineTheme } from '@mantine/core';

export interface Sheet extends sheets_v4.Schema$Sheet {
  properties: sheets_v4.Schema$SheetProperties;
}
export interface ResponseWithSheets extends sheets_v4.Schema$Spreadsheet {
  sheets: Sheet[];
}
export type CellValue = string | number | null | undefined;
export type Row = CellValue[];
export interface SheetData extends sheets_v4.Schema$ValueRange {
  values: Row[];
}

export const isSheets = (sheets: any): sheets is Sheet[] =>
  Array.isArray(sheets) &&
  sheets.every((item) => typeof item === 'object') &&
  sheets.length &&
  sheets.reduce((acc, item) => acc && item.properties, true);
export const isValidResponse = (value: any): value is ResponseWithSheets =>
  typeof value === 'object' && isSheets(value.sheets) && value.sheets.length > 0;
export const isSheetData = (sheet: any): sheet is SheetData =>
  typeof sheet === 'object' && Array.isArray(sheet.values) && sheet.values.length > 0;
export const strToKey = (str: string) => str.replace(/(\r\n|\n|\r|[^a-zA-Z0-9])/gm, '');
export const clearString = (str: string) => str.replace(/(\s*[\r\n]+\s*|\s+)/gm, ' ').trim();
export const getSheetName = (sheet: Sheet) => sheet.properties.title ?? 'Untitled';
export const getSheetId = (sheet: Sheet) => sheet.properties.sheetId ?? 0;
export const borderColor = ({ colors, colorScheme }: MantineTheme) =>
  colorScheme === 'dark' ? colors.dark[5] : colors.gray[3];
