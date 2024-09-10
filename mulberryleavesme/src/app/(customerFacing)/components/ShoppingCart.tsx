import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../Types/ShoppingCart.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

export function ShoppingCart() {

    const { cart, updateCartItemQuantity, removeItemFromCart, addItemToCart, clearCart} = useShoppingCart();


    /*const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        clearCart()
        <DropdownMenuItem>
        <Button onClick={handleClick}>
            Clear Cart
        </Button>
    </DropdownMenuItem>
    }*/

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
            <DropdownMenuItem className="my-2">
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
                <DropdownMenuItem className="my-8">
                    <div className="flex">
                        <div className="w-2/3 flex justify-center mx-2">
                            <Link href={`/products/${product.id}/productPage`}>
                                <Image src={`/${product.imagePath}`} 
                                    width={0} 
                                    height={0} 
                                    sizes="100vw" 
                                    style={{ 
                                        width: '95%', 
                                        height: 'auto' 
                                    }} 
                                    alt={product.name}
                                />
                            </Link>
                        </div>
                        <div>
                            <b>{product.name}</b><br />
                            {formatCurrency(product.priceInCents / 100)}<br/>
                            <b>Quantity:</b> {product.quantity}
                        </div>
                    </div>
                </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
                <b>Total:</b> <u>{formatCurrency(cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0)/100)}</u>
            </DropdownMenuItem>
        </>
    )
  
  }