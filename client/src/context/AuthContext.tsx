import { createContext, useState, useEffect } from "react";
import { API } from "../api/axios";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const login = (data: any) => {
        localStorage.setItem("token", data.accessToken);
        setUser({
            id: data.id,
            email: data.email,
            isAdmin: data.isAdmin,
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await API.get("/auth/me");
                setUser(res.data);
            } catch (err) {
                logout(); // token invalid
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};