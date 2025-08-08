import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	return (
		<>
			<header className="flex items-center justify-between mb-5 md:mb-0 my-4 px-12">
				<div className="hidden md:flex" />
				<div className="flex items-center">
					<Link to="/" className="flex items-center">
						<img
							src="/gulanova.webp"
							alt="Gulanova Logo"
							className="h-12 md:h-20 hover:rotate-3 hover:scale-125 transition duration-300"
						/>
						<span className="text-white text-3xl md:text-5xl font-bold ml-3 hidden md:block">
							GULANOVA
						</span>
					</Link>
				</div>

				{/* Avatar Dropdown */}
				<div className="relative">
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center">
						<img
							src="https://a.ppy.sh/u/guest"
							alt="User"
							className="w-12 h-12 rounded-full hover:ring-4 hover:ring-white transition duration-300"
						/>
					</button>

					{dropdownOpen && (
						<div
							className={twMerge(
								"absolute left-1/2 -translate-x-1/2 md:right-0 md:left-auto md:-translate-x-0 mt-2 w-36",
								"bg-gradient-to-r from-[#729dd8] text-center to-[#3166a7] rounded-lg shadow-lg z-50"
							)}>
							<div className="p-3 text-white border-b border-white/20">
								<span className="block text-sm font-medium text-center">
									Guest
								</span>
							</div>
							<div className="p-3 text-white border-b border-white/20">
								<span className="block text-sm font-medium text-center">
									You are: VISITOR
								</span>
							</div>
							<button
								className="w-full p-3 text-white font-bold hover:bg-white/20 transition duration-300 rounded-b-lg"
								onClick={() => (window.location.href = "/auth/logout")}>
								Log In
							</button>
						</div>
					)}
				</div>

				{/* Hamburger Menu */}
				<div className="flex items-center md:hidden">
					<button onClick={() => setIsOpen(true)}>
						<i className="bi bi-list text-4xl text-white" />
					</button>
				</div>
			</header>

			{/* Desktop Navigation */}
			<nav className="sticky top-0 z-50 before:absolute before:inset-x-0 before:bottom-0">
				<div className="transition duration-300 backdrop-blur-none">
					<div className="hidden md:flex justify-center items-center p-5">
						<Link
							to="/"
							className={`text-white font-medium mx-4 ${
								isActive("/") ? "glow-text" : "nav-link"
							}`}>
							HOME
						</Link>
						<Link
							to="/about"
							className={`text-white font-medium mx-4 ${
								isActive("/about") ? "glow-text" : "nav-link"
							}`}>
							ABOUT
						</Link>
						<Link
							to="/tournaments"
							className={`text-white font-medium mx-4 ${
								isActive("/tournaments") ? "glow-text" : "nav-link"
							}`}>
							TOURNAMENTS
						</Link>
						<Link
							to="/khodam"
							className={`text-white font-medium mx-4 ${
								isActive("/khodam") ? "glow-text" : "nav-link"
							}`}>
							KHODAM
						</Link>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={twMerge(
					`fixed top-0 left-0 w-full h-1/3 bg-blue-900/95 flex flex-col md:hidden justify-center items-center z-[100] transition-all`,
					`duration-500 ease-in-out transform ${
						isOpen
							? "translate-y-0 opacity-100 pointer-events-auto"
							: "-translate-y-full opacity-0 pointer-events-none"
					}`
				)}>
				<button
					className="absolute top-5 right-12 text-white p-2"
					onClick={() => setIsOpen(false)}>
					<i className="bi bi-x-circle-fill text-2xl"></i>
				</button>
				<Link
					to="/"
					className={`text-white font-medium text-xl my-4 ${
						isActive("/") ? "glow-text" : "nav-link"
					}`}
					onClick={() => setIsOpen(false)}>
					HOME
				</Link>
				<Link
					to="/about"
					className={`text-white font-medium text-xl my-4 ${
						isActive("/about") ? "glow-text" : "nav-link"
					}`}
					onClick={() => setIsOpen(false)}>
					ABOUT
				</Link>
				<Link
					to="/tournaments"
					className={`text-white font-medium text-xl my-4 ${
						isActive("/tournaments") ? "glow-text" : "nav-link"
					}`}
					onClick={() => setIsOpen(false)}>
					TOURNAMENTS
				</Link>
				<Link
					to="/khodam"
					className={`text-white font-medium text-xl my-4 ${
						isActive("/khodam") ? "glow-text" : "nav-link"
					}`}
					onClick={() => setIsOpen(false)}>
					KHODAM
				</Link>
			</div>
		</>
	);
};
