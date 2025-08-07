import { useEffect, useState } from "react";

export const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isUserModalOpen, setUserModalOpen] = useState(false);
	const [navBlurred, setNavBlurred] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const nav = document.getElementById("desktop-nav");
			if (!nav) return;
			const rect = nav.getBoundingClientRect();
			setNavBlurred(rect.top <= 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<header className="flex flex-row justify-between items-center mb-5 md:mb-0 py-2 px-6">
				{/* Mobile Avatar & Modal */}
				<div className="flex-1">
					{/* Avatar (mobile only) */}
					<div className="block md:hidden">
						<button
							type="button"
							className="flex text-sm bg-gray-800 rounded-full md:me-0 hover:ring-4 ring-[#9BC4FF] transition duration-300"
							onClick={() => setUserModalOpen(true)}>
							<span className="sr-only">Open user menu</span>
							<img
								className="w-12 h-12 md:w-14 md:h-14 rounded-full"
								src="https://a.ppy.sh/guest"
								id="avatar_mobile"
								alt="user photo"
							/>
						</button>
					</div>

					{/* User modal (mobile) */}
					{isUserModalOpen && (
						<div
							className="fixed inset-0 bg-black/75 flex-col text-center items-center justify-center z-[1000] flex"
							id="user-modal"
							onClick={(e) => {
								if (e.target.id === "user-modal") setUserModalOpen(false);
							}}>
							<div className="relative my-4 text-base list-none divide-y rounded-lg shadow bg-gradient-to-r from-[#729dd8] to-[#3166a7] divide-gulanova w-72">
								<div className="px-4 py-3">
									<span className="block text-sm text-white font-bold text-center">
										Guest
									</span>
								</div>
								<li>
									<div className="block px-4 py-2 text-sm text-gray-200">
										You are: VISITOR
									</div>
								</li>
								<ul className="py-2">
									<li>
										<button
											type="button"
											onClick={() => (window.location.href = "/auth/login")}
											className="w-full px-4 py-2 text-sm text-gray-200 font-bold hover:bg-gulanova hover:text-gulanovaDark transition duration-300">
											Log in
										</button>
									</li>
								</ul>
							</div>
							<button
								onClick={() => setUserModalOpen(false)}
								className="mt-2 p-2 rounded-full text-2xl text-white shadow-lg">
								<i className="bi bi-x-circle-fill"></i>
							</button>
						</div>
					)}
				</div>

				{/* Logo */}
				<div className="flex-1 flex justify-center">
					<a href="/" className="header-logo flex items-center">
						<img
							src="/gulanova.webp"
							alt="Gulanova Logo"
							className="h-16 md:h-20 hover:rotate-3 hover:scale-125 transition duration-300"
						/>
						<span className="text-white text-3xl md:text-5xl font-bold ml-3 hidden md:block">
							GULANOVA
						</span>
					</a>
				</div>

				{/* Desktop User */}
				<div className="user-container flex-1 flex justify-end mt-4 md:mt-0 z-[100]">
					<div id="desktop-user" className="desktop-active hidden md:flex">
						<button
							type="button"
							className="flex text-sm bg-gray-800 rounded-full md:me-0 hover:ring-4 ring-[#9BC4FF] transition duration-300">
							<span className="sr-only">Open user menu</span>
							<img
								className="w-8 h-8 md:w-14 md:h-14 rounded-full"
								src="https://a.ppy.sh/guest"
								alt="user photo"
							/>
						</button>
					</div>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					onClick={() => setMobileMenuOpen(true)}
					type="button"
					className="md:hidden absolute right-4 top-8 inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg text-white hover:bg-[#9BC4FF]">
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
			</header>

			{/* Desktop Nav */}
			<nav className="sticky top-0 z-10 before:absolute before:inset-x-0 before:bottom-0">
				<div
					id="desktop-nav"
					className={`transition duration-300 w-full ${
						navBlurred ? "backdrop-blur-md" : "backdrop-blur-none"
					}`}>
					<div className="hidden md:flex justify-center items-center p-5">
						<a href="#" className="text-white font-medium mx-4 glow-text">
							HOME
						</a>
						<span className="text-white mx-1">•</span>
						<a href="/about/" className="text-white font-medium mx-4">
							ABOUT
						</a>
						<span className="text-white mx-1">•</span>
						<a href="/tournaments/" className="text-white font-medium mx-4">
							TOURNAMENTS
						</a>
						<span className="text-white mx-1">•</span>
						<a href="/khodam/" className="text-white font-medium mx-4">
							KHODAM
						</a>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed top-0 left-0 w-full h-full bg-blue-900/95 flex flex-col justify-center items-center z-[100]">
					<button
						onClick={() => setMobileMenuOpen(false)}
						className="absolute top-8 right-8 text-white p-2">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
					<a href="#" className="text-white font-medium text-xl my-4">
						HOME
					</a>
					<a href="/about/" className="text-white font-medium text-xl my-4">
						ABOUT
					</a>
					<a href="/tournaments/" className="text-white font-medium text-xl my-4">
						TOURNAMENTS
					</a>
					<a href="/khodam/" className="text-white font-medium text-xl my-4">
						KHODAM
					</a>
				</div>
			)}
		</>
	);
};
