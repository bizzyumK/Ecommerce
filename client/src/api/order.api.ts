import { API } from "./axios";

export const createOrder = (data: {
    items: { product: string; quantity: number }[];
    address: string;
}) => {
    return API.post("/orders", data);
};

export const getMyOrders = () =>
    API.get("/order/my-orders");