import { create } from 'zustand';
import { Sheet } from './types';

type State = {
  activeSheet: string | null;
  iframeMode: boolean;
  openRow: string | null;
  openCat: string | null;
  sheetDataIsValid: boolean;
  sheets: Sheet[];
  sheet: Sheet | undefined;
};

type Action = {
  setActiveSheet: (sheet: State['activeSheet']) => void;
  toggleIframeMode: () => void;
  setOpenRow: (row: State['openRow']) => void;
  setOpenCat: (cat: State['openCat']) => void;
  setSheetDataIsValid: (valid: State['sheetDataIsValid']) => void;
  setSheets: (sheets: State['sheets']) => void;
  setSheet: (sheet: State['sheet']) => void;
};

export const useStore = create<State & Action>((set) => ({
  activeSheet: null,
  setActiveSheet: (sheet) => set(() => ({ activeSheet: sheet })),
  iframeMode: false,
  toggleIframeMode: () => set((state) => ({ iframeMode: !state.iframeMode })),
  openRow: null,
  setOpenRow: (row) => set(() => ({ openRow: row })),
  openCat: null,
  setOpenCat: (cat) => set(() => ({ openCat: cat })),
  sheetDataIsValid: false,
  setSheetDataIsValid: (isValid) => set(() => ({ sheetDataIsValid: isValid })),
  sheets: [],
  setSheets: (sheets) => set(() => ({ sheets })),
  sheet: undefined,
  setSheet: (sheet) => set(() => ({ sheet })),
}));
