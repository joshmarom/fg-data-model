import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { sheets_v4 } from 'googleapis';
import {
  ActionIcon,
  Flex,
  Group,
  MantineTheme,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { FileSpreadsheet } from 'tabler-icons-react';
import { useSheetData } from './useSheetData';
import { Rows } from './Rows';

type Sheet = sheets_v4.Schema$Sheet;
type Sheets = Sheet[];
type Response = sheets_v4.Schema$Spreadsheet;
type ResponseWithSheets = Response & { sheets: Sheets };

const isSheets = (value: any): value is Sheets =>
  Array.isArray(value) && value.every((item) => typeof item === 'object');
const isValidResponse = (value: any): value is ResponseWithSheets =>
  typeof value === 'object' && isSheets(value.sheets);
const isSheetData = (value: any): value is sheets_v4.Schema$ValueRange =>
  typeof value === 'object' && Array.isArray(value.values);

const borderColor = ({ colors, colorScheme }: MantineTheme) =>
  colorScheme === 'dark' ? colors.dark[5] : colors.gray[3];

export const SheetsLoader = ({ accessToken }: { accessToken: string }) => {
  const { activeSheet, data, isLoading, error, setActiveSheet, sheetData } =
    useSheetData(accessToken);
  const location = useLocation();

  React.useEffect(() => {
    const sheetName = location.pathname.split('/').pop();
    if (sheetName) setActiveSheet(decodeURIComponent(sheetName));
  }, [location, setActiveSheet]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>Error: {error}</>;
  if (!isValidResponse(data) || !data.sheets.length) return <div>Could not load data</div>;

  return (
    <Flex h="100vh" w="100%">
      <ScrollArea w="300px">
        {data.sheets.map(({ properties: props }) => {
          if (!props || !props.title) return null;
          const { title } = props;
          return (
            <Link
              key={props.sheetId}
              to={`/sheet/${title}`}
              onClick={() => setActiveSheet(title)}
              style={{ textDecoration: 'none' }}
            >
              <NavLink label={title} active={title === activeSheet} />
            </Link>
          );
        })}
      </ScrollArea>
      {isSheetData(sheetData) && (
        <Stack w="100%" p="xl">
          <Group spacing="md" align="baseline">
            <ActionIcon color="green" size="xl" radius="xl">
              <FileSpreadsheet size="24" strokeWidth={1} />
            </ActionIcon>
            <Title>{activeSheet}</Title>
            {sheetData.values?.length && <Text>{sheetData.values.length - 1} fields</Text>}
          </Group>
          <ScrollArea
            w="100%"
            sx={(theme) => ({
              borderTop: '1px solid',
              borderColor: borderColor(theme),
            })}
          >
            <Rows sheetData={sheetData} />
          </ScrollArea>
        </Stack>
      )}
    </Flex>
  );
};
