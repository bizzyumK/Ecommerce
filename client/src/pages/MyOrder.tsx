import { useEffect } from "react"
import { getMyOrders } from "../api/order.api"

const MyOrder = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getMyOrders();
            const allProducts = res.data.data;
            console.log(allProducts);
        } catch (err) {
            console.log("Error fetching products", err);
        }
    };
    return (
        <div>MyOrder</div>
    )
}

export default MyOrder