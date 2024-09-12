"use client"

import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@prisma/client";
import { useShoppingCart } from "@/app/(customerFacing)/context/ShoppingCartContext";

type productProps = {
    product: Product
}

type itemToAdd = {
    id: string
    name: string
    quantity: number
    priceInCents: number
    imagePath: string
}

type itemToAddProps = {
    item: itemToAdd
}

export function ProductPageLarge({ product } : productProps) {

    return(
            <div className="w-full mx-auto space-y-8">
                <div className="flex gap-6 items-center">
                    <div className="aspect-video flex-shrink-0 w-2/3 relative">
                        <Image src={`/${product.imagePath}`} fill alt={product.name} className="object-cover"/>
                    </div>
                    <div className="max-w-5xl w-full mx-auto space-y-8">
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <div className="text-3xl">
                            {formatCurrency(product.priceInCents / 100)}
                        </div>
                        <div className="max-w-5xl w-full mx-auto" >
                            <div className="w-full">
                                <AddToCart product={product}/>
                            </div>
                        </div>
                        <div className="text-sm line-clamp-3 text-muted-foreground">
                                {product.description}
                        </div>
                    </div>
                </div>
            </div>
    )
}

function AddToCart({ product } : productProps) {

    const { addItemToCart } = useShoppingCart();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        const item : itemToAdd = { 
            id: product.id,
            name: product.name,
            quantity: 1,
            priceInCents: product.priceInCents,
            imagePath: product.imagePath
        }
        addItemToCart(item)
    }

    return (
        <div>
            <form className="space-y-4">
                <div>
                    <label>Quantity:</label><br/>
                    <input type="number" id="quantity" className="w-2/3 border-4 rounded-md" name="quantity" min="1" max="5" placeholder="Quantity"></input>
                    <p className="line-clamp-3 text-muted-foreground">*Max Amount: 5</p>
                </div>
                <div className="space-y-2">
                    <Button type="submit" className=" w-full mx-auto">Add To Cart</Button>
                </div>
            </form>
        </div>
    )
}