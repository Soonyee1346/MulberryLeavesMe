import { useShoppingCart } from "../context/ShoppingCartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

export function DropdownShoppingCart() {

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
            <DropdownCartContent/>
            <DropdownMenuItem className="my-2">
              <Button>
                <Link href="../../cart">View Cart</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
}
  
 function DropdownCartContent() {

    const { cart } = useShoppingCart();
  
    if(cart.length == 0){return <DropdownMenuItem>Your Cart is empty</DropdownMenuItem>}
  
    return (
        <>
            {cart.map((product) => (
                <DropdownMenuItem key={product.id} className="my-8">
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