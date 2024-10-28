"use server"

import db from "@/db/db"

export async function getPopularProducts() {
    const popularProducts = await db.orderProduct.groupBy({
        by: ['productId'],
        _count: {
            productId: true,
        },
        where: {
            product: {
                isAvailableForPurchase: true,
            },
        },
        orderBy: {
            _count: {
                productId: 'desc',
            },
        },
        take: 4,
    });
    
    // Fetch product details for the top popular products
    const productIds = popularProducts.map((item) => item.productId);
    const products = await db.product.findMany({
        where: {
            id: { in: productIds },
        },
    });

    /*const products = await db.product.findMany({ 
        where: { 
            isAvailableForPurchase: true
        }, 
        orderBy: { 
            order: { 
                _count: "desc"
            }
        },
        take: 4
    })

    return products*/
}