import { ReactNode } from "react"

export interface Product {
    id: number
    name: string
    quantity: number
    priceInCents: number
}

export interface ShoppingCartContextType{
    cart: Product[]
    addItemToCart: (product: Product) => void;
    removeItemFromCart: (productId: number) => void
    updateCartItemQuantity: (productId: number, newQuantity: number) => void
}

export interface ShoppingCartProviderProps {
    children: ReactNode
}