import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Tournaments } from "./pages/Tournaments";
import { Khodam } from "./pages/Khodam";
import { RedirectPage } from "./pages/RedirectPage";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UnderConstruction } from "./components/UnderConstruction";

function AppContent() {
	const [init, setInit] = useState(false);
	const location = useLocation();

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = (container) => {
		console.log(container);
	};

	const options = useMemo(
		() => ({
			fpsLimit: 120,
			interactivity: {},
			particles: {},
			detectRetina: false,
		}),
		[]
	);

	const hideNavbar = /^\/(instagram|discord|twitch|youtube)/.test(
		location.pathname
	);

	return (
		<>
			<UnderConstruction />
			{!hideNavbar && <Navbar />}

			<div className="fixed inset-0 w-full h-full -z-1 pointer-events-none">
				{init && (
					<Particles
						id="tsparticles"
						particlesLoaded={particlesLoaded}
						options={options}
					/>
				)}
			</div>

			<div className="relative min-h-screen overflow-hidden">
				<main className="relative z-10 container mx-auto px-4 md:px-8 lg:px-20 py-6">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/tournaments" element={<Tournaments />} />
						<Route path="/khodam" element={<Khodam />} />
						<Route path="/:target" element={<RedirectPage />} />
					</Routes>
				</main>
				{!hideNavbar && <Footer />}
			</div>
		</>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}
