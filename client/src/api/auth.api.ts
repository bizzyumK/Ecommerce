import { API } from "./axios";

export const loginUser = (data: { email: string, password: string }) => {
    return API.post("/auth/login", data);
};

export const signUpUser = (data: any) => {
    return API.post("/auth/signup", data);
};