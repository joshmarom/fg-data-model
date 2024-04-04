import type { PaperProps, Sx } from '@mantine/core';
import { Box, Center, createPolymorphicComponent, Paper, ScrollArea } from '@mantine/core';
import * as React from 'react';
import { forwardRef } from 'react';

export interface FgBlock extends PaperProps {
    headerContent?: React.ReactNode;
    footerContent?: React.ReactNode;
}

const _FgBlock = forwardRef<HTMLTableSectionElement, FgBlock>(
    ({ children, headerContent, footerContent, ...props }, ref) => {
        const { p, px, py, pt, pr, pb, pl, radius: _radius, ...rest } = props;
        const paddingX = px ?? p ?? 'md';

        const headerSx: Sx = ({ radius: { md } }) => ({
            borderTopRightRadius: _radius ?? md,
            borderTopLeftRadius: _radius ?? md,
            flexShrink: 0,
        });

        const footerSx: Sx = ({ radius: { md } }) => ({
            borderBottomRightRadius: _radius ?? md,
            borderBottomLeftRadius: _radius ?? md,
            flexShrink: 0,
        });

        const mergedSx: Sx = (t) => ({
            ...footerSx(t),
            ...headerSx(t),
        });

        return (
            <Paper
              display="flex"
              bg="white"
              shadow="md"
              h="100%"
              ref={ref}
              aria-labelledby={headerContent ? 'header' : undefined}
              sx={(t) => ({
                    flexDirection: 'column',
                    ...mergedSx(t),
                })}
              {...rest}
            >
                {headerContent ? (
                    <Box
                      h="4rem"
                      bg="gray.0"
                      px={paddingX}
                      component="header"
                      sx={headerSx}
                      id="header"
                    >
                        <Center inline h="100%">
                            {headerContent}
                        </Center>
                    </Box>
                ) : null}
                <ScrollArea
                  h="100%"
                  px={paddingX}
                >
                    {children}
                </ScrollArea>
                {footerContent ? (
                    <Box
                      h="4rem"
                      bg="gray.0"
                      px={paddingX}
                      component="footer"
                      sx={footerSx}
                    >
                        <Center inline h="100%">
                            {footerContent}
                        </Center>
                    </Box>
                ) : null}
                <Box />
            </Paper>
        );
    },
);

export const FgBlock = createPolymorphicComponent<'section', FgBlock>(_FgBlock);
