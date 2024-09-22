"use client"

import { FormEvent, useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Product } from "../Types/ShoppingCart.interface";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";

interface PaymentIntentResponse {
    clientSecret: string;
    total: number;
}

interface Cart {
    cart: Product[]
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
                    body: JSON.stringify({ cart })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch total");
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
                    <div>
                        {total !== null && clientSecret !== null ? 
                            <>
                                <CheckoutForm clientSecret={clientSecret} total={total} cart={cart} /> 
                            </>
                            : 
                            "Loading..."
                        }
                    </div>
                </>
            )}
        </div>
    )
}

function CheckoutForm({clientSecret, total, cart} : PaymentIntentResponse & Cart){
    return (
        <div>
            <Elements options={ {clientSecret}} stripe={stripePromise}>
                <Form priceInCents={total} cart={cart}/>
            </Elements>
        </div>
    )
}

function Form({priceInCents, cart} : {priceInCents: number} & Cart) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e: FormEvent){
        e.preventDefault()
    
        if(stripe == null || elements == null) return
    
        setIsLoading(true)

        // Check for existing order

        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    <CardDescription>
                        {cart.map((product) => (
                            <div className="my-8 flex">
                                    <div className="w-1/3 flex justify-left mx-2">
                                        <Link href={`/products/${product.id}/productPage`}>
                                            <Image src={`/${product.imagePath}`} 
                                                width={0} 
                                                height={0} 
                                                sizes="100vw" 
                                                style={{ 
                                                    width: '95%', 
                                                    height: 'auto' 
                                                }} 
                                                alt={product.name}
                                            />
                                        </Link>
                                    </div>
                                    <div>
                                        <b>{product.name}</b><br />
                                        {formatCurrency(product.priceInCents / 100)}<br/>
                                        <b>Quantity:</b> {product.quantity}
                                    </div>
                            </div>
                        ))}
                        <div className="flex">
                            <div className="w-1/3 mx-2 flex justify-end"><b>Subtotal:</b></div>
                            <div>
                                <u>{formatCurrency(cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0)/100)}</u>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/3 mx-2 flex justify-end"><b>Shipping:</b></div>
                            <div>
                                <u>{formatCurrency(10)}</u>
                            </div>
                        </div>
                        <br></br>
                        <div className="flex">
                            <div className="w-1/3 mx-2 flex justify-end"><b>Total:</b></div>
                            <div>
                                <b></b> <u>{formatCurrency(priceInCents / 100)}</u>
                            </div>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe == null || elements == null || isLoading}>
                        {isLoading ? "Purchasing...": `Purchase - ${formatCurrency(priceInCents / 100)}`}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}