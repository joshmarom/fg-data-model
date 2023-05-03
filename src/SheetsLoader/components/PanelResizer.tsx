import { PanelResizeHandle } from 'react-resizable-panels';
import { Box } from '@mantine/core';
import React from 'react';

const PanelResizerComponent = () => (
  <PanelResizeHandle>
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        width: '20px',
        zIndex: 2,
        marginInline: '-10px',
        opacity: 0,
        transition: 'all 200ms ease',
        '&:hover': {
          opacity: 0.3,
          zIndex: 4,
        },
      }}
    >
      <Box
        w="3px"
        h="2%"
        sx={(theme) => ({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%) scaleY(40)',
          backgroundColor: theme.colors.blue[5],
          borderRadius: '2px',
        })}
      />
    </Box>
  </PanelResizeHandle>
);

export const PanelResizer = React.memo(PanelResizerComponent);
