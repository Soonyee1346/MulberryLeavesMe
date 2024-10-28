import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
    const event = stripe.webhooks.constructEvent(
        await req.text(), 
        req.headers.get("stripe-signature") as string, 
        process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === "charge.succeeded") {
        const charge = event.data.object
        const productIDsMeta = charge.metadata.productIDs
        const email = charge.billing_details.email
        // Customer Details includes Address , name. Can include tracking number, phone, carrier
        const customerDetails = charge.shipping
        const pricePaidInCents = charge.amount

        const productIds = JSON.parse(productIDsMeta)

        const validationPromises = productIds.map((id: string) => console.log(id));
        const validationResults = await Promise.all(validationPromises);
    
        const allValid = validationResults.every(valid => valid);

        if (!allValid || email == null || customerDetails == null) {
            
            return new NextResponse("Bad Request", { status: 400 })
        }
    }
}