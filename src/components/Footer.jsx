import { useState } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFooter = () => {
        setIsOpen((prev) => !prev);
    };

    const links = [
        { to: "/", label: "HOME" },
        { to: "/tournaments", label: "TOURNAMENTS" },
        { to: "/khodam", label: "KHODAM" }
    ];

    const iMap = {
        HOME: <i className="bi bi-house-door" aria-hidden="true" />,
        TOURNAMENTS: <i className="bi bi-trophy" aria-hidden="true" />,
        KHODAM: <i className="bi bi-emoji-smile" aria-hidden="true" />,
    };

    return (
        <footer
            className="fixed bottom-0 left-0 w-full z-50"
            role="contentinfo"
            aria-label="Website Footer"
        >
            {/* Mobile Footer */}
            <div className="md:hidden flex flex-col items-center justify-end">
                {/* Hamburger button */}
                <button
                    onClick={toggleFooter}
                    className="fade-out-bg backdrop-blur-md text-white shadow-lg p-3 w-1/2 rounded-lg mb-2"
                    aria-expanded={isOpen}
                    aria-controls="mobile-footer-menu"
                    aria-label="Toggle footer menu"
                >
                    <i className="bi bi-list text-2xl" aria-hidden="true" />
                </button>

                {/* Expandable menu */}
                <div
                    id="mobile-footer-menu"
                    className={`transition-all duration-300 w-full bg-blue-800/50 backdrop-blur-md rounded-t-xl overflow-hidden shadow-lg ${
                        isOpen ? "max-h-[300px] py-4" : "max-h-0 py-0"
                    }`}
                >
                    <ul className="flex flex-col items-center text-white font-medium divide-y divide-gray-300 px-10">
                        {links.map((link) => (
                            <li key={link.label} className="w-full">
                                <Link
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-2 text-center text-base font-medium md:hover:bg-black/10 transition"
                                    aria-label={`Navigate to ${link.label}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Desktop Footer */}
            <div className="hidden md:flex items-center justify-center mb-8">
                <div className="fade-out-bg shadow-lg rounded-lg p-6 flex gap-7">
                    {links.map((link) => (
                        <div
                            key={link.label}
                            className="relative group font-medium"
                        >
                            <Link
                                to={link.to}
                                className="text-white text-2xl relative rounded-md p-2 transition-all duration-300 md:hover:text-white md:hover:bg-blue-800/50 md:hover:px-6 md:hover:shadow-md"
                                aria-label={`Navigate to ${link.label}`}
                            >
                                {iMap[link.label]}
                            </Link>
                            {/* Tooltip */}
                            <span
                                role="tooltip"
                                className="absolute -top-20 left-1/2 -translate-x-1/2 bg-blue-800/50 shadow-lg text-white text-sm px-5 py-2 rounded-md opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-y-1 transition-all duration-300 whitespace-nowrap pointer-events-none"
                            >
                                {link.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};
