import { CellValue, clearString, SheetData, strToKey } from './helpers';

export const sheetColumns = [
  'Record View Order',
  'Recird View Order',
  'Record View order',
  'Display Name',
  'Full Display Name',
  'Data Path',
  'Data path',
  'Data Type',
  'Required (Y/N)',
  'Default Value',
  'Data Constraints',
  'Indexed (Y/N)',
  'Description',
  'Display Type',
  'List Chart Order',
  'List View Order',
  'List Preview Header',
  'Category for Record View',
  'Record Strip Order',
  'Hover View Order',
  'Editable (Y/N)',
  'Are you sure? Condition',
  'Should Automation Ignore?',
  'Require for currency precision',
  'Require for currency precision Condition', // starts getting weird here
  'Deltas List View Order',
  'Tab',
  'Tool Tip',
  'UI',
  'Static Data Sheet',
  'Example',
  'Examples',
  'Location of Enum',
  'Private',
  'Attribute Name',
  'subEntity',
  'security sub class',
  'FG Attribute Name',
  'Code (TAG)',
  'Counter',
  'Required_Y_N',
  //'Indexed_Y_N',
] as const;

const normalizeRequired = (str: SheetColumnHeader): SheetColumnHeader =>
  str === 'Required_Y_N' ? 'Required (Y/N)' : str;
export const sheetColumnsMap = sheetColumns
  .map(normalizeRequired)
  .reduce(
    (acc, column) => ({ ...acc, [strToKey(column)]: column }),
    {} as { [key: string]: SheetColumnHeader }
  );

export const getHeaderName = (key: string) => sheetColumnsMap[key];

export type SheetColumnHeader = (typeof sheetColumns)[number];

export type SheetRow = {
  [key in keyof typeof sheetColumnsMap]?: CellValue;
};

export const isHeaderRow = (arr: unknown[]): arr is SheetColumnHeader[] =>
  Array.isArray(arr) && arr.some((v) => sheetColumns.includes(v));
const maybeStringToNumber = (str: CellValue) =>
  str === '0' ? 0 : Number.isNaN(Number(str)) || Number(str) === 0 ? str : Number(str);
const isString = (str: CellValue): str is string => typeof str === 'string';
export const isValidRow = (row: SheetRow) => {
  const {
    DataPath,
    DisplayName,
    FullDisplayName,
    RecordViewOrder,
    DataType,
    CategoryforRecordView,
  } = row;
  const isOrderValid =
    !!RecordViewOrder && typeof Number(RecordViewOrder) === 'number' && Number(RecordViewOrder) > 0;
  const isNameValid = !!DisplayName || !!FullDisplayName;
  return isNameValid && (isOrderValid || !!DataType || !!DataPath || !!CategoryforRecordView);
};
export const parseSheetData = (data: SheetData): SheetRow[] => {
  const headers = data.values[0].filter(isString).map(clearString);
  if (!isHeaderRow(headers)) return [];

  const headerIndices: { [key: string]: number } = headers.reduce(
    (acc, h, i) => ({ ...acc, [h]: i }),
    {} as { [key in SheetColumnHeader]: number }
  );

  return data.values
    .slice(1)
    .map((row) =>
      headers.reduce(
        (acc, header) => ({
          ...acc,
          [strToKey(header)]: maybeStringToNumber(row[headerIndices[header]]),
        }),
        {} as SheetRow
      )
    )
    .filter(isValidRow);
};
