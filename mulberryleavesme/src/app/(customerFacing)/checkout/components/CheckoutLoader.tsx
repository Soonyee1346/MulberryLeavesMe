/*"use server"

import db from "@/db/db";
import { Product } from "../../Types/ShoppingCart.interface";
import { notFound } from "next/navigation"
import Stripe from "stripe"
//import { CheckoutForm } from "./checkout"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface CheckoutLoaderProps {
    cart: Product[]
}

export default async function CheckoutLoader( { cart } : CheckoutLoaderProps){

    const validationPromises = cart.map(product => isValidProduct(product.id));
    const validationResults = await Promise.all(validationPromises);

    const allValid = validationResults.every(valid => valid);
    if (!allValid) {
        notFound();
    }

    /*const paymentIntent = await stripe.paymentIntents.create({
        amount: cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0),
        currency: "AUD",
    })

    if (paymentIntent.client_secret == null) {
        throw Error ("Stripe failed to create payment intent")
    }

    return <>
        {cart.reduce((total, product) => total + (product.priceInCents * product.quantity), 0)}
    </>
    
    <CheckoutForm cart={cart} clientSecret={paymentIntent.client_secret}/>

}

async function isValidProduct(productId : string){
    const product = await db.product.findUnique( { where : {id: productId}})
    return product !== null;
}*/