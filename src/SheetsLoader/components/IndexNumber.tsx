import React from 'react';
import { Flex, Sx } from '@mantine/core';

export const IndexNumber = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  ({ children, sx }: { children?: React.ReactNode; sx?: Sx }, ref) => (
    <Flex
      ref={ref}
      sx={[
        (t) => ({
          color: t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[6],
          borderRadius: t.radius.xl,
          flexGrow: 0,
          flexShrink: 0,
          aspectRatio: '1/1',
          width: t.spacing.xl,
          fontSize: t.fontSizes.xs,
          fontWeight: 500,
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          border: `0.25px solid ${t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[4]}`,
        }),
        sx,
      ]}
    >
      {children}
    </Flex>
  )
);
