import { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
    const [cart, setCart] = useState<any[]>([]);
    const addToCart = (product: any) => {
        setCart((prev) => {
            const existing = prev.find((p) => p._id === product._id);

            if (existing) {
                return prev.map((p) =>
                    p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const decreaseQty = (id: string) => {
        setCart((prev) =>
            prev.map((p) =>
                p._id === id ? { ...p, quantity: p.quantity - 1 } : p)
                .filter((p) => p.quantity > 0));
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((p) => p._id !== id));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQty,
                removeFromCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};