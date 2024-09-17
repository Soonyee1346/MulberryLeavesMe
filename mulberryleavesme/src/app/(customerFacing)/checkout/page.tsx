"use client"

import { useShoppingCart } from "../context/ShoppingCartContext";
import CheckoutLoader from "./components/CheckoutLoader";

export default function checkout() {

    const {cart} = useShoppingCart()

    return (
        <div>
            hi
        </div>
       /* <>
            <CheckoutLoader cart={cart}/>
        </>*/
    )
}

/*import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default function PurchasePage() {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: "AUD", 
        metadata: { productId: product.id}
    })

    if (paymentIntent.client_secret == null) {
        throw Error ("Stripe failed to create payment intent")
    }

    return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret}/>


}*/