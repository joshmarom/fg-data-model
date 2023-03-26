import React from 'react';
import type { sheets_v4 } from 'googleapis';
import {
  Accordion,
  Badge,
  Code,
  Col,
  Flex,
  Grid,
  Group,
  MantineTheme,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useSheetData } from './useSheetData';

type Sheet = sheets_v4.Schema$Sheet;
type Sheets = Sheet[];
type Response = sheets_v4.Schema$Spreadsheet;
type ResponseWithSheets = Response & { sheets: Sheets };
type SheetData = sheets_v4.Schema$ValueRange;

const isSheets = (value: any): value is Sheets =>
  Array.isArray(value) && value.every((item) => typeof item === 'object');
const isValidResponse = (value: any): value is ResponseWithSheets =>
  typeof value === 'object' && isSheets(value.sheets);
const isSheetData = (value: any): value is SheetData =>
  typeof value === 'object' && Array.isArray(value.values);

const Cell = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  const isDataPath = label === 'Data Path';
  const isTrue = value === 'true' || value === 'Y' || value === 'Yes';
  const isFalse = value === 'false' || value === 'N' || value === 'No';
  const isNumber = !Number.isNaN(Number(value));
  const computedValue = (val: string) => {
    if (isTrue) return <Badge color="green">Yes</Badge>;
    if (isFalse) return <Badge color="red">No</Badge>;
    if (isDataPath || isNumber) return <Code>{val}</Code>;
    return val;
  };

  return (
    <Col span={6} md={4} lg={3}>
      <Text size="xs" color="dimmed">
        {label}
      </Text>
      <Text weight={500}>{computedValue(value)}</Text>
    </Col>
  );
};

const borderColor = ({ colors, colorScheme }: MantineTheme) =>
  colorScheme === 'dark' ? colors.dark[5] : colors.gray[3];

export const SheetsLoader = ({ accessToken }: { accessToken: string }) => {
  const { activeSheet, data, isLoading, error, setActiveSheet, sheetData } =
    useSheetData(accessToken);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>Error: {error}</>;
  if (!isValidResponse(data)) return <div>Could not load data</div>;

  const { sheets } = data;
  const headers = sheetData?.values?.[0];

  if (sheets.length) {
    return (
      <Flex h="100vh" w="100%">
        <ScrollArea w="300px">
          {sheets.map(({ properties: props }) => {
            if (!props || !props.title) return null;
            const { title } = props;
            return (
              <NavLink
                key={props.sheetId}
                label={title}
                onClick={() => setActiveSheet(title)}
                active={title === activeSheet}
              />
            );
          })}
        </ScrollArea>
        <Stack w="100%" p="xl">
          <Group spacing="lg" align="baseline">
            <Title>{activeSheet}</Title>
            {sheetData?.values?.length && <Text>{sheetData.values.length - 1} fields</Text>}
          </Group>
          <ScrollArea
            w="100%"
            sx={(theme) => ({
              borderTop: '1px solid',
              borderColor: borderColor(theme),
            })}
          >
            <Accordion>
              {isSheetData(sheetData) &&
                sheetData.values
                  ?.filter((v, i) => i > 0)
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
                                <Cell
                                  key={headers[i + 2] + cell}
                                  label={headers[i + 2]}
                                  value={cell}
                                />
                              ))}
                          </Grid>
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  })}
            </Accordion>
          </ScrollArea>
        </Stack>
      </Flex>
    );
  }

  return <div>Something went wrong</div>;
};
