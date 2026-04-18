import { API } from "./axios";

export const getProducts = () => API.get("/product");

export const getProductById = (id: string) =>
    API.get(`/product/${id}`);

export const createProduct = (data: object) => API.post("/product", data);

export const updateProduct = (id: string, data: object) =>
    API.put(`/product/${id}`, data);

export const deleteProduct = (id: string) =>
    API.delete(`/product/${id}`);