import ProductRecommendation from "../components/ProductRecommendation";
import { CartTable } from "./components/CartTable";

export default function cart() {

    return (
        <div>
            <h1 className="text-5xl my-5 font-bold">My Cart</h1>
            <CartTable />
            <ProductRecommendation/>
        </div>
    )
}