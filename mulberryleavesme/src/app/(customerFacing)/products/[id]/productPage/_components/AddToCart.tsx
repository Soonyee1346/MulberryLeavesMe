import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export function AddToCart() {
    return (
        <div>
            <form className="space-y-4">
                <label>Quantity</label>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Quantity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                    <p className="line-clamp-3 text-muted-foreground">*Max Amount: 5</p>
                </Select>
                <div className="space-y-2">
                    <Button className=" w-full mx-auto">Add To Cart</Button>
                    <Button className="max-w-5xl w-full mx-auto">Buy Now</Button>
                </div>
            </form>
        </div>
    )
}