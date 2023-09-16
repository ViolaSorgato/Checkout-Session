import ProductProvider from "./context/ProductContext";
import UserProvider from "./context/UserContext";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Confirmationpage from "./components/Confirmationpage/Confirmationpage";
import ShoppingCartProvider from "./context/CartContext";

const App = () => {
  return (
    <div>
      <ShoppingCartProvider>
        <UserProvider>
          <ProductProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/confirmation" element={<Confirmationpage />} />
              </Routes>
            </BrowserRouter>
          </ProductProvider>
        </UserProvider>
      </ShoppingCartProvider>
    </div>
  );
};

export default App;
