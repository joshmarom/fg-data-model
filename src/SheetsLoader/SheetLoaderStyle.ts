import { createStyles, MantineTheme } from '@mantine/core';
import { borderColor } from './helpers';

const useLightDark = (theme: MantineTheme) => (light: string, dark: string) =>
  theme.colorScheme === 'dark' ? dark : light;

export const useStyles = createStyles((theme) => {
  const lightDark = useLightDark(theme);
  const { colors } = theme;
  return {
    logo: {
      color: lightDark(colors.blue[9], colors.blue[1]),
      height: '20px',
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
    },
    sidebar: {
      backgroundColor: lightDark(colors.gray[0], colors.dark[6]),
      borderRight: `1px solid ${borderColor(theme)}`,
      flexShrink: 0,
      flexGrow: 0,
      width: '280px',
    },
    canvas: {
      backgroundColor: lightDark(colors.gray[3], colors.dark[8]),
    },
    main: {
      backgroundColor: lightDark(colors.gray[2], colors.dark[7]),
      borderRadius: theme.radius.md,
    },
    rows: {
      marginBlock: theme.spacing.xl,
      borderRadius: theme.radius.md,
      '.mantine-Accordion-item[data-active="true"]': {
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        zIndex: 2,
        position: 'relative',
      },
      '.mantine-Accordion-item': {
        '&:not([data-active="true"])': {
          backgroundColor: lightDark(colors.gray[2], colors.dark[7]),
          '&:not(:last-of-type)': {
            marginBottom: '1px',
          },
        },
      },
    },
    iframe: { width: '100%', height: '100%', border: '0 none' },
  };
});
