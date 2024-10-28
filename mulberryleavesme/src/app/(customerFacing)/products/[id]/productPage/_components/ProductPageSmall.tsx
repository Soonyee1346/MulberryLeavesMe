//Testing ?

import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { AddToCart } from "./AddToCart";

type product = {
    product: {
        imagePath: string
        name: string
        priceInCents: number
        description: string
    }
}

export function ProductPageSmall({ product} : product) {
    return(
        <>
            <div className="md: items-center">
            <div className="max-w-5xl w-full mx-auto space-y-8">
                <div className="aspect-video flex-shrink-0 w-full items-center relative">
                    <Image src={`/${product.imagePath}`} fill alt={product.name} className="object-cover"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="line-clamp-3 text-muted-foreground">
                            {product.description}
                        </div>
                    <div className="text-lg">
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                </div>
                <div className="max-w-5xl w-full mx-auto" >
                    <div className="w-full">
                        <AddToCart/>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}