import { API } from "./axios";

export const createOrder = (data: {
    items: { product: string; quantity: number }[];
    address: string;
}) => {
    return API.post("/order", data);
};

export const getMyOrders = () =>
    API.get("/order/my-orders");

export const getAllOrders = () => {
    return API.get("/order");
};

export const updateOrderStatus = (id: string, status: string) => {
    return API.put(`/order/${id}`, { status });
};