import React from 'react';
import { Box, Group, Tooltip } from '@mantine/core';
import { ClipboardCheck, ClipboardCopy } from 'tabler-icons-react';

export const Copiable = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dataPath = e.currentTarget.innerText;
    await navigator.clipboard.writeText(dataPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Tooltip
      fz="xs"
      position="right"
      color={copied ? 'green' : 'gray'}
      label={
        <Group align="center" spacing={4}>
          {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
          {copied ? 'Copied' : 'Copy'}
        </Group>
      }
    >
      <Box onClick={handleCopy}>{children}</Box>
    </Tooltip>
  );
};
