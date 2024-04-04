import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SheetsLoader } from './SheetsLoader';

export const Content = ({ accessToken }: { accessToken: string }) => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SheetsLoader accessToken={accessToken} />} />
            <Route
              path="/sheet/:sheetTitle"
              element={<SheetsLoader accessToken={accessToken} />}
            />
        </Routes>
    </BrowserRouter>
);
