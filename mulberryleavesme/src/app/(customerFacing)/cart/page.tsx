import ProductRecommendation from "../components/ProductRecommendation";
import { CartTable } from "./components/CartTable";

export default function cart() {

    return (
        <div>
            <CartTable />
            <ProductRecommendation/>
        </div>
    )
}