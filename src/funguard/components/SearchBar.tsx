import { ActionIcon, Sx, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import * as React from 'react';

const sx: Sx = ({ white, colors: { secondary } }) => ({
    input: {
        backgroundColor: secondary[7],
        borderColor: secondary[7],
        color: white,
        ':focus': {
            backgroundColor: secondary[8],
            borderColor: secondary[4],
        },
        '::placeholder': { color: secondary[2] },
    },
});

const rightSection = (
    <ActionIcon variant="transparent" color="secondary.2">
        <IconSearch />
    </ActionIcon>
);

export const SearchBar = () => (
    <TextInput
      type="search"
      size="md"
      enterKeyHint="search"
      rightSection={rightSection}
      placeholder="Search"
      sx={sx}
    />
);
