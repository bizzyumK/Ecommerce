import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });
            login(res.data); // store token + user
            navigate("/");   // redirect home
        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-[calc(100vh-66px)] flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800">
                    Login Account
                </h2>
                <p className="text-sm text-center text-gray-500 mt-2">
                    Login is for existing users only. An account will be created
                    automatically when you make a purchase.
                </p>
                <button className="w-full mt-6 flex items-center justify-center gap-3 border border-blue-400 text-blue-600 rounded-md py-2 hover:bg-blue-50 transition">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Login with Google
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="px-3 text-sm text-gray-400">Or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm text-gray-600">Email*</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@email.com"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-teal-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Password*</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-teal-500"
                        />
                        <div className="text-right mt-2">
                            <a
                                href="#"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-md transition"
                    >
                        Log In
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-500">
                            Don’t have an account?{" "}
                            <a
                                href="/signup"
                                className="text-teal-500 hover:underline font-medium"
                            >
                                Create account
                            </a>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;