"use server"

import db from "@/db/db"

export async function getPopularProducts() {

    const products = await db.product.findMany({ 
        where: { 
            isAvailableForPurchase: true
        }, 
        orderBy: { 
            orders: { 
                _count: "desc"
            }
        },
        take: 4
    })

    return products
}