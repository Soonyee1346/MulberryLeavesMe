import { Badge } from "@/components/ui/badge";


export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-6 text-4xl font-bold">Thank You! Your order has been placed!</h1>
            <p className="mt-6 text-lg">The order confirmation email has been sent to your email inbox</p>
            <Badge className="mt-6 text-lg">Order ID: #12345</Badge>
            <p><b>*** YOUR ORDER HAS NOT BEEN PLACED</b></p>
            <p><b>*** AN EMAIL HAS NOT BEEN SENT TO YOUR EMAIL INBOX.</b></p>
            <p><b>*** YOU HAVE NOT BEEN CHARGED</b></p>
        </div>
    )
}