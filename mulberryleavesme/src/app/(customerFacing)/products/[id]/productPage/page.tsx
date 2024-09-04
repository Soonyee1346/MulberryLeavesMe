import db from "@/db/db"
import { notFound } from "next/navigation"
import { ProductPageLarge } from "./_components/ProductPageLarge"

export default async function productPage({ 
    params: { id}
} : {
    params: { id: string}
}) {
    const product = await db.product.findUnique({ where: { id}})
    if (product == null) return notFound()

    return <ProductPageLarge product={product}/>

}