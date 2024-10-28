"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getPopularProducts } from "./getPopularProducts";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product as CartProduct } from "@/app/(customerFacing)/Types/ShoppingCart.interface"

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export default function ProductRecommendation() {
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const products = await getPopularProducts();
                setPopularProducts(products);
            } catch (err) {
                setError("Failed to fetch popular products.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <h1 className="mx-5 my-5 font-bold text-2xl">Recommended Products</h1>
            <ScrollArea>
                <div className="flex w-max">
                    {
                        popularProducts.map((product) => (
                            <div key={product.id} className="mx-3">
                                {ScrollCard(product)}
                            </div>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    )
}

function ScrollCard(product : Product){
    const { addItemToCart } = useShoppingCart();

    const item: CartProduct = {
        id: product.id,
        name: product.name,
        quantity: 1,
        priceInCents: product.priceInCents,
        imagePath: product.imagePath
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        addItemToCart(item)
    }
    return (
            <Card className="flex overflow-hidden flex-col">
                <Link href={`/products/${product.id}/productPage`}>
                    <div className="relative w-full h-auto aspect-video">
                        <Image src={`/${product.imagePath}`} fill alt={product.name}/>
                    </div>
                </Link>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="flex justify-between">
                        {formatCurrency(product.priceInCents / 100)}
                        <Button size="lg" className="w-1/2" onClick={handleClick}>
                            Add To Cart
                        </Button>
                    </CardDescription>
                </CardHeader>
            </Card>
    )
}
