import { ReactNode } from "react"

export interface Product {
    id: string
    name: string
    quantity: number
    priceInCents: number
    imagePath: string
}

export interface ShoppingCartContextType{
    cart: Product[]
    addItemToCart: (product: Product) => void;
    removeItemFromCart: (productId: string) => void
    updateCartItemQuantity: (productId: string, newQuantity: number) => void
}

export interface ShoppingCartProviderProps {
    children: ReactNode
}