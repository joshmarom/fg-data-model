import React from 'react';
import { ActionIcon, Badge, Group, TextInput, Title, Tooltip } from '@mantine/core';
import { FileDownload, FileSpreadsheet } from 'tabler-icons-react';
import { useStore } from '../store';

export const SheetViewHeader = ({
  rowsCount,
  onSearchChange,
  jsonUrl,
  title = null,
}: {
  rowsCount?: number;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  jsonUrl: string;
  title: React.ReactNode;
}) => {
  const [iframeMode, toggleIframeMode] = useStore((state) => [
    state.iframeMode,
    state.toggleIframeMode,
  ]);

  return (
    <Group
      spacing="sm"
      align="center"
      p="xl"
      sx={(theme) => ({ boxShadow: theme.shadows.sm, zIndex: 20, position: 'relative' })}
    >
      <Title fw={500} size="h1">
        {title}
      </Title>
      <Badge>{rowsCount} fields</Badge>
      <TextInput
        onInput={onSearchChange}
        variant="filled"
        placeholder="Search Field Name"
        radius="md"
        mx="xl"
        sx={{ flex: 1, width: '100%' }}
      />
      <Tooltip label={iframeMode ? 'Close Google Sheets iframe' : 'Open Google Sheets iframe'}>
        <ActionIcon
          color="green"
          variant={iframeMode ? 'filled' : 'outline'}
          size="lg"
          radius="md"
          onClick={toggleIframeMode}
        >
          <FileSpreadsheet size="24" strokeWidth={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={`Download '${title || 'Rows'}.json'`}>
        <ActionIcon
          component="a"
          href={jsonUrl}
          download={`${title || 'Rows'}.json`}
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
};
