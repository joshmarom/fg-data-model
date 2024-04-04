import React from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { MantineTheme } from '@mantine/styles/lib/theme/types/MantineTheme';
import { generateShades } from './utils/color/shadesGenerator';

/*
export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
};
*/

interface ThemeProviderProps {
    children: React.ReactNode;
}

type MantineColorArray = MantineTheme['colors'][string];

const teal = [
    '#bff9f8',
    '#90eae7',
    '#6dd0ca',
    '#50b5af',
    '#3c9591',
    '#29807e',
    '#14625d',
    '#0d4846',
    '#093934',
    '#052725',
] satisfies MantineColorArray;

const navy = [
    '#57a8d4',
    '#4c94ba',
    '#427fa1',
    '#3b718f',
    '#315f78',
    '#25485c',
    '#223646',
    '#1a2a36',
    '#15222b',
    '#0d1a24',
] satisfies MantineColorArray;

const gray = [
    '#F6F6F6',
    '#D4DBD9',
    '#b7c4c4',
    '#9cb1b5',
    '#849ba3',
    '#72858f',
    '#60717F',
    '#4b5866',
    '#394654',
    '#223646',
] satisfies MantineColorArray;

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const theme: MantineThemeOverride = {
        colorScheme,
        fontFamily: 'Mulish, Montserrat, "Lucida Grande", " Maven Pro", "Roboto", sans-serif', //'Sora', 'Montserrat',
        colors: {
            blue: generateShades('#006bd3'),
            green: generateShades('#339438'),
            yellow: generateShades('#ffe45f'),
            orange: generateShades('#ff8500'),
            red: generateShades('#cb2421'),
            gray,
            navy,
            secondary: navy,
            teal,
            primary: teal,
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        primaryColor: 'teal',
        primaryShade: 5,
        globalStyles: (t) => ({
            ':root': {
                '--ag-row-hover-color': t.colors.primary[0],
                '--ag-selected-row-background-color': t.colors.primary[1],
            },
            'body, html, #root': { height: '100%' },
            'html, body, h1, h2, h3, h4, h5, h6, p': { color: t.colors.gray[6] },
        }),
        components: {
            Text: { defaultProps: { color: 'gray.6' } },
            Title: { defaultProps: { color: 'gray.6' } },
        },
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
