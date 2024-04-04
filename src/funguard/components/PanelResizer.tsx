import { PanelResizeHandle } from 'react-resizable-panels';
import { Box } from '@mantine/core';
import React from 'react';

const PanelResizerComponent = () => (
    <PanelResizeHandle>
        <Box
          sx={({ colors }) => ({
                height: '100%',
                width: '20px',
                zIndex: 2,
                marginInline: '-10px',
                opacity: 0,
                transition: 'all 200ms ease',
                top: 0,
                ':is(:hover > *, :focus > *)': { opacity: 0.5 },
                ':is(:focus > *)': {
                    zIndex: 4,
                    outline: `2px solid ${colors.primary[3]}`,
                    position: 'absolute',
                },
            })}
        >
            <Box
              w="3px"
              h="2%"
              bg="teal.3"
              sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-50%) translateX(-50%) scaleY(40)',
                    borderRadius: '2px',
                }}
            />
        </Box>
    </PanelResizeHandle>
);

export const PanelResizer = React.memo(PanelResizerComponent);
