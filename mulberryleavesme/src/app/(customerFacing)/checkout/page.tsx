"use client"

import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface PaymentIntentResponse {
    clientSecret: string;
    total: number;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export default function Checkout() {

    const { cart } = useShoppingCart();
    const [total, setTotal] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        async function createPaymentIntent() {
            try {
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cart }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch total");
                }

                const data : PaymentIntentResponse = await response.json();
                setClientSecret(data.clientSecret)
                setTotal(data.total);
            } catch (err : any) {
                setError(err.message);
            }
        }
        
        createPaymentIntent();
    }, [cart])

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <p>Total: {total !== null ? total + " cents" : "Loading..."}</p>
                    {clientSecret && <p>Ready for payment processing...</p>}
                </>
            )}
        </div>
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