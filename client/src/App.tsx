import ProductProvider from "./context/ProductContext";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Confirmationpage from "./components/Confirmationpage/Confirmationpage";

const App = () => {
  return (
    <div>
      <ProductProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/confirmation" element={<Confirmationpage />} />
          </Routes>
        </BrowserRouter>
        {/* <MainContent /> */}
      </ProductProvider>
    </div>
  );
};

export default App;
