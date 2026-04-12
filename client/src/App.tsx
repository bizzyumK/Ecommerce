import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					<Navbar/>
					<AppRoutes />
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
