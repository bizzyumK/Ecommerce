import { API } from "./axios";

export const createOrder = (data: any) =>
    API.post("/order", data);

export const getMyOrders = () =>
    API.get("/order/my-orders");