import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tournaments } from "./pages/Tournaments";
import { Khodam } from "./pages/Khodam";
import { RedirectPage } from "./pages/RedirectPage";
import { Navbar } from "./components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    return (
        <BrowserRouter>
            <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[10px]"></div>
            <Navbar />

            <Routes>
                <Route index element={<Home />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/khodam" element={<Khodam />} />

                {/* Wildcard handler */}
                <Route path="/*" element={<RedirectPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
