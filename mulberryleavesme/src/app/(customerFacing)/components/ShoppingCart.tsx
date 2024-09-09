import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../Types/ShoppingCart.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"

export function ShoppingCart() {

    return (
        <div className="my-2 mx-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="">
              <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff", }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Cart</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <CartContent/>
            <DropdownMenuItem className="">
              <Button>
                <Link href="/cart">View Cart</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
}
  
 function CartContent() {

    const { cart, updateCartItemQuantity, removeItemFromCart, addItemToCart} = useShoppingCart();

    const [newProduct, setNewProduct] = useState<Product>({
        id: Math.floor(Math.random() * 1000).toString(),
        name: "",
        quantity: 0,
        priceInCents: 0,
        imagePath: ""
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
            id: Math.floor(Math.random() * 1000).toString(),
            name: "",
            quantity: 0,
            priceInCents: 0,
            imagePath: ""
        })
    }
  
    if(cart.length == 0){return <DropdownMenuItem> Cart is empty</DropdownMenuItem>}
  
    return (
        <>
            {cart.map((product) => (
                <DropdownMenuItem>
                    {product.id}
                </DropdownMenuItem>
            ))}
        </>
    )
  
  }