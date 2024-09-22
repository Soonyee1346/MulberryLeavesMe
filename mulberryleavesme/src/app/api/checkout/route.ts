import { NextResponse } from 'next/server'
import db from "@/db/db"
import { Product } from "../../(customerFacing)/Types/ShoppingCart.interface"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface CheckoutRequestBody {
    cart: Product[]
}

export async function POST(request: Request) {

    console.log("Checkout API reached");

    const { cart } = await request.json() as CheckoutRequestBody

    const validationPromises = cart.map(product => isValidProduct(product.id));
    const validationResults = await Promise.all(validationPromises);

    const allValid = validationResults.every(valid => valid);
    if (!allValid) {
        
        return NextResponse.json({ error: 'One or more products are invalid' }, { status: 404 });
    }

    const totalAmount = cart.reduce(
        (total: number, product: Product) => 
            total + product.priceInCents * product.quantity, 
        0
    )

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "AUD",
            automatic_payment_methods: { enabled: true }
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret as string,
            total: totalAmount
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
          { error: 'Stripe payment intent failed' },
          { status: 500 }
        )
    }

}

async function isValidProduct(productId : string){
    const product = await db.product.findUnique( { where : {id: productId}})
    return product !== null;
}

export async function GET() {

    return NextResponse.json({ message: "GET request successful!" });

}