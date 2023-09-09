import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Confirmationpage from "./components/Confirmationpage/Confirmationpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="confirmation" element={<Confirmationpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
