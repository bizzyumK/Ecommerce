import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
        <div className="min-h-[calc(100vh-66px)] flex items-center justify-center bg-gray-100 px-4 py-6 sm:py-8">

            <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-lg p-5 sm:p-8">

                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
                    Login Account
                </h2>

                <p className="text-xs sm:text-sm text-center text-gray-500 mt-2 mb-6">
                    Login is for existing users only.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>

                        <label className="text-sm text-gray-600">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email"
                            className="w-full mt-1 px-4 py-2.5 text-sm sm:text-base border rounded-md focus:outline-teal-500"
                        />

                    </div>

                    <div>

                        <label className="text-sm text-gray-600">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password"
                            className="w-full mt-1 px-4 py-2.5 text-sm sm:text-base border rounded-md focus:outline-teal-500"
                        />

                        <div className="text-right mt-2">
                            <a
                                href="#"
                                className="text-xs sm:text-sm text-blue-500 hover:underline"
                            >
                                Forgot Password?
                            </a>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base font-medium py-2.5 rounded-md transition"
                    >
                        Log In
                    </button>

                    <div className="text-center pt-2">

                        <span className="text-xs sm:text-sm text-gray-500">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-teal-500 hover:underline font-medium"
                            >
                                Create account
                            </Link>
                        </span>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Login;