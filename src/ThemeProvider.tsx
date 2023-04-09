import React from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { generateShades } from './utils/color/shadesGenerator';

/*
export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
};
*/

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const theme = {
    colorScheme,
    fontFamily: 'Bai Jamjuree', //'Sora', 'Montserrat',
    colors: {
      navy: generateShades('#113b63'),
      blue: generateShades('#006bd3'),
      cyan: generateShades('#167474'),
      green: generateShades('#339438'),
      yellow: generateShades('#ffe45f'),
      orange: generateShades('#ff8500'),
      red: generateShades('#cb2421'),
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
