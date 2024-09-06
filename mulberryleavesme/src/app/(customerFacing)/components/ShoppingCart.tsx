import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../Types/ShoppingCart.interface"

function ShoppingCart() {
    const { cart, updateCartItemQuantity, removeItemFromCart, addItemToCart} = useShoppingCart();

    const [newProduct, setNewProduct] = useState<Product>({
        id: Math.floor(Math.random() * 1000),
        name: "",
        quantity: 0,
        priceInCents: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewProduct((prevProduct: any) => ({
            ...prevProduct,
            [name]: name === "quantity" ? parseInt(value) : value
        }))
    }

    const handleAddItem = () => {
        addItemToCart(newProduct)
        setNewProduct({
            id: Math.floor(Math.random() * 1000),
            name: "",
            quantity: 0,
            priceInCents: 0
        })
    }

    return (
        <h1>Hi</h1>
    )
}