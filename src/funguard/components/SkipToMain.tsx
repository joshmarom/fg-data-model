import { Button } from '@mantine/core';
import * as React from 'react';

interface SkipToMainProps {
    readonly mainId: string;
}

export const SkipToMain = ({ mainId }: SkipToMainProps) => (
    <Button
      variant="outline"
      color="white"
      size="xl"
      component="a"
      href={`#${mainId}`}
      sx={{
            left: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            transform: 'scale(0)',
            transformOrigin: 'center top',
            opacity: 0,
            zIndex: 2,
            ':focus': {
                transform: 'scale(1)',
                opacity: 1,
            },
        }}
    >
        Skip to main content
    </Button>
);
