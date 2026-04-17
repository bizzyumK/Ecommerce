import { API } from "./axios";

export const createOrder = (data: {
    items: { product: string; quantity: number }[];
    address: string;
}) => {
    return API.post("/order", data);
};

export const getMyOrders = () =>
    API.get("/order/my-orders");