import { API } from "./axios";

export const getProducts = () => API.get("/product");

export const getProductById = (id: string) =>
    API.get(`/product/${id}`);

export const createProduct = () => API.post("/product");

export const updateProduct = (id: string) =>
    API.put(`/product/${id}`);

export const deleteProduct = (id: string) =>
    API.delete(`/product/${id}`);