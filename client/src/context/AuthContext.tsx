import { createContext, useState } from "react";
import { useEffect } from "react";
import { API } from "../api/axios";

//To store user and token globally
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                const res = await API.get("/auth/me");
                setUser(res.data);
            } catch (err) {
                logout(); // invalid token
            }
        };

        fetchUser();
    }, []);
    const [user, setUser] = useState(null);
    const login = (data: any) => {
        localStorage.setItem("token", data.accessToken);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
                console.log(user);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};