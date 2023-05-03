import React from 'react';
import { SheetColumnHeader, sheetColumnsMap, SheetRow } from '../helpers/sheetParser';
import { CellValue } from '../helpers';

const rowsToReadableJson = (rows: SheetRow[]) =>
  JSON.stringify(
    rows.map((row: SheetRow) =>
      Object.entries(row).reduce(
        (acc, [k, v]) => (v ? { ...acc, [sheetColumnsMap[k] || k]: v } : acc),
        {} as { [key in SheetColumnHeader]: CellValue }
      )
    ),
    null,
    2
  );
export const useRowsJsonUrl = (rows: SheetRow[]) =>
  React.useMemo(
    () => URL.createObjectURL(new Blob([rowsToReadableJson(rows)], { type: 'application/json' })),
    [rows]
  );
