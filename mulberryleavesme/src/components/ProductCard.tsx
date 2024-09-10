"use client"

import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "@/app/(customerFacing)/context/ShoppingCartContext";
import { Product } from "@/app/(customerFacing)/Types/ShoppingCart.interface";

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export function ProductCard({name, priceInCents, description, id, imagePath}: ProductCardProps) {
    const { addItemToCart } = useShoppingCart();

    const product: Product = {
        id: id,
        name: name,
        quantity: 1,
        priceInCents: priceInCents,
        imagePath: imagePath
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        addItemToCart(product)
    }
    
    return (
        <Card className="flex overflow-hidden flex-col">
            <div className="relative w-full h-auto aspect-video">
                <Image src={`/${imagePath}`} fill alt={name}/>
            </div>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter className="space-x-4">
                <Button asChild size="lg" className="w-full">
                    <Link href={`/products/${id}/productPage`}>
                        View Product
                    </Link>
                </Button>
                <Button size="lg" className="w-full" onClick={handleClick}>
                    Add To Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

export function ProductCardSkeleton() {
    return (
        <Card className="flex overflow-hidden flex-col animate-pulse">
        <div className="w-full aspect-video bg-gray-300"></div>
        <CardHeader>
            <CardTitle>
                <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
            </CardTitle>
            <CardDescription>
                <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="w-full h-4 rounded-full bg-gray-300"></div>
            <div className="w-full h-4 rounded-full bg-gray-300"></div>
            <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" disabled size="lg"></Button>
        </CardFooter>
    </Card>
    )
}