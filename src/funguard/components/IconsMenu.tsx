import { ActionIcon, ActionIconProps, Group, Menu, Popover, Tooltip } from '@mantine/core';
import { IconBell, IconHelpCircle, IconLifebuoy, IconMessages, IconStar } from '@tabler/icons-react';

const actionIconProps = {
    size: 'xl',
    variant: 'filled',
    color: 'secondary.6',
    sx: ({ colors }) => ({
        svg: { color: colors.white },
        ':hover, :focus, :active': { svg: { color: colors.primary[2] } },
    }),
} satisfies ActionIconProps;

const menuItems = [
    { label: 'Favorites', icon: <IconStar /> },
    { label: 'Notifications', icon: <IconBell /> },
];

export const IconsMenu = () => (
    <Group spacing="xs">
        {
            menuItems.map(({ label, icon }) => (
                <Popover key={label}>
                    <Popover.Target>
                        <Tooltip withArrow label={label} offset={8} openDelay={500}>
                            <ActionIcon {...actionIconProps}>
                                {icon}
                            </ActionIcon>
                        </Tooltip>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <div>Popover content</div>
                    </Popover.Dropdown>
                </Popover>
            ))
        }
        <Menu>
            <Menu.Target>
                <Tooltip withArrow label="Help" offset={8} openDelay={500}>
                    <ActionIcon {...actionIconProps}>
                        <IconHelpCircle />
                    </ActionIcon>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item key="contact" icon={<IconMessages />}>
                    <span>Contact Support</span>
                </Menu.Item>
                <Menu.Item key="contact" icon={<IconLifebuoy />}>
                    <span>Documentation</span>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </Group>
);
