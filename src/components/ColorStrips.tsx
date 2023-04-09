import { Box, Flex, Stack } from '@mantine/core';

const ColorStrip = ({ color }: { color: string }) => (
  <Flex w="100%" justify="center">
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <Box
          key={`${color}${i}`}
          sx={(t) => ({
            backgroundColor: t.colors[color][i],
            aspectRatio: '1/1',
            width: '8%',
            color: i < 5 ? t.colors[color][7] : t.colors[color][1],
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '4',
          })}
        >
          {`${i}`}
        </Box>
      ))}
  </Flex>
);

export const ColorStrips = () => (
  <Stack w="100%">
    {['red', 'orange', 'yellow', 'green', 'cyan', 'navy', 'blue', 'gray', 'violet', 'pink'].map(
      (color) => (
        <ColorStrip key={color} color={color} />
      )
    )}
  </Stack>
);
