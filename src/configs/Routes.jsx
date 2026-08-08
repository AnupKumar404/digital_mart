import { Routes, Route } from "react-router";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserProfile from "../components/UserProfile";
import NewAddress from "../components/Address";
import Home from "../components/Home";
import Cart from "../components/Cart";
import ProductDetail from "../components/ProductDetail";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/:productName/:productId" element={<ProductDetail />}/>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/new-address" element={<NewAddress />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  );
};

export default AppRoutes;
