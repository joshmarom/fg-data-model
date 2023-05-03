import { NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { Sheet } from '../helpers';

export const SheetList = ({
  sheets,
  activeSheet,
}: {
  sheets: Sheet[];
  activeSheet: string | null;
}) => (
  <>
    {sheets.map(({ properties: { title, sheetId } }) => (
      <NavLink
        label={title}
        key={sheetId}
        component={Link}
        to={`/sheet/${title}`}
        style={{ textDecoration: 'none' }}
        active={title === activeSheet}
      />
    ))}
  </>
);
