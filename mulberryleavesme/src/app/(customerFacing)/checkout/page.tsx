"use client"

import { FormEvent, useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Address, loadStripe, StripeAddressElement, StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import { Product } from "../Types/ShoppingCart.interface";
import { AddressElement, Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { Appearance } from "@stripe/stripe-js";

const appearance : Appearance = {
    theme: 'flat'
}

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
        <>
            <span className="inline-flex w-full justify-between">
                <div className="w-2/3 mx-10">
                    <Elements options={ {clientSecret, appearance}} stripe={stripePromise}>
                        <Form priceInCents={total}/>
                    </Elements>
                </div>
                <div className="w-1/3 mt-6">
                    <CheckoutDetails priceInCents={total} cart={cart} />
                </div>
            </span>
        </>
    )
}

function Form({priceInCents} : {priceInCents: number}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [address, setAddress] = useState<Address>()

    function handleSubmit(e: FormEvent){
        e.preventDefault()
    
        if(stripe == null || elements == null || email == null) return
    
        setIsLoading(true)
        
        stripe.confirmPayment({ elements, confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
        }}).then(({ error }) => {
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage(error.message)
            }
            else {
                setErrorMessage(`An unknown error occured: ${error.message}`)
            }
        }).finally(() => setIsLoading(false))
        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="my-8">
                <h2 className="font-bold text-xl mb-4">Contact Information</h2>
                <Card>
                    <div className="my-4 mx-4">
                        <LinkAuthenticationElement onChange={e => setEmail(e.value.email)}/>
                    </div>
                </Card>
            </div>
            <div className="my-8">
                <h2 className="font-bold text-xl mb-4">Shipping Address</h2>
                <Card className="space-y-8">
                    <div className="my-4 mx-4">
                        <AddressElement 
                            options={{ mode: 'shipping' }} 
                            onChange={e => setAddress(e.value.address)}
                        />
                    </div>
                </Card>
            </div>
            <div className="my-8">
                <h2 className="font-bold text-xl mb-4">Payment</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Checkout</CardTitle>
                        {errorMessage &&
                            <CardDescription className="text-destructive">
                                {errorMessage}
                            </CardDescription>
                        }
                    </CardHeader>
                    <CardContent>
                        <PaymentElement />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" disabled={stripe == null || elements == null || isLoading}>
                            {isLoading ? "Purchasing..." : `Purchase - ${formatCurrency(priceInCents / 100)}`}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
    )
}

function CheckoutDetails ( { priceInCents, cart } : { priceInCents : number } & Cart ) {
    return (
        <div className="border-2 rounded-md my-4">
            <div className="my-8">
            <h1 className="text-2xl font-bold mx-4">Cart</h1>
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
                <div className="w-2/3 mx-2 flex justify-end"><b>Subtotal:</b></div>
                <div>
                    <u>{formatCurrency(cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0)/100)}</u>
                </div>
            </div>
            <div className="flex">
                <div className="w-2/3 mx-2 flex justify-end"><b>Shipping:</b></div>
                <div>
                    <u>{formatCurrency(10)}</u>
                </div>
            </div>
            <br></br>
            <div className="flex">
                <div className="w-2/3 mx-2 flex justify-end"><b>Total:</b></div>
                <div>
                    <b></b> <u>{formatCurrency(priceInCents / 100)}</u>
                </div>
            </div>
            </div>
        </div>
    )
}