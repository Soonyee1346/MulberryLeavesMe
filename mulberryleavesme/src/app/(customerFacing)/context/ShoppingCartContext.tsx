import { createContext, useContext, useEffect, useState } from "react"
import { ShoppingCartContextType, ShoppingCartProviderProps, Product } from "../Types/ShoppingCart.interface"

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps){
    const [cart, setCart] = useState<Product[]>([]);

    //Load cart items from LocalStorage when the context is initialized
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    const updateCartAndLocalStorage = (newCart: Product[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    const addItemToCart = (product: Product) => {
        const updatedCart = [...cart, product]
        updateCartAndLocalStorage(updatedCart)
    }

    const removeItemFromCart = (productId: string) => {
        const updatedCart = cart.filter((product) => product.id != productId);
        updateCartAndLocalStorage(updatedCart)
    }

    const updateCartItemQuantity = (productId: string, newQuantity: number) => {
        const updatedCart = cart.map((product) => {
            if(product.id == productId){
                return {...product, quantity: newQuantity}
            }
            return product;
        })
        updateCartAndLocalStorage(updatedCart)
    }

    const contextValue: ShoppingCartContextType = {
        cart,
        addItemToCart,
        removeItemFromCart,
        updateCartItemQuantity
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext)
    if (!context) {
        throw new Error(
            "useShoppingCart must be used within a ShoppingCartProvider"
        )
    }
    return context
}