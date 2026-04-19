import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white shadow-md p-6 flex flex-col gap-6">
                <h1 className="text-2xl font-bold">
                </h1>

                <div className="flex flex-col gap-2 text-sm">
                    <button
                        onClick={() => navigate("/admin")}
                        className={`text-left px-3 py-2 rounded-lg ${location.pathname === "/admin"
                            ? "bg-black text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/admin/products")}
                        className={`text-left px-3 py-2 rounded-lg ${location.pathname === "/admin/products"
                            ? "bg-black text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        Products
                    </button>

                    <button
                        onClick={() => navigate("/admin/orders")}
                        className={`text-left px-3 py-2 rounded-lg ${location.pathname === "/admin/orders"
                            ? "bg-black text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        Orders
                    </button>
                </div>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}