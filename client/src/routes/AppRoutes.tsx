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

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>} />
            <Route path="/my-orders" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
            <Route path="/admin/edit/:id" element={<PrivateRoute><AdminRoute><EditProduct /></AdminRoute></PrivateRoute>} />
            <Route path="/admin/add-product" element={<PrivateRoute><AdminRoute><AddProduct /></AdminRoute></PrivateRoute>} />
            <Route path="/admin/orders" element={<PrivateRoute> <AdminRoute> <AdminOrders /> </AdminRoute> </PrivateRoute>
            }
            />
        </Routes>
    );
}