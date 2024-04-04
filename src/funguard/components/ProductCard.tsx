import { AspectRatio, Button, Flex, Image, Paper, Spoiler, Stack, Sx, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { cardSx } from '../reusableSx';

interface ProductProps {
    readonly id: string;
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly onAddToCart: () => void;
    readonly nonAccessible?: boolean;
}

export const ProductCard = ({
                                id,
                                title,
                                image,
                                description,
                                onAddToCart,
                                nonAccessible = false,
                            }: ProductProps) => {
    const ariaLabel = `product-${id}`;
    const titleSx: Sx = ({ colors: { gray } }) => ({
        color: gray[7],
        fontSize: '1.2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        margin: 0,
    });

    return (
        <Paper
          component={nonAccessible ? 'div' : 'article'}
          p="md"
          shadow="xs"
          sx={cardSx}
          aria-labelledby={nonAccessible ? undefined : ariaLabel}
        >
            <Flex
              align="stretch"
              justify="space-between"
              h="100%"
              w="100%"
              gap="md"
              direction="column"
            >
                <Stack spacing="md">
                    {nonAccessible ? (
                        <AspectRatio
                          ratio={1}
                          sx={{
                                backgroundImage: `url(${image})`,
                            }}
                        />
                    ) : (
                        <AspectRatio ratio={1}>
                            <Image src={image} alt={title} fit="contain" />
                        </AspectRatio>
                    )}

                    {nonAccessible ? (
                        <Text sx={titleSx} span>{title}</Text>
                    ) : (
                        <Title sx={titleSx} variant="heading" id={ariaLabel}>{title}</Title>
                    )}

                    <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
                        <Text>{description}</Text>
                    </Spoiler>
                </Stack>

                {nonAccessible ? (
                    <Stack spacing="sm">
                        <Button size="md" component="span" variant="outline">View details</Button>
                        <Button size="md" component="span" variant="filled" onClick={onAddToCart}>Add to Cart</Button>
                    </Stack>
                ) : (
                    <Stack spacing="sm">
                        <Button size="md" component={Link} variant="outline" to="#">View details</Button>
                        <Button size="md" variant="filled" onClick={onAddToCart}>Add to Cart</Button>
                    </Stack>
                )}
            </Flex>
        </Paper>
    );
};
