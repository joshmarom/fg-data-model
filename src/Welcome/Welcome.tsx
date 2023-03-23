import { Button, Stack, Title } from '@mantine/core';

export function Welcome() {
  return (
    <Stack align="center" mt={50}>
      <Title size="xl" weight={500}>
        Data Model Dashboard
      </Title>
      <Button>Click the button</Button>
    </Stack>
  );
}
