import { Accordion, Badge, Code, Flex, Grid, Title } from '@mantine/core';
import React from 'react';
import { sheets_v4 } from 'googleapis';
import { Cell } from './Cell';

type SheetData = sheets_v4.Schema$ValueRange;
const isSheetData = (value: any): value is SheetData =>
  typeof value === 'object' && Array.isArray(value.values);

export const Rows = ({ sheetData }: { sheetData: sheets_v4.Schema$ValueRange }) => {
  if (!isSheetData(sheetData) || !sheetData.values?.length) return null;
  const headers = sheetData.values[0];
  if (!headers) return null;
  return (
    <Accordion>
      {sheetData.values
        .filter((v, i) => i > 0)
        .map((row) => {
          if (!row[0] || !row[1]) return null;
          return (
            <Accordion.Item key={row[0] + row[1]} value={row[1]}>
              <Accordion.Control>
                <Flex gap="lg" align="center">
                  <Badge>{row[0]}</Badge>
                  <Title size="h4">{row[1]}</Title>
                  <Code>{row[3]}</Code>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel>
                <Grid gutter="md" p="lg">
                  {row
                    .filter((v, i) => i > 1)
                    .map((cell, i) => (
                      <Cell key={headers[i + 2] + cell} label={headers[i + 2]} value={cell} />
                    ))}
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
    </Accordion>
  );
};
