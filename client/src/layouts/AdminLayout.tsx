import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">

            <div className="w-full lg:w-64 bg-white shadow-md p-4 sm:p-6 flex flex-col gap-4 lg:gap-6">

                <h1 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
                    Admin Panel
                </h1>

                <div className="flex flex-col gap-2 text-sm">

                    <button
                        onClick={() => navigate("/admin")}
                        className={`text-left px-3 py-2 rounded-lg cursor-pointer ${location.pathname === "/admin"
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <i className="fa-solid fa-chart-line mr-2"></i>
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/products")}
                        className={`text-left px-3 py-2 rounded-lg cursor-pointer ${location.pathname === "/admin/products"
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <i className="fa-solid fa-box mr-2"></i>
                        Products
                    </button>

                    <button
                        onClick={() => navigate("/admin/orders")}
                        className={`text-left px-3 py-2 rounded-lg cursor-pointer ${location.pathname === "/admin/orders"
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <i className="fa-solid fa-truck mr-2"></i>
                        Orders
                    </button>

                </div>

            </div>

            <div className="flex-1 p-4 sm:p-6 md:p-8">
                <Outlet />
            </div>

        </div>
    );
}