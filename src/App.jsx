import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import Particles from "./../public/Particles/Particles";

function App() {
	return (
		<BrowserRouter>
			<div className="relative min-h-screen overflow-hidden">
				<div className="absolute inset-0 -z-10">
					<Particles
						particleColors={["#ffffff", "#ffffff"]}
						particleCount={200}
						particleSpread={10}
						speed={0.1}
						particleBaseSize={100}
						moveParticlesOnHover={false}
						alphaParticles={false}
						disableRotation={true}
					/>
				</div>

				<Navbar />
				<main className="relative z-10 container mx-auto px-4 md:px-8 lg:px-20 py-6">
					<Routes>
						<Route index element={<Home />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
