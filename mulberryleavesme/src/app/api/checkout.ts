import { NextResponse } from 'next/server'
import db from "@/db/db";
import { Product } from "../(customerFacing)/Types/ShoppingCart.interface";
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface CheckoutRequestBody {
    cart: Product[]
}

interface CheckoutResponse {
    clientSecret: string;
    total: number
}

export default async function POST(request: Request) {

    console.log("Checkout API reached");

    const { cart } : CheckoutRequestBody = await request.json();

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
        return NextResponse.json({ error: "Stripe payment intent failed"})
    }
}

async function isValidProduct(productId : string){
    const product = await db.product.findUnique( { where : {id: productId}})
    return product !== null;
}