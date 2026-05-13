import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { loginWithOsu, logout, getStoredUser } from "../utils/osuAuth";
import { callOsuApi } from "../utils/osuApi";

export const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    const [openDropdown, setOpenDropdown] = useState(false);
    const [user, setUser] = useState(getStoredUser());
    const dropdownRef = useRef(null);

    const isOnRoot = path === "/";

    const isInTournamentsSubpage =
        path === "/tournaments/gulanocup-lima/" ||
        path === "/tournaments/gulanocup-empat/";

    const backUrl = isInTournamentsSubpage ? "/tournaments" : "/";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        const authenticate = async () => {
            try {
                if (code) {
                    const response = await fetch(
                        `https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`,
                    );

                    const data = await response.json();

                    localStorage.setItem("access_token", data.access_token);

                    window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname,
                    );
                }

                const accessToken = localStorage.getItem("access_token");

                if (accessToken) {
                    const userData = await callOsuApi("/me/osu");

                    const formattedUser = {
                        userId: userData.id,
                        username: userData.username,
                        avatar: userData.avatar_url,
                    };

                    localStorage.setItem("user", JSON.stringify(formattedUser));

                    setUser(formattedUser);
                }
            } catch (err) {
                console.error(err);

                logout();
            }
        };

        authenticate();
    }, []);

    const isLoggedIn = !!user;

    return (
        <header
            className="flex justify-between items-center pt-4 relative z-50"
            aria-label="Main navigation bar">
            {/* Left */}
            <Link
                to={isOnRoot ? "/" : backUrl}
                aria-label={isOnRoot ? "Go to homepage" : "Go back"}
                className="
                    text-white font-bold text-lg md:text-2xl
                    p-2 py-4 rounded-r-lg
                    fade-out-bg shadow-lg
                    md:hover:text-blue-400
                    md:hover:pl-12
                    focus:ring-2 focus:ring-blue-400
                    transition-all duration-300
                ">
                {isOnRoot ? (
                    <span className="flex items-center pr-3">
                        <img
                            src="/gulanova.webp"
                            alt=""
                            className="w-8 h-8 mx-3"
                        />
                        Gulanova
                    </span>
                ) : (
                    <span className="flex items-center gap-2 pr-3 pl-3">
                        <i className="bi bi-arrow-left" />
                        <span>Back</span>
                    </span>
                )}
            </Link>

            {/* Right */}
            <div className="relative mr-3" ref={dropdownRef}>
                {/* Main Button */}
                <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="
                        flex items-center gap-3
                        bg-white/10 backdrop-blur-md
                        border border-white/10
                        rounded-full
                        px-2 py-2 pr-4
                        hover:bg-white/20
                        transition-all duration-300
                    ">
                    <img
                        src={
                            isLoggedIn ? user.avatar : "https://a.ppy.sh/guest"
                        }
                        alt={isLoggedIn ? user.username : "Guest"}
                        className="
                            w-10 h-10 rounded-full object-cover
                            border border-white/20
                        "/>

                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-white text-sm font-semibold leading-none">
                            {isLoggedIn ? user.username : "Guest"}
                        </span>

                        <span className="text-xs text-gray-300">
                            {isLoggedIn ? "Online" : "Not logged in"}
                        </span>
                    </div>

                    <i
                        className={`
                bi bi-chevron-down text-white text-xs
                transition-transform duration-300
                ${openDropdown ? "rotate-180" : ""}
            `}
                    />
                </button>

                {/* Dropdown */}
                <div
                    className={`
                        absolute right-0 mt-3
                        w-56
                        rounded-2xl
                        overflow-hidden
                        border border-white/10
                        bg-black/70 backdrop-blur-xl
                        shadow-2xl
                        transition-all duration-300
                        origin-top-right
                        ${
                            openDropdown
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }
                    `}>
                    {/* Header */}
                    <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <img
                                src={
                                    isLoggedIn
                                        ? user.avatar
                                        : "https://a.ppy.sh/guest"
                                }
                                alt={isLoggedIn ? user.username : "Guest"}
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <p className="text-white font-semibold">
                                    {isLoggedIn ? user.username : "Guest"}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {isLoggedIn
                                        ? "osu! player"
                                        : "Login required"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="p-2">
                        {isLoggedIn ? (
                            <>
                                <a
                                    href={`https://osu.ppy.sh/users/${user.userId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        flex items-center gap-3
                                        px-3 py-2 rounded-xl
                                        text-sm text-gray-200
                                        hover:bg-white/10
                                        transition
                                    ">
                                    <i className="bi bi-person" />
                                    Profile
                                </a>

                                <button
                                    onClick={logout}
                                    className="
                                        w-full
                                        flex items-center gap-3
                                        px-3 py-2 rounded-xl
                                        text-sm text-red-300
                                        hover:bg-red-500/10
                                        transition
                                    ">
                                    <i className="bi bi-box-arrow-right" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={loginWithOsu}
                                className="
                                    w-full
                                    flex items-center gap-3
                                    px-3 py-2 rounded-xl
                                    text-sm text-blue-300
                                    hover:bg-blue-500/10
                                    transition
                                ">
                                <i className="bi bi-box-arrow-in-right" />
                                Login with osu!
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
