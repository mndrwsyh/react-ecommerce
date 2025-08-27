import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import { Toaster, toast } from "sonner";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/PaymentVerify";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/verify-payment" element={<PaymentVerify />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
