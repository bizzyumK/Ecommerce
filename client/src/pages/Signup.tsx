import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth.api";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            await signupUser({ username, email, password });
            alert("Account created successfully");
            navigate("/login");
        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-[calc(100vh-66px)] flex items-center justify-center bg-gray-100 px-4 py-6 sm:py-8">

            <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-lg p-5 sm:p-8">

                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
                    Create Account
                </h2>

                <p className="text-xs sm:text-sm text-center text-gray-500 mt-2 mb-6">
                    Join us and start shopping instantly
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>

                        <label className="text-sm text-gray-600">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your Username"
                            className="w-full mt-1 px-4 py-2.5 text-sm sm:text-base border rounded-md focus:outline-teal-500"
                        />

                    </div>

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

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base font-medium py-2.5 rounded-md transition"
                    >
                        Create Account
                    </button>

                    <div className="text-center pt-2">

                        <span className="text-xs sm:text-sm text-gray-500">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-teal-500 hover:underline font-medium"
                            >
                                Login
                            </a>
                        </span>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Signup;