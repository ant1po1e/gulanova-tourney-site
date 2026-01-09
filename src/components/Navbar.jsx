import { useLocation, Link } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const isOnRoot = path === "/";

    const isInToolsSubpage =
        path === "/tools/bbcode-generator" || path === "/tools/snap-calculator";

    const backUrl = isInToolsSubpage ? "/tools" : "/";

    return (
        <header
            className="flex justify-between items-center pt-4 relative z-10"
            aria-label="Main navigation bar"
        >
            {/* Logo / Back button */}
            <Link
                to={isOnRoot ? "/" : backUrl}
                aria-label={isOnRoot ? "Go to homepage" : "Go back"}
                className="text-white font-bold text-lg md:text-2xl p-2 rounded-r-lg fade-out-bg shadow-lg md:hover:text-blue-400 md:hover:pl-12 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
                {isOnRoot ? (
                    <span className="flex items-center pr-3">
                        <img
                            src="gulanova.webp"
                            alt=""
                            className="w-15 h-15 mx-3"
                        />
                        Gulanova
                    </span>
                ) : (
                    <span className="flex items-center pr-3 w-15 h-15 mx-3">
                        <i className="bi bi-arrow-left" aria-hidden="true" />{" "}
                        Back
                    </span>
                )}
            </Link>

            {/* External Profile */}
            <div className="flex items-center space-x-4 text-black neon text-sm font-normal px-6">
                <a
                    href="https://osu.ppy.sh/users/Antipole"
                    aria-label="Visit Antipole's osu! profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white bg-opacity-60 backdrop-blur-md md:hover:bg-blue-400 rounded-full px-1 py-1 focus:ring-2 focus:ring-blue-400 transition duration-300"
                >
                    <img
                        src="https://a.ppy.sh/siapaya"
                        alt="Antipole's osu! avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        width="40"
                        height="40"
                        loading="lazy"
                    />
                </a>
            </div>
        </header>
    );
};
