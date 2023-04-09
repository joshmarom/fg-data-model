import React from 'react';
import { Search } from 'tabler-icons-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Box, Flex, ScrollArea, Stack, Text, TextInput, Title } from '@mantine/core';
import { borderColor, isSheetData, isValidResponse, Sheet } from './helpers';
import { useDebouncedSearch, useRouteItemActivator, useSearchSheets, useSheetData } from './hooks';
import { Rows } from './Rows';
import { CategoriesAccordion } from './CategoriesAccordion';
import { invalidSheets } from './invalidSheets';
import { SheetList } from './SheetList';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Logo } from '../components/Logo';
import { parseSheetData } from './sheetParser';
import { useRowsJsonUrl } from './hooks/useRowsJson';
import { useStyles } from './SheetLoaderStyle';
import { SheetViewHeader } from './SheetViewHeader';

const onlyValidSheets = (sheets: Sheet[]): Sheet[] =>
  sheets.filter(
    (s, i) => i > 7 && !!s.properties.title && !invalidSheets.includes(s.properties.title)
  );

export const SheetsLoader = ({ accessToken }: { accessToken: string }) => {
  const { activeSheet, data, isLoading, error, setActiveSheet, sheetData } =
    useSheetData(accessToken);
  const sheetDataIsValid = React.useMemo(() => isSheetData(sheetData), [sheetData]);
  const sheets = React.useMemo(() => (data?.sheets ? onlyValidSheets(data.sheets) : []), [data]);
  const sheet = React.useMemo(
    () => sheets.find((s: Sheet) => s.properties.title === activeSheet),
    [sheets, activeSheet]
  );
  const rows = React.useMemo(
    () => (sheetDataIsValid ? parseSheetData(sheetData) : []),
    [sheetDataIsValid, sheetData]
  );
  const { setSheetSearchText, filteredSheets } = useSearchSheets(sheets);
  const { debouncedSearchText, onInputChange } = useDebouncedSearch();
  const [iframeMode, setIframeMode] = React.useState(false);
  const iframeUrl = React.useMemo(
    () =>
      !sheetDataIsValid || !sheet
        ? undefined
        : `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit#gid=${sheet.properties.sheetId}`,
    [sheetDataIsValid, sheet, data]
  );
  const rowsJsonUrl = useRowsJsonUrl(rows);
  const { classes } = useStyles();
  const [openRow, setOpenRow] = React.useState<string | undefined>();
  const [openCat, setOpenCat] = React.useState<string | undefined>();

  useRouteItemActivator(setActiveSheet);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>Error: {error}</>;
  if (!isValidResponse(data)) return <div>Could not load data</div>;

  return (
    <Flex h="100vh" w="100%" className={classes.canvas}>
      <Flex direction="column" className={classes.sidebar}>
        <Stack p="lg" spacing="xl">
          <Logo className={classes.logo} />
          <TextInput
            placeholder="Search Sheet"
            variant="filled"
            type="search"
            onInput={({ currentTarget: { value } }) => setSheetSearchText(value)}
            rightSection={<Search size="16" strokeWidth={1} />}
          />
        </Stack>
        <ScrollArea h="100%" px="lg">
          <SheetList activeSheet={activeSheet} sheets={filteredSheets} />
        </ScrollArea>
        <Box p="xl" sx={(t) => ({ borderTop: `1px solid ${borderColor(t)}` })}>
          <DarkModeSwitch />
        </Box>
      </Flex>
      {isSheetData(sheetData) ? (
        <Flex h="100vh" w="100%" direction="column">
          <SheetViewHeader
            activeSheet={activeSheet}
            iframeMode={iframeMode}
            jsonUrl={rowsJsonUrl}
            ontoggleIframeMode={() => setIframeMode((prev) => !prev)}
            onSearchChange={onInputChange}
            title={
              <>
                <Title fw={500} size="h1">
                  {activeSheet}
                </Title>
                <Text>{rows.length} fields</Text>
              </>
            }
          />
          <Flex h="calc(100% - 85px)">
            {iframeMode && iframeUrl ? (
              <iframe src={iframeUrl} title={activeSheet ?? 'Sheet'} className={classes.iframe} />
            ) : (
              <PanelGroup direction="horizontal">
                <Panel defaultSize={70}>
                  <ScrollArea w="100%" h="100%">
                    <Rows
                      rows={rows}
                      className={classes.main}
                      openRow={openRow}
                      setOpenRow={setOpenRow}
                      setOpenCat={setOpenCat}
                      keyword={debouncedSearchText}
                    />
                  </ScrollArea>
                </Panel>
                <PanelResizeHandle
                  style={{
                    width: '20px',
                    zIndex: 10,
                    marginInlineEnd: '-10px',
                  }}
                />
                <Panel maxSize={40} minSize={20}>
                  <ScrollArea p="md" pt="xl" pl={0} h="100%">
                    <CategoriesAccordion
                      data={rows}
                      setOpenRow={setOpenRow}
                      openCat={openCat}
                      setOpenCat={setOpenCat}
                    />
                  </ScrollArea>
                </Panel>
              </PanelGroup>
            )}
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};
