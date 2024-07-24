import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { Footer } from "../components/Footer";
import Categories from "../pages/Categories";
import Restaurants from "../pages/Restaurants";
import RegisterDelivery from "../pages/Register Delivery";
import Commandes from "../pages/Commandes";
import Restaurateur from "../pages/Restaurateur";
import SearchResult from "../pages/SearchResult";

const Navigation = () => {
    const productsInCart = useSelector(cartProducts);

    return (
        <BrowserRouter>
            <Header cartCount={productsInCart ? productsInCart.length : 0}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/search-result" element={<SearchResult />} />
                <Route path="/delivery" element={<Commandes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-delivery" element={<RegisterDelivery />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/restaurateur" element={<Restaurateur />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Navigation;