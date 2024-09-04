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

export function ProductPageLarge({ product} : product) {
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
                                <AddToCart/>
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