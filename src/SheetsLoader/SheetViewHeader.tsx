import React from 'react';
import { ActionIcon, Box, Group, TextInput, Tooltip } from '@mantine/core';
import { FileDownload, FileSpreadsheet } from 'tabler-icons-react';

export const SheetViewHeader = ({
  activeSheet,
  title,
  ontoggleIframeMode,
  onSearchChange,
  iframeMode,
  jsonUrl,
}: {
  activeSheet: string | null;
  title: React.ReactNode;
  ontoggleIframeMode: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iframeMode: boolean;
  jsonUrl: string;
}) => (
  <Group spacing="sm" align="center" p="xl">
    {title}
    <Box sx={{ flex: 1, width: '100%' }}>
      <TextInput onInput={onSearchChange} placeholder="Search Field Name" radius="lg" m="xl" />
    </Box>
    <Tooltip label={iframeMode ? 'Close Google Sheets iframe' : 'Open Google Sheets iframe'}>
      <ActionIcon
        color="green"
        variant={iframeMode ? 'filled' : 'outline'}
        size="lg"
        radius="md"
        onClick={ontoggleIframeMode}
      >
        <FileSpreadsheet size="24" strokeWidth={1.5} />
      </ActionIcon>
    </Tooltip>
    <Tooltip label={`Download '${activeSheet || 'Rows'}.json'`}>
      <ActionIcon
        component="a"
        href={jsonUrl}
        download={`${activeSheet || 'Rows'}.json`}
        variant="outline"
        color="cyan"
        size="lg"
        radius="md"
      >
        <FileDownload size={24} strokeWidth={1.5} />
      </ActionIcon>
    </Tooltip>
  </Group>
);
