import React, { useCallback } from 'react';
import { Search } from 'tabler-icons-react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { Box, Button, Collapse, Flex, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { borderColor } from './helpers';
import { useDebouncedSearch, useRouteItemActivator, useSearchSheets, useSheetData } from './hooks';
import { Rows } from './components/Rows';
import { CategoriesAccordion } from './components/CategoriesAccordion';
import { SheetList } from './components/SheetList';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Logo } from '../components/Logo';
import { useRowsJsonUrl } from './hooks/useRowsJson';
import { useStyles } from './SheetLoaderStyle';
import { SheetViewHeader } from './components/SheetViewHeader';
import { PanelResizer } from '../funguard/components/PanelResizer';
import { useStore } from './store';
// import { ColorStrips } from '../components/ColorStrips';

export const SheetsLoader = ({ accessToken }: { accessToken: string }) => {
    const [activeSheet, setActiveSheet] = React.useState<string | null>(null);
    const {
        data: { sheets, rows, sheetDataIsValid, iframeUrl },
        isLoading,
        error,
    } = useSheetData(accessToken, activeSheet);
    useRouteItemActivator(setActiveSheet);

    const iframeMode = useStore((state) => state.iframeMode);
    const { setSheetSearchText, filteredSheets } = useSearchSheets(sheets);
    const { debouncedSearchText, onInputChange } = useDebouncedSearch();
    const rowsJsonUrl = useRowsJsonUrl(rows);
    const { classes } = useStyles();

    const rowsViewport = React.useRef<HTMLDivElement>(null);

    const setRowsScrollTop = useCallback(
        (el: HTMLDivElement) => {
            const { current: rowsViewportEl } = rowsViewport;
            if (!rowsViewportEl) return;
            setTimeout(
                () => rowsViewportEl.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' }),
                200,
            );
        },
        [rowsViewport.current],
    );

    const [isContentOpen, { open, close, toggle }] = useDisclosure(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <>Error: {error}</>;

    return (
        <Flex h="100vh" w="100%" className={classes.canvas}>
            <Flex direction="column" className={classes.sidebar}>
                <Stack
                  sx={{
                        height: '100%',
                        flexGrow: 1,
                    }}
                >
                    <Stack spacing="lg" m="lg">
                        <Logo className={classes.logo} />
                        <Box maw={400} mx="auto">
                            <Button onClick={toggle}>Toggle content</Button>
                            <Button onClick={open}>Open</Button>
                            <Button onClick={close}>Close</Button>
                            <Collapse in={isContentOpen}>
                                <Text>hello world</Text>
                            </Collapse>
                        </Box>
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
                    <Box p="xl" sx={(t) => ({ flexGrow: 0, borderTop: `1px solid ${borderColor(t)}` })}>
                        <DarkModeSwitch />
                    </Box>
                </Stack>
            </Flex>
            {
                sheetDataIsValid ? (
                    <Stack mah="100vh" w="100%" spacing={0}>
                        <SheetViewHeader
                          jsonUrl={rowsJsonUrl}
                          onSearchChange={onInputChange}
                          rowsCount={rows.length}
                          title={activeSheet}
                        />
                        <Flex h="100%" sx={{ flexShrink: 1, overflow: 'hidden' }}>
                            {iframeMode && iframeUrl ? (
                                <iframe
                                  src={iframeUrl}
                                  title={activeSheet ?? 'Sheet'}
                                  height="100%"
                                  className={classes.iframe}
                                />
                            ) : (
                                <PanelGroup direction="horizontal">
                                    <Panel defaultSize={70} style={{ zIndex: 3 }}>
                                        <ScrollArea w="100%" h="100%" viewportRef={rowsViewport} pl="xl" pr="sm">
                                            <Rows
                                              rows={rows}
                                              keyword={debouncedSearchText}
                                              onOpenRow={({ current: el }) => (el ? setRowsScrollTop(el) : undefined)}
                                            />
                                        </ScrollArea>
                                    </Panel>
                                    <PanelResizer />
                                    <Panel maxSize={40} minSize={20}>
                                        <ScrollArea pr="xl" pl="sm" h="100%">
                                            <CategoriesAccordion data={rows} />
                                        </ScrollArea>
                                    </Panel>
                                </PanelGroup>
                            )}
                        </Flex>
                    </Stack>
                ) : null // <ColorStrips />
            }
        </Flex>
    );
};
