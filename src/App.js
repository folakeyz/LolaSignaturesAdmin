import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Login,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  Product,
  Category,
  Customer,
  Admin,
  Orders,
  Delivery,
  Testimony,
} from "./screens";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/resetPassword" exact element={<ResetPassword />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/product" exact element={<Product />} />
        <Route path="/category" exact element={<Category />} />
        <Route path="/users" exact element={<Customer />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/delivery" exact element={<Delivery />} />
        <Route path="/testimony" exact element={<Testimony />} />
      </Routes>
    </Router>
  );
}

export default App;
