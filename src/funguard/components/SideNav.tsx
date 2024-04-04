import { Box, Button, Stack, Sx } from '@mantine/core';
import * as React from 'react';

const buttonSx: Sx = ({ spacing, colors: { teal } }) => ({
    '.mantine-Button-icon': { marginInlineEnd: spacing.md },
    '.mantine-Button-inner': { justifyContent: 'flex-start' },
    '.mantine-Button-label': { fontSize: '0.8rem' },
    ':hover, :focus, :active': { color: teal[2] },
    ':focus': { zIndex: 2 },
});

interface NavButtonProps {
    readonly children: React.ReactNode;
    readonly icon: React.ReactNode;
    readonly sx?: Sx;
}

export const NavButton = ({ children, icon, sx = buttonSx }: NavButtonProps) => (
    <Button
      size="md"
      color="secondary.6"
      leftIcon={icon}
      uppercase
      sx={sx}
    >
        {children}
    </Button>
);

interface SideNavProps {
    //isOpen?: boolean;
    //onClose?: () => void;
    items: ReadonlyArray<{
        readonly label: string;
        readonly icon: React.ReactNode;
    }>
}

export const SideNav = ({ items }: SideNavProps) => (
    <Box component="nav" w="240px" bg="transparent" p="sm">
        <Stack spacing={0}>
            {items.map(({ label, icon }) => (
                <NavButton key={label} icon={icon}>{label}</NavButton>
            ))}
        </Stack>
    </Box>
);
