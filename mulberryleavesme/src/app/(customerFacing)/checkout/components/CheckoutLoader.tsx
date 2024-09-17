"use server"

import { Product } from "../../Types/ShoppingCart.interface";
import { notFound } from "next/navigation"
import Stripe from "stripe"
//import { CheckoutForm } from "./checkout"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function CheckoutLoader(cart : Product[]){

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0),
        currency: "AUD"
    })

    if (paymentIntent.client_secret == null) {
        throw Error ("Stripe failed to create payment intent")
    }

    return <>
        <h1>hi</h1>
    </>/*<CheckoutForm cart={cart} clientSecret={paymentIntent.client_secret}/>*/

}