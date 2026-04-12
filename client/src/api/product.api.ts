import { API } from "./axios";

export const getProducts = () => API.get("/product");

export const getProductById = (id: string) =>
    API.get(`/product/${id}`);