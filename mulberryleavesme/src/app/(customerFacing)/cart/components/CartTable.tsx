"use client"

import { formatCurrency } from "@/lib/formatters";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Product } from "../../Types/ShoppingCart.interface";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartTable() {

    const { cart, updateCartItemQuantity } = useShoppingCart()
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const total = cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0)
        setCartTotal(total)
    }, [cart])

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>, product : Product ) => {
        updateCartItemQuantity(product.id, (Number(event.target.value)))
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {cart.map(product => (
                <TableRow key={product.id}>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                        {product.name}
                    </TableCell>
                    <TableCell>
                    <Input 
                        type="number" 
                        id="quantity" 
                        className="w-1/2 border-4 rounded-md" 
                        name="quantity" min="1" 
                        value={product.quantity}
                        onChange={(event) => handleInputChange(event, product)} 
                    />
                    </TableCell>
                    <TableCell>
                        {formatCurrency(product.priceInCents * product.quantity / 100)}
                    </TableCell>                    
                </TableRow>
            ))}
            <TableRow>
                <TableHead>Cart Total</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>
                    {formatCurrency(cartTotal / 100)}
                </TableHead>
            </TableRow>
            <TableRow>
                <TableHead>
                    Shipping
                </TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>
                    $10.00
                </TableHead>
            </TableRow>
            <TableRow>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>
                    {formatCurrency((cartTotal + 1000)/ 100)}
                </TableHead>
            </TableRow>
            <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>
                    <div className="my-4">
                    <Button>
                        <Link href="/checkout">
                            Checkout
                        </Link>
                    </Button>
                    </div>
                </TableHead>
            </TableRow>
        </TableBody>
        </Table>
    )
}