import React from 'react';
import { useDebounce } from 'usehooks-ts';
import { useLocation } from 'react-router-dom';
import { isSheets, Sheet } from '../helpers';

export const useSearchSheets = (sheets: Sheet[] | undefined) => {
  const [searchText, setSheetSearchText] = React.useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const filteredSheets = React.useMemo(() => {
    if (!isSheets(sheets)) return [];
    return sheets.filter(
      ({ properties: { title } }) =>
        title && title.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
  }, [sheets, debouncedSearchText]);

  return { setSheetSearchText, filteredSheets };
};

export const useDebouncedSearch = (initialSearch: string = '') => {
  const [searchText, setRowSearchText] = React.useState(initialSearch);
  const debouncedSearchText = useDebounce(searchText, 300);
  const onInputChange = React.useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      value && value.length > 2 ? setRowSearchText(value) : setRowSearchText(''),
    [setRowSearchText]
  );

  return { debouncedSearchText, onInputChange };
};

export const useRouteItemActivator = (setActiveItem: (item: string) => void) => {
  const location = useLocation();
  React.useEffect(() => {
    const itemName = location.pathname.split('/').pop();
    if (itemName) setActiveItem(decodeURIComponent(itemName));
  }, [location, setActiveItem]);
};

export * from './useSheetData';
