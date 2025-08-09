import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Particles from "./../public/Particles/Particles";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
				<Particles
					particleColors={["#ffffff", "#ffffff"]}
					particleCount={200}
					particleSpread={5}
					speed={0.1}
					particleBaseSize={50}
					moveParticlesOnHover={false}
					alphaParticles={false}
					disableRotation={true}
				/>
			</div>
			<div className="relative min-h-screen overflow-hidden">
				<main className="relative z-10 container mx-auto px-4 md:px-8 lg:px-20 py-6">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
