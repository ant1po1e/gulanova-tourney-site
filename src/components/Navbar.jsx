import { useState } from "react";
import {
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
} from "flowbite-react";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<header className="flex items-center justify-between mb-5 md:mb-0 my-4 px-12">
				<div className="hidden md:flex" />
				<div className="flex items-center">
					<a href="/" className="flex items-center">
						<img
							src="/gulanova.webp"
							alt="Gulanova Logo"
							className="h-12 md:h-20 hover:rotate-3 hover:scale-125 transition duration-300"
						/>
						<span className="text-white text-3xl md:text-5xl font-bold ml-3 hidden md:block">
							GULANOVA
						</span>
					</a>
				</div>

				{/* Avatar Dropdown */}
				<div className="flex items-center">
					<Dropdown
						label={
							<img
								src="https://a.ppy.sh/u/guest"
								alt="User"
								className="w-12 h-12 rounded-full hover:ring-4 hover:ring-white transition duration-300"
							/>
						}
						arrowIcon={false}
						inline
						className="bg-gradient-to-r from-[#729dd8] to-[#3166a7] border-none absolute z-50"
						placement="bottom">
						<DropdownHeader className="text-white">
							<span className="block truncate text-sm font-medium text-center">
								Guest
							</span>
						</DropdownHeader>
						<DropdownHeader className="text-white">
							<span className="block truncate text-sm font-medium text-center">
								You are: VISITOR
							</span>
						</DropdownHeader>
						<DropdownDivider className="border-gulanova" />
						<DropdownItem
							className="hover:bg-gulanova text-white font-bold hover:text-gulanovaDark transition duration-300"
							onClick={() => (window.location.href = "/auth/logout")}>
							<span className="w-full">Log In</span>
						</DropdownItem>
					</Dropdown>
				</div>

				{/* Hamburger Menu */}
				<div className="flex items-center md:hidden">
					<button onClick={() => setIsOpen(true)}>
						<i className="bi bi-list text-4xl text-white" />
					</button>
				</div>
			</header>

			<nav className="sticky hidden top-0 z-10 before:absolute before:inset-x-0 before:bottom-0">
				<div>
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

			<div
				className={`fixed top-0 left-0 w-full h-1/3 bg-blue-900/95 flex flex-col md:hidden justify-center items-center z-[100] transition-all duration-500 ease-in-out transform ${
					isOpen
						? "translate-y-0 opacity-100 pointer-events-auto"
						: "-translate-y-full opacity-0 pointer-events-none"
				}`}>
				<button
					className="absolute top-5 right-12 text-white p-2"
					onClick={() => setIsOpen(false)}>
					<i class="bi bi-x-circle-fill text-2xl"></i>
				</button>
				<a href="#" className="nav-link text-white font-medium text-xl my-4">
					HOME
				</a>
				<a
					href="/about/"
					className="nav-link text-white font-medium text-xl my-4">
					ABOUT
				</a>
				<a
					href="/tournaments/"
					className="nav-link text-white font-medium text-xl my-4">
					TOURNAMENTS
				</a>
				<a
					href="/khodam/"
					className="nav-link text-white font-medium text-xl my-4">
					KHODAM
				</a>
			</div>
		</>
	);
};
