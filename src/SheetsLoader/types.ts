import { sheets_v4 } from 'googleapis';

export interface Sheet extends sheets_v4.Schema$Sheet {
  properties: sheets_v4.Schema$SheetProperties;
}
