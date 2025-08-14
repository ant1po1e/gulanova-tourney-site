import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Tournaments } from "./pages/Tournaments";
import { Khodam } from "./pages/Khodam";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	const [init, setInit] = useState(false);

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
			interactivity: {
				events: {
					onClick: {
						enable: false,
						mode: "push",
					},
					onHover: {
						enable: false,
						mode: "repulse",
					},
				},
				modes: {
					push: {
						quantity: 4,
					},
					repulse: {
						distance: 200,
						duration: 0.4,
					},
				},
			},
			particles: {
				color: {
					value: "#ffffff",
				},
				links: {
					color: "#ffffff",
					distance: 150,
					enable: true,
					opacity: 0.5,
					width: 1,
				},
				move: {
					direction: "none",
					enable: true,
					outModes: {
						default: "bounce",
					},
					random: false,
					speed: 1,
					straight: false,
				},
				number: {
					density: {
						enable: true,
					},
					value: 100,
				},
				opacity: {
					value: 0.5,
				},
				shape: {
					type: "circle",
				},
				size: {
					value: { min: 1.5, max: 5 },
				},
			},
			detectRetina: false,
		}),
		[]
	);
	return (
		<BrowserRouter>
			<Navbar />
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
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
