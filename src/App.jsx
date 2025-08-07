import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<BrowserRouter>
			<div className="absolute inset-0 bg-[rgba(200,200,200,0.6)] backdrop-blur-[10px]"></div>
			<Navbar />
			<Routes>
				<Route index element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
