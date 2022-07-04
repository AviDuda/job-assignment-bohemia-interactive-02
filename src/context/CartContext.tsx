import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";

import { MinimalProduct } from "../apiTypes";
import { useComponentDidMount } from "../hooks/useComponentDidMount";

interface CartContainer {
    readonly cartProducts: Map<MinimalProduct["id"], MinimalProduct>;
    addToCart: (product: MinimalProduct) => boolean;
    removeFromCart: (product: MinimalProduct) => void;
    clearCart: () => void;
}

type CartMap = Map<MinimalProduct["id"], MinimalProduct>;

function useCart(): CartContainer {
    const [cartProducts, setCartProducts] = useState<CartMap>(new Map());

    const isComponentMounted = useComponentDidMount();

    useEffect(() => {
        // Load cart from localStorage

        try {
            const storage = localStorage.getItem("cart");
            if (!storage) return;
            const storedCart = JSON.parse(storage);
            if (!Array.isArray(storedCart)) return;
            const newState: CartMap = new Map(storedCart);
            setCartProducts(newState);
        } catch {}
    }, []);

    useEffect(() => {
        // Save cart to localStorage

        try {
            if (!isComponentMounted) {
                return;
            }
            const items = JSON.stringify([...cartProducts.entries()]);
            localStorage.setItem("cart", items);
        } catch {}
    }, [cartProducts, isComponentMounted]);

    const addToCart = (product: MinimalProduct) => {
        if (cartProducts.has(product.id)) return false;
        setCartProducts((prevState) => new Map([...prevState, [product.id, product]]));
        return true;
    };

    const removeFromCart = (product: MinimalProduct) => {
        setCartProducts((prevState) => {
            const newState = new Map(prevState);
            newState.delete(product.id);
            return newState;
        });
    };

    const clearCart = () => {
        setCartProducts(new Map());
    };

    return { cartProducts, addToCart, removeFromCart, clearCart };
}

export const CartContext = createContainer(useCart);
CartContext.Provider.displayName = "CartContextProvider";
