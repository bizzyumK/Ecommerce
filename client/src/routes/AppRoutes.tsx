import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import Admin from "../pages/Admin";
import AdminRoute from "./AdminRoute";
import MyOrder from "../pages/MyOrder";
import EditProduct from "../pages/EditProduct";
import AddProduct from "../pages/AddProduct";
import AdminOrders from "../pages/AdminOrder";
import AdminProducts from "../pages/AdminProduct";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
    return (
        <Routes>
            {/*Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            {/*User routes */}
            < Route
                path="/checkout"
                element={<PrivateRoute><Checkout /></PrivateRoute>}
            />
            <Route
                path="/my-orders"
                element={<PrivateRoute><MyOrder /></PrivateRoute>}
            />

            {/*Auth routes */}
            <Route
                path="/login"
                element={<GuestRoute><Login /></GuestRoute>}
            />
            <Route
                path="/signup"
                element={<GuestRoute><Signup /></GuestRoute>}
            />

            {/*Admin routes with layout*/}
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    </PrivateRoute>
                }
            >
                <Route index element={<Admin />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="edit/:id" element={<EditProduct />} />
                <Route path="add-product" element={<AddProduct />} />
            </Route>
        </Routes>
    );
}