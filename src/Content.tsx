import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SheetsLoader } from './SheetsLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

export const Content = ({ accessToken }: { accessToken: string }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SheetsLoader accessToken={accessToken} />} />
        <Route path="/sheet/:sheetTitle" element={<SheetsLoader accessToken={accessToken} />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
