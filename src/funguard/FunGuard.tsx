import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActionIcon, Box, Flex, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { Logo } from './components/Logo';
import { IconsMenu } from './components/IconsMenu';
import { UserDetailsButton } from './components/UserDetailsButton';
import { SearchBar } from './components/SearchBar';
import { SideNav } from './components/SideNav';
import { sideNavMenuItems } from './data/sideNavMenu';
import { PanelResizer } from './components/PanelResizer';
import { FgBlock } from './components/FgBlock';
import { SkipToMain } from './components/SkipToMain';
import { ProductCard } from './components/ProductCard';
import { cardSx } from './reusableSx';
import { useCart } from './hooks/useCart';

export const FunGuard = () => {
    const productsQuery = useQuery({
        queryKey: ['SHEET_DATA'],
        queryFn: () => fetch('https://fakestoreapi.com/products')
            .then(res => res.json()),
    });

    const mainId = 'main-content';

    const { cart, addToCart, removeFromCart, incrementItem, decrementItem } = useCart();

    if (productsQuery.isLoading) return (<div>Loading...</div>);

    const products = productsQuery.data;

    return (
        <>
            <SkipToMain mainId={mainId} />
            <Flex bg="secondary.6" h="100%" direction="column">
                <Group position="apart" align="center" p="sm">
                    <Logo />
                    <Group>
                        <SearchBar />
                        <IconsMenu />
                        <UserDetailsButton />
                    </Group>
                </Group>
                <Flex
                  mah="calc(100vh - 60px)"
                  sx={{ flexGrow: 0, overflow: 'hidden' }}
                  h="100%"
                >
                    <SideNav items={sideNavMenuItems} />
                    <Box
                      w="calc(100% - 240px)"
                      bg="gray.1"
                      p="sm"
                      sx={({ radius }) => ({
                            borderTopLeftRadius: radius.md,
                            flexShrink: 1,
                        })}
                    >
                        <PanelGroup direction="horizontal">
                            <Panel defaultSize={70} style={{ zIndex: 3 }}>
                                <FgBlock
                                  component="main"
                                  id={mainId}
                                  headerContent={<Title size="md">Products</Title>}
                                  mr="xs"
                                >
                                    {/*<DataGrid />*/}
                                    <SimpleGrid cols={3} my="md">
                                        {
                                            products.map((product: any) => (
                                                <ProductCard
                                                  key={product.id}
                                                  id={product.id}
                                                  image={product.image}
                                                  title={product.title}
                                                  description={product.description}
                                                  onAddToCart={addToCart(product.id)}
                                                />
                                            ))
                                        }
                                    </SimpleGrid>
                                </FgBlock>
                            </Panel>
                            <PanelResizer />
                            <Panel maxSize={40} minSize={20}>
                                <FgBlock
                                  component="aside"
                                  headerContent={<Title size="md">Cart</Title>}
                                  ml="xs"
                                >
                                    <Stack mt="md">
                                        {
                                            cart.map(({ id, count }) => (
                                                <Paper key={id} p="md" shadow="xs" sx={cardSx}>
                                                    <Flex align="center" justify="space-between" w="100%">
                                                        <Box sx={{ flexGrow: 0 }}>
                                                            <ActionIcon onClick={removeFromCart(id)}>
                                                                <IconX />
                                                            </ActionIcon>
                                                        </Box>
                                                        <Text>
                                                            {
                                                                productsQuery.data
                                                                    .find((product: any) =>
                                                                        product.id === id).title
                                                            }
                                                        </Text>
                                                        <Stack spacing="xs" w="3rm" sx={{ flexGrow: 0 }}>
                                                            <ActionIcon size="sm" onClick={incrementItem(id)}>
                                                                <IconPlus />
                                                            </ActionIcon>
                                                            <Text>{count}</Text>
                                                            <ActionIcon size="sm" onClick={decrementItem(id)}>
                                                                <IconMinus />
                                                            </ActionIcon>
                                                        </Stack>
                                                    </Flex>
                                                </Paper>
                                            ))
                                        }
                                    </Stack>
                                </FgBlock>
                            </Panel>
                        </PanelGroup>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};
