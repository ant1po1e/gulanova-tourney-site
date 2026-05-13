import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const isOnRoot = path === "/";

    const isInTournamentsSubpage =
        path === "/tournaments/gulanocup-lima/" ||
        path === "/tournaments/gulanocup-empat/";

    const backUrl = isInTournamentsSubpage ? "/tournaments" : "/";

    // Close dropdown outside click
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

    // Mock user state
    const isLoggedIn = true;

    const user = {
        username: "Guest",
        userId: "guest",
    };

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
                {isLoggedIn ? (
                    <>
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
                                src={`https://a.ppy.sh/${user.userId}`}
                                alt={user.username}
                                className="
                                    w-10 h-10 rounded-full object-cover
                                    border border-white/20
                                "
                            />

                            <div className="hidden sm:flex flex-col text-left">
                                <span className="text-white text-sm font-semibold leading-none">
                                    {user.username}
                                </span>

                                <span className="text-xs text-gray-300">
                                    Online
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
                            {/* Profile Header */}
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://a.ppy.sh/${user.userId}`}
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="text-white font-semibold">
                                            {user.username}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            osu! player
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="p-2">
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
                            </div>
                        </div>
                    </>
                ) : (
                    /* Login Button */
                    <button
                        className="
                            flex items-center gap-2
                            bg-blue-500 hover:bg-blue-400
                            text-white text-sm font-semibold
                            px-5 py-2.5 rounded-full
                            shadow-lg
                            transition-all duration-300
                        ">
                        <i className="bi bi-box-arrow-in-right" />
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

// oke sip sekarang tinggal kita buat fungsi untuk login dengan api osu, nanti akan mengambil id dan nickname.

// import { useLocation, Link } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";

// export const Navbar = () => {
//     const location = useLocation();
//     const path = location.pathname;

//     const [openDropdown, setOpenDropdown] = useState(false);
//     const dropdownRef = useRef(null);

//     const isOnRoot = path === "/";

//     const isInTournamentsSubpage =
//         path === "/tournaments/gulanocup-lima/" ||
//         path === "/tournaments/gulanocup-empat/";

//     const backUrl = isInTournamentsSubpage ? "/tournaments" : "/";

//     // Close dropdown outside click
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target)
//             ) {
//                 setOpenDropdown(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     // Mock user state
//     const isLoggedIn = true;

//     const user = {
//         username: "Guest",
//         userId: "guest",
//     };

//     return (
//         <header
//             className="flex justify-between items-center pt-4 relative z-50"
//             aria-label="Main navigation bar">
//             {/* Left */}
//             <Link
//                 to={isOnRoot ? "/" : backUrl}
//                 aria-label={isOnRoot ? "Go to homepage" : "Go back"}
//                 className="
//                     text-white font-bold text-lg md:text-2xl
//                     p-2 py-4 rounded-r-lg
//                     fade-out-bg shadow-lg
//                     md:hover:text-blue-400
//                     md:hover:pl-12
//                     focus:ring-2 focus:ring-blue-400
//                     transition-all duration-300
//                 ">
//                 {isOnRoot ? (
//                     <span className="flex items-center pr-3">
//                         <img
//                             src="/gulanova.webp"
//                             alt=""
//                             className="w-8 h-8 mx-3"
//                         />
//                         Gulanova
//                     </span>
//                 ) : (
//                     <span className="flex items-center gap-2 pr-3 pl-3">
//                         <i className="bi bi-arrow-left" />
//                         <span>Back</span>
//                     </span>
//                 )}
//             </Link>

//             {/* Right */}
//             <div className="relative mr-3" ref={dropdownRef}>
//                 {isLoggedIn ? (
//                     <>
//                         <button
//                             onClick={() => setOpenDropdown(!openDropdown)}
//                             className="
//                                 flex items-center gap-3
//                                 bg-white/10 backdrop-blur-md
//                                 border border-white/10
//                                 rounded-full
//                                 px-2 py-2 pr-4
//                                 hover:bg-white/20
//                                 transition-all duration-300
//                             ">
//                             <img
//                                 src={`https://a.ppy.sh/${user.userId}`}
//                                 alt={user.username}
//                                 className="
//                                     w-10 h-10 rounded-full object-cover
//                                     border border-white/20
//                                 "
//                             />

//                             <div className="hidden sm:flex flex-col text-left">
//                                 <span className="text-white text-sm font-semibold leading-none">
//                                     {user.username}
//                                 </span>

//                                 <span className="text-xs text-gray-300">
//                                     Online
//                                 </span>
//                             </div>

//                             <i
//                                 className={`
//                                     bi bi-chevron-down text-white text-xs
//                                     transition-transform duration-300
//                                     ${openDropdown ? "rotate-180" : ""}
//                                 `}
//                             />
//                         </button>

//                         {/* Dropdown */}
//                         <div
//                             className={`
//                                 absolute right-0 mt-3
//                                 w-56
//                                 rounded-2xl
//                                 overflow-hidden
//                                 border border-white/10
//                                 bg-black/70 backdrop-blur-xl
//                                 shadow-2xl
//                                 transition-all duration-300
//                                 origin-top-right
//                                 ${
//                                     openDropdown
//                                         ? "opacity-100 scale-100 translate-y-0"
//                                         : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
//                                 }
//                             `}>
//                             {/* Profile Header */}
//                             <div className="p-4 border-b border-white/10">
//                                 <div className="flex items-center gap-3">
//                                     <img
//                                         src={`https://a.ppy.sh/${user.userId}`}
//                                         alt={user.username}
//                                         className="w-12 h-12 rounded-full object-cover"
//                                     />

//                                     <div>
//                                         <p className="text-white font-semibold">
//                                             {user.username}
//                                         </p>

//                                         <p className="text-xs text-gray-400">
//                                             osu! player
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Menu */}
//                             <div className="p-2">
//                                 <a
//                                     href={`https://osu.ppy.sh/users/${user.userId}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="
//                                         flex items-center gap-3
//                                         px-3 py-2 rounded-xl
//                                         text-sm text-gray-200
//                                         hover:bg-white/10
//                                         transition
//                                     ">
//                                     <i className="bi bi-person" />
//                                     Profile
//                                 </a>

//                                 <button
//                                     className="
//                                         w-full
//                                         flex items-center gap-3
//                                         px-3 py-2 rounded-xl
//                                         text-sm text-red-300
//                                         hover:bg-red-500/10
//                                         transition
//                                     ">
//                                     <i className="bi bi-box-arrow-right" />
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     /* Login Button */
//                     <button
//                         className="
//                             flex items-center gap-2
//                             bg-blue-500 hover:bg-blue-400
//                             text-white text-sm font-semibold
//                             px-5 py-2.5 rounded-full
//                             shadow-lg
//                             transition-all duration-300
//                         ">
//                         <i className="bi bi-box-arrow-in-right" />
//                         Login
//                     </button>
//                 )}
//             </div>
//         </header>
//     );
// };

// contoh api di website sebelumnya:
// async function callOsuApi(endpoint) {
//     const accessToken = localStorage.getItem("access_token");

//     const response = await fetch(`https://gulanova-auth.vercel.app/api/osuApi?endpoint=${encodeURIComponent(endpoint)}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
// }

// async function fetchUserRole() {
//     try {
//         const loggedInUsername = localStorage.getItem("username_desktop");
//         if (!loggedInUsername) {
//             console.error("No logged-in username found.");
//             return;
//         }

//         const pagePath = window.location.pathname;
//         const jsonUrl = `${pagePath}/json/users-data.json`;

//         const response = await fetch(jsonUrl);
//         if (!response.ok) {
//             throw new Error(`Error fetching JSON file: ${response.status}`);
//         }

//         const usersData = await response.json();
//         const user = usersData.find(user => user.username === loggedInUsername);

//         if (!user) {
//             console.error("User not found in JSON.");
//             return;
//         }

//         const userRole = user.role;
//         const userRoleElement = document.getElementById("user-role-desktop");

//         if (userRole === "player") {
//             userRoleElement.textContent = "You are: PLAYER";
//         } else if (userRole) {
//             userRoleElement.textContent = "You are: STAFF";
//         } else {
//             userRoleElement.textContent = "You are: VISITOR";
//         }
//     } catch (error) {
//         console.error("Error processing user role:", error);
//     }

//     try {
//         const loggedInUsername = localStorage.getItem("username_mobile");
//         if (!loggedInUsername) {
//             console.error("No logged-in username found.");
//             return;
//         }

//         const pagePath = window.location.pathname;
//         const jsonUrl = `${pagePath}/json/users-data.json`;

//         const response = await fetch(jsonUrl);
//         if (!response.ok) {
//             throw new Error(`Error fetching JSON file: ${response.status}`);
//         }

//         const usersData = await response.json();
//         const user = usersData.find(user => user.username === loggedInUsername);

//         if (!user) {
//             console.error("User not found in JSON.");
//             return;
//         }

//         const userRole = user.role;
//         const userRoleElement = document.getElementById("user-role-mobile");

//         if (userRole === "player") {
//             userRoleElement.textContent = "You are: PLAYER";
//         } else if (userRole) {
//             userRoleElement.textContent = "You are: STAFF";
//         } else {
//             userRoleElement.textContent = "You are: VISITOR";
//         }
//     } catch (error) {
//         console.error("Error processing user role:", error);
//     }
// }

// window.onload = async function () {
//     await fetchUserRole();

//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');
//     const accessToken = localStorage.getItem('access_token');
//     const currentPath = window.location.pathname;

//     if (code) {
//         try {
//             const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
//             if (response.data.access_token) {
//                 localStorage.setItem("access_token", response.data.access_token);
//                 window.location.href = currentPath;
//             }
//         } catch (error) {
//             console.error('Error during OAuth token exchange:', error);
//         }
//     } else if (accessToken) {
//         try {
//             const userData = await callOsuApi('/me/osu');
//             localStorage.setItem("username", userData.username);
//             localStorage.setItem("avatar_url", userData.avatar_url);

//             document.getElementById('avatar_mobile').src = userData.avatar_url;
//             document.getElementById('username-mobile').innerText = userData.username;
//             document.getElementById('login-mobile').classList.add("hidden");
//             document.getElementById('logout-mobile').classList.remove("hidden");

//             document.getElementById('avatar_desktop').src = userData.avatar_url;
//             document.getElementById('username-desktop').innerText = userData.username;
//             document.getElementById('login-desktop').classList.add("hidden");
//             document.getElementById('logout-desktop').classList.remove("hidden");

//             localStorage.setItem("username_desktop", userData.username);
//             localStorage.setItem("username_mobile", userData.username);
//         } catch (err) {
//             console.error('Error fetching user data:', err);
//         }
//     } else {
//         console.error('No access token or OAuth code found');
//     }
// };

// function testistwo() {
//     console.log(callOsuApi('/me/osu'));
// }

// function deb() {
//     const string = window.location.href;
//     const part = string.match(/code=(.*$)/)[1];
//     console.log(part);
// }

// oh ya semisal ada token nanti saya akan masukkan ke env vercel.
