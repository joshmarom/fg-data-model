import { useListState } from '@mantine/hooks';

interface cartItem {
    id: string
    count: number
}

export const useCart = () => {
    const [cart, { append, remove, applyWhere, setItem }] = useListState<cartItem>([]);
    const itemExists = (id: string) => cart.some((item) => item.id === id);
    const addNewItem = (id: string) => append({ id, count: 1 });
    const getItemIndex = (id: string) => cart.findIndex((item) => item.id === id);
    const isItem = (id: string) => (item: cartItem) => item.id === id;
    const incrementItem = (id: string) => () => applyWhere(
        isItem(id),
        (item) => ({ ...item, count: item.count + 1 }),
    );
    const addToCart = (id: string) => () =>
        itemExists(id) ? incrementItem(id) : addNewItem(id);
    const removeFromCart = (id: string) => () => remove(getItemIndex(id));
    const decrementItem = (id: string) => () => {
        if (!itemExists(id)) return;
        const i = getItemIndex(id);
        cart[i].count <= 1
            ? remove(i)
            : setItem(i, { ...cart[i], count: cart[i].count - 1 });
    };

    return ({
        cart,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
    });
};
