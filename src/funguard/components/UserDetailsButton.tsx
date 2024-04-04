import { Button, Text } from '@mantine/core';
import { IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import * as React from 'react';

export const UserDetailsButton = () => (
    <Button
      size="md"
      color="navy.7"
      leftIcon={
            <Text lh={0} color="navy.2">
                <IconUserCircle size={20} />
            </Text>
        }
      rightIcon={
            <Text lh={0} color="navy.2" ml="xs">
                <IconChevronDown size={16} />
            </Text>
        }
    >
        <Text ml="xs" color="navy.0" weight={500}>
            John Doe
        </Text>
    </Button>
);
